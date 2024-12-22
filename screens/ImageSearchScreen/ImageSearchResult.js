
import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    NativeModules
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { width, height } = Dimensions.get("window");
import { PanGestureHandler } from "react-native-gesture-handler";
import routeNames from '../../navigation/routeNames';
import { fontFamilyNames } from '../../utils';


const { OpenCVModule } = NativeModules;


const ImageSearchResult = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(false);
    const devices = useCameraDevices();
    const backDevice = devices.find(device => device.position === 'back');
    const [cameraRef, setCameraRef] = useState(null); // To access camera functions


    const [cropBox, setCropBox] = useState({
        x: width * 0.2,
        y: height * 0.25,
        width: width * 0.6,
        height: height * 0.3,
    });
    const THRESHOLD = 10000;

    const adjustCropBox = (direction, change) => {
        setCropBox((prev) => {
            const updatedBox = { ...prev };
            if (direction === "width") updatedBox.width += change;
            if (direction === "height") updatedBox.height += change;
            return updatedBox;
        });
    };
    const onSearchClicked = async () => {
        // navigation.navigate(routeNames.IMAGE_RESULT_LIST)


        try {
            // const photo = await Camera.takePhoto({
            //   qualityPrioritization: "balanced", // Balanced between quality and speed
            // });
            const photo = await cameraRef.takePhoto({
                qualityPrioritization: "balanced", // Adjust as per your needs
            });

            console.log("capture image:", photo.path);

            // Navigate to the ResultList page with the photo
            navigation.navigate(routeNames.IMAGE_RESULT_LIST, { imageUri: photo.path });
        } catch (error) {
            console.error("Failed to capture image:", error);
            Alert.alert("Error", "Failed to capture image. Please try again.");
        }
    }

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




    // Request Camera Permission
    useEffect(() => {
        const requestPermission = async () => {
            const status = await Camera.requestCameraPermission();
            console.log("status", status)
            if (status === 'granted') {
                setHasPermission(true);
            } else {
                Alert.alert('Camera Permission Denied', 'You need to grant camera permission to use this feature.');
            }
        };
        console.log(devices)
        console.log(backDevice)


        requestPermission();
    }, []);
    const onClose=()=>{
        navigation.goBack()
    }

    return (
        <View style={styles.container}>



            {/* Camera Search Section */}
            <View style={styles.cameraSection}>
                {hasPermission ? (
                    <Camera style={styles.camera} device={backDevice} isActive={true} ref={setCameraRef} photo={true} />
                ) : (
                    <Text style={styles.errorText}>Camera permission is required.</Text>
                )}
                <View style={styles.topSectionNew}>

                    <TouchableOpacity onPress={onClose}>
                        <Icon name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Google Lens</Text>
                    <View style={styles.topIcons}>
                        <Icon name="history" size={24} color="#fff" style={styles.icon} />
                        <Icon name="more-vert" size={24} color="#fff" />
                    </View>

                </View>

                <View style={styles.searchButton} >
                    <Icon name="search" size={24} color="#000" onPress={onSearchClicked} />
                </View>
                <View style={styles.gallerButton} >
                    <Icon name="image" size={24} color="#000" />
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
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="translate" size={15} color="#4285F4" style={{ marginRight: 5, paddingVertical: 4 }} />
                    <Text style={styles.navText}>Translate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="search" size={15} color="#4285F4" style={{ marginRight: 5 }} />
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="assignment" size={15} color="#4285F4" style={{ marginRight: 5 }} />
                    <Text style={styles.navText}>Homework</Text>
                </TouchableOpacity>
            </View>





        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: wp(5.46),

    },
    topSectionNew: {
        flexDirection: "row",
        position: "absolute", // Position it on top of the camera
        top: "5%", // Adjust to the vertical center
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1, // Ensure it is on top of the camera
        width: "100%"
    },
    title: {
        fontSize: wp(5.46),
        fontWeight: "bold",
        color: "#fff",
        fontFamily: fontFamilyNames.GREGULAR
    },
    topIcons: {
        flexDirection: "row",
    },
    icon: {
        marginRight: wp(3.27),
    },

    cameraSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: wp(54.6),
        borderBottomStartRadius: wp(2.73),
        borderBottomEndRadius: wp(2.73),
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
        width: '100%',
    },

    searchButton: {
        position: "absolute", // Position it on top of the camera
        bottom: 0, // Adjust to the vertical center
        left: "50%",
        transform: [{ translateX: -wp(11) }, { translateY: -wp(11) }], // Center the icon
        width: wp(16.4),
        height: wp(16.4),
        borderRadius: wp(11),
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1, // Ensure it is on top of the camera
    },
    gallerButton: {
        position: "absolute", // Position it on top of the camera
        bottom: 5, // Adjust to the vertical center
        left: "20%",
        transform: [{ translateX: -wp(11) }, { translateY: -wp(11) }], // Center the icon
        width: wp(13.7),
        height: wp(13.7),
        borderRadius: wp(11),
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1, // Ensure it is on top of the camera
    },

    // Camera text should also be overlayed above the camera view
    cameraText: {
        position: "absolute", // Position it on top of the camera
        top: "75%", // Adjust vertical position as needed
        left: "50%",
        transform: [{ translateX: -wp(24.5) }, { translateY: -wp(2.73) }], // Center the text
        color: "#fff",
        fontSize: wp(4.3),
        zIndex: 1, // Ensure it is on top of the camera
        fontFamily: fontFamilyNames.GREGULAR
    },

    // Error message when permission is not granted
    errorText: {
        color: "red",
        fontSize: wp(4.91),
        textAlign: "center",
        fontFamily: fontFamilyNames.GREGULAR
    },

    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",

        paddingVertical: wp(3.28),
        width: "90%",
        alignContent: "center",
        alignSelf: 'center'



    },
    navItem: {
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: wp(2.7),
        paddingVertical: wp(0.6),
        borderWidth: 1,
        borderColor: "#3d3d3d",
        borderRadius: wp(5.46),
        justifyContent: "center"
    },

    navText: {
        color: "#4285F4",
        fontSize: wp(3.82),
        fontFamily: fontFamilyNames.GREGULAR
    },
    galleryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: wp(2.1),
    },
    galleryTitle: {
        color: "#fff",
        fontSize: wp(4.91),
        fontFamily: fontFamilyNames.GREGULAR
    },
    viewAllText: {
        color: "#4285F4",
        fontSize: wp(3.82),
        fontFamily: fontFamilyNames.GREGULAR
    },
    galleryList: {
        flex: 1,
    },
    thumbnail: {
        width: "30%",
        height: wp(27.3),
        margin: "1.66%",
        borderRadius: wp(2.1),
    },
    divider: {
        height: 1,          // The height of the line
        backgroundColor: "#3d3d3d",
        marginBottom: wp(2.73), // White color for the divider
        // Optional: Adds space above and below the divider
        width: "100%",      // Make the divider take the full width
    },
    // cropBox: {
    //     position: "absolute",
    //     borderWidth: 2,
    //     borderColor: "#fff",
    //     borderRadius: 8,
    //   },

    cropBox: {
        position: "absolute",
        justifyContent: "space-between",
        alignItems: "center",
    },
    corner: {
        position: "absolute",
        width: wp(6.8),
        height: wp(6.8),
        borderColor: "#fff",
        borderRadius: 5
    },

    topLeft: {
        borderTopWidth: wp(0.54),
        borderLeftWidth: wp(0.54),
        top: 0,
        left: 0,
    },
    topRight: {
        borderTopWidth: wp(0.54),
        borderRightWidth: wp(0.54),
        top: 0,
        right: 0,
    },
    bottomLeft: {
        borderBottomWidth: wp(0.54),
        borderLeftWidth: wp(0.54),
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        borderBottomWidth: wp(0.54),
        borderRightWidth: wp(0.54),
        bottom: 0,
        right: 0,
    },
});

export default ImageSearchResult;
