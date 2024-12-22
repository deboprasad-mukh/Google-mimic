import React, { useDeferredValue, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { NativeModules } from 'react-native';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
const { ImageEditor } = NativeModules;
import Icon from "react-native-vector-icons/MaterialIcons";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import ResultModal from "./ResultModal";
import RNFS from 'react-native-fs';
import pixelmatch from 'pixelmatch';
import { decode } from 'base64-arraybuffer'; // For decoding base64 images to ArrayBuffers
import { toBuffer } from 'react-native-buffer'; // For converting base64 to Buffer
import { Buffer } from 'buffer';
import { Canvas } from 'react-native-canvas';
import ImageResizer from 'react-native-image-resizer';
import { fontFamilyNames } from "../../utils";
const { height, width } = Dimensions.get("window");

const datasetImages = [
    require('../../assets/images/datasets/chairone.jpg'),
    require('../../assets/images/datasets/chairtwo.jpg'),
    require('../../assets/images/datasets/chairthree.jpg'),
    require('../../assets/images/datasets/curtainsone.jpg'),
    require('../../assets/images/datasets/curtainstwo.jpg'),
    require('../../assets/images/datasets/pillowone.jpg'),
    require('../../assets/images/datasets/pillowtwo.jpg'),
    require('../../assets/images/datasets/pillowthree.jpg'),
    require('../../assets/images/datasets/tableone.jpg'),
    require('../../assets/images/datasets/tabletwo.jpg'),
    require('../../assets/images/datasets/wallone.jpg'),
    require('../../assets/images/datasets/walltwo.jpg'),
    require('../../assets/images/datasets/wallthree.jpg'),
];
const datasetImagesNew = ['/Users/deboprasadmukherjee/Desktop/prepare/reactnative/googlemimic/android/app/src/main/res/raw/chairone.jpg', 'chairtwo.jpg', 'chairthree.jpg',];


const ImageResultList = ({ navigation, route }) => {
    const translateY = useSharedValue(height * 0.6); // Start position (collapsed state)
    const [gestureEnabled, setGestureEnabled] = useState(false); // To control gesture based on touch area
    const [model, setModel] = useState(null);
    const [datasetFilePaths, setDatasetFilePaths] = useState([]);
    const [bestMatch, setBestMatch] = useState(null);
    const searchBarHeight = 100;
    const { imageUri } = route.params;


    const [cropBox, setCropBox] = useState({
        x: 100,
        y: 100,
        width: 100,
        height: 100,
    });
    const THRESHOLD = 10000;





    useEffect(() => {
        // prepareDatasetImages().then((cachedPaths) => {
        //     compareImages(imageUri, cachedPaths);
        // });
    }, [imageUri]);
    const formattedUri = `file://${imageUri}`;
    //example uri: /data/user/0/com.googlemimic/cache/mrousavy8322360898343138304.jpg



    const prepareDatasetImages = async () => {
        try {
            const cachedPaths = await Promise.all(
                datasetImages.map((image) => copyAssetsToCache(image))
            );
            return cachedPaths;
        } catch (error) {
            console.error("Error preparing dataset images:", error);
            throw error;
        }
    };


    const copyAssetsToCache = async (asset) => {
        const resolvedAsset = Image.resolveAssetSource(asset);
        const assetUri = resolvedAsset.uri; // Resolve the asset URI
        const fileName = assetUri.split('/').pop(); // Extract the file name
        const cachePath = `${RNFS.CachesDirectoryPath}/${fileName}`; // Define cache path
        // console.log('Resolved URI:', assetUri);
        // console.log('Cache Path:', cachePath);
        try {
            // Check if the file already exists in the cache
            const fileExists = await RNFS.exists(cachePath);
            if (!fileExists) {
                if (assetUri.startsWith('http://') || assetUri.startsWith('https://')) {
                    // Download the asset if it's a URL
                    const response = await fetch(assetUri);
                    const blob = await response.blob();
                    const fileReader = new FileReader();
                    fileReader.onload = async (event) => {
                        const arrayBuffer = event.target.result;
                        await RNFS.writeFile(cachePath, new Uint8Array(arrayBuffer), 'utf8');
                    };
                    fileReader.readAsArrayBuffer(blob);
                } else {
                    // Copy the local asset to the cache directory
                    await RNFS.copyFile(assetUri, cachePath);
                }
            }
            return cachePath; // Return the cached file path
        } catch (error) {
            console.error('Error copying asset to cache:', error);
            throw error;
        }
    };


    const resizeImageWithResizer = async (imageUrii) => {
        try {
            //console.log("Resizing image:", imageUrii);
            const response = await ImageResizer.createResizedImage(
                imageUri,     // URI of the image
                224,          // Target width
                224,          // Target height
                "JPEG",       // Format: JPEG or PNG
                100           // Quality: 0-100
            );
           //console.log("Resized Image Path:", response);
            return response.uri; // Return the URI of the resized image
        } catch (error) {
            console.error("Error resizing image:", error);
            throw error;
        }
    };


    const compareImages = async (selectedImagePath, datasetPaths) => {
        try {

            const resizedSelectedImage = await resizeImageWithResizer(selectedImagePath, 224, 224);

            let lowestDiff = Infinity;
            let closestImage = null;

            for (const datasetPath of datasetPaths) {

                const resizedDatasetImage = await resizeImageWithResizer(datasetPath, 224, 224);

                const diff = calculateImageDifference(resizedSelectedImage, resizedDatasetImage);
                //console.log("6", diff)
                if (diff < lowestDiff) {
                    console.log("7")
                    lowestDiff = diff;
                    closestImage = datasetPath;
                }
            }

            setBestMatch(closestImage);
        } catch (error) {
            console.error("Error comparing images:", error);
        }
    };
    const calculateImageDifference = (image1Data, image2Data) => {
        // Check if inputs are valid
        if (!image1Data || !image2Data) {
            console.error("One or both image data inputs are null or undefined.");
            return NaN;
        }

        if (image1Data.length !== image2Data.length) {
            console.error("Image data lengths do not match:", image1Data.length, image2Data.length);
            return NaN;
        }

       var check= compareBitmaps(image1Data,image2Data)
console.log('calculateImageDifference',check)
        // Perform pixel difference calculation
        let diff = 0;
        for (let i = 0; i < image1Data.length; i++) {
            //console.log('calculateImageDifference',image1Data[i])
            diff += Math.abs(image1Data[i] - image2Data[i]);
        }
        return diff;
    };
    const compareBitmaps = async (uri1, uri2) => {
        try {
          // Read pixel data for both images
          const bitmap1 = await ImageEditor.decodeImageToBitmap(uri1);
          const bitmap2 = await ImageEditor.decodeImageToBitmap(uri2);
      
          if (bitmap1.width !== bitmap2.width || bitmap1.height !== bitmap2.height) {
            throw new Error("Images must have the same dimensions.");
          }
      
          let diff = 0;
          for (let i = 0; i < bitmap1.data.length; i++) {
            diff += Math.abs(bitmap1.data[i] - bitmap2.data[i]);
          }
      
          // Calculate match percentage
          const totalPixels = bitmap1.width * bitmap1.height * 4; // RGBA
          const matchPercentage = 100 - (diff / totalPixels) * 100;
      
          return matchPercentage.toFixed(2);
        } catch (error) {
          console.error("Error comparing bitmaps:", error);
          throw error;
        }
      };

    const handleImageSelection = async (selectedImagePath) => {
        prepareDatasetImages().then((cachedPaths) => {
            const match = compareImages(selectedImagePath, cachedPaths);
           // console.log('The closest match is:', match);
        });

    };


    // Handle gesture for sliding the modal
    const handleGesture = (event) => {
        const { translationY, y } = event.nativeEvent;

        // Allow dragging only if the gesture starts in the search bar area
        if (y <= searchBarHeight) {
            translateY.value = withSpring(
                Math.max(0, Math.min(height, translateY.value + translationY)) // Keep modal within bounds
            );
        }
    };

    // Handle gesture end
    const handleGestureEnd = (event) => {
        const { translationY, y } = event.nativeEvent;

        // Allow releasing only if the gesture starts in the search bar area
        if (y <= searchBarHeight) {
            const finalPosition = translateY.value + translationY;

            // Expand if dragged up more than halfway; otherwise collapse
            translateY.value = withSpring(finalPosition > height * 0.4 ? height * 0.6 : 0);
        }
    };

    // Modal animation style
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));


    const handleResize = (event, direction) => {
        const { translationX, translationY } = event.nativeEvent;

        setCropBox((prev) => {
            const updatedBox = { ...prev };

            switch (direction) {
                case "topLeft":
                    updatedBox.x = Math.max(0, prev.x + translationX);
                    updatedBox.y = Math.max(0, prev.y + translationY);
                    updatedBox.width = Math.max(50, prev.width - translationX);
                    updatedBox.height = Math.max(50, prev.height - translationY);
                    break;

                case "topRight":
                    updatedBox.y = Math.max(0, prev.y + translationY);
                    updatedBox.width = Math.max(50, Math.min(prev.width + translationX, width - prev.x));
                    updatedBox.height = Math.max(50, prev.height - translationY);
                    break;

                case "bottomLeft":
                    updatedBox.x = Math.max(0, prev.x + translationX);
                    updatedBox.width = Math.max(50, prev.width - translationX);
                    updatedBox.height = Math.max(50, Math.min(prev.height + translationY, height));
                    break;

                case "bottomRight":
                    updatedBox.width = Math.max(50, Math.min(prev.width + translationX, width - prev.x));
                    updatedBox.height = Math.max(50, Math.min(prev.width + translationX, width - prev.x));
                    break;

                default:
                    break;
            }

            // Boundary checks for the position (ensure it doesn't go outside the screen)
            updatedBox.x = Math.min(updatedBox.x, width - updatedBox.width);
            updatedBox.y = Math.min(updatedBox.y, height - updatedBox.height);

            return updatedBox;
        });
    };
    const handleDrag = (event) => {
        if (Math.abs(translationX) < THRESHOLD && Math.abs(translationY) < THRESHOLD) {
            return;
        }
        const { translationX, translationY } = event.nativeEvent;

        setCropBox((prev) => {
            const updatedBox = { ...prev };

            // Update position while ensuring it stays within boundaries
            updatedBox.x = Math.max(0, Math.min(prev.x + translationX, width - prev.width));
            updatedBox.y = Math.max(0, Math.min(prev.y + translationY, height - prev.height));

            return updatedBox;
        });
    };


    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>


                {bestMatch ? (
                    <>
                        <Text style={styles.resultText}>Best Match Found:</Text>
                        <Image source={bestMatch} style={styles.resultImage} />
                    </>
                ) : (
                    <Image
                        source={{ uri: formattedUri }}
                        style={styles.capturedImage}
                        resizeMode="contain"
                    />
                )}

            </View>
            <PanGestureHandler onGestureEvent={(e) => handleDrag(e)} >
                <View
                    style={[
                        styles.cropBox,
                        {
                            left: cropBox.x,
                            top: cropBox.y,
                            width: cropBox.width,
                            height: cropBox.height,
                        },
                    ]}
                >
                    {/* Top Left Corner */}
                    {/* <View style={[styles.corner, styles.topLeft]} /> */}
                    <PanGestureHandler
                        onGestureEvent={(e) => handleResize(e, "topLeft")}
                    >
                        <View style={[styles.corner, styles.topLeft]} />
                    </PanGestureHandler>
                    {/* Top Right Corner */}
                    <PanGestureHandler
                        onGestureEvent={(e) => handleResize(e, "topRight")}
                    >
                        <View style={[styles.corner, styles.topRight]} />
                    </PanGestureHandler>
                    {/* Bottom Left Corner */}
                    <PanGestureHandler
                        onGestureEvent={(e) => handleResize(e, "bottomLeft")}
                    >
                        <View style={[styles.corner, styles.bottomLeft]} />
                    </PanGestureHandler>
                    {/* Bottom Right Corner */}
                    <PanGestureHandler
                        onGestureEvent={(e) => handleResize(e, "bottomRight")}
                    >
                        <View style={[styles.corner, styles.bottomRight]} />
                    </PanGestureHandler>
                </View>
            </PanGestureHandler>
            {/* Modal Section */}
            <PanGestureHandler onGestureEvent={handleGesture} onEnded={handleGestureEnd} waitFor="flatlist" >
                <Animated.View style={[styles.modal, animatedStyle]}>
                    {/* <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Search Results</Text>
                            <Text>Result 1</Text>
                            <Text>Result 2</Text>
                            <Text>Result 3</Text>
                        </View> */}
                    <View style={styles.searchBar}>
                        <View style={styles.searchInputContainer}>
                            <Image
                                source={require('../../assets/images/Glogo.jpg')}
                                style={styles.searchIcon}
                            />
                            <Image
                                source={{uri:formattedUri}}
                                style={styles.searchIcon}
                            />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Add to your search"
                                placeholderTextColor="#9e9e9e"
                            />
                            <TouchableOpacity onPress={() => handleImageSelection(imageUri)}>
                                
                                <Icon name="mic" size={24} style={styles.searchIcon} color={"#4285F4"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ResultModal />
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    capturedImage: {

        width: width,
        height: height,
        borderRadius: 10,
        marginBottom: wp(32.8)
    },
    modal: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "98%", // Full height for sliding
        borderTopLeftRadius: wp(5.46),
        borderTopRightRadius: wp(5.46),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    searchBar: {
        height: wp(16.4),
        backgroundColor: "#121212",
        justifyContent: "center",
        alignItems: "center",
    },
    searchInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222222",
        borderRadius:30,
        paddingHorizontal: 10,
        width: "96%",
        height: wp(13),
    },
    searchIcon: {
        width: wp(5.46),
        height: wp(5.46),
        marginRight: wp(2.73),
    },
    searchInput: {
        flex: 1,
        fontSize: wp(4.37),
        fontFamily:fontFamilyNames.GREGULAR
    },
    cropBox: {
        position: "absolute",
        justifyContent: "space-between",
        alignItems: "center",
    },
    corner: {
        position: "absolute",
        width: wp(6.84),
        height: wp(6.84),
        borderColor: "#fff",
        borderRadius: wp(1.2)
    },

    topLeft: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        top: 0,
        left: 0,
    },
    topRight: {
        borderTopWidth: 2,
        borderRightWidth: 2,
        top: 0,
        right: 0,
    },
    bottomLeft: {
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        borderBottomWidth: 2,
        borderRightWidth: 2,
        bottom: 0,
        right: 0,
    },
});




export default ImageResultList;