
import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import routeNames from '../../navigation/routeNames';
const images = [
    { id: 1, uri: require('../../assets/images/tata.jpg') },
    { id: 2, uri: require('../../assets/images/apj.jpg') },
    { id: 3, uri: require('../../assets/images/Glogo.jpg') },
    { id: 4, uri: require('../../assets/images/logo.jpg') },
    { id: 5, uri: require('../../assets/images/ndtv.jpg') },
];



const ImageSearchScreen = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(false);
    const devices = useCameraDevices();
    const backDevice = devices.find(device => device.position === 'back');

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

    const onCameraClick=()=>{
        navigation.navigate(routeNames.IMAGE_RESULT)
    }

    return (
        <View style={styles.container}>
       
        

            {/* Camera Search Section */}
            <View style={styles.cameraSection}>
                {hasPermission ? (
                    <Camera style={styles.camera} device={backDevice} isActive={true} />
                ) : (
                    <Text style={styles.errorText}>Camera permission is required.</Text>
                )}
                <View style={styles.topSectionNew}>
                  
                        <TouchableOpacity>
                            <Icon name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Google Lens</Text>
                        <View style={styles.topIcons}>
                            <Icon name="history" size={24} color="#fff" style={styles.icon} />
                            <Icon name="more-vert" size={24} color="#fff" />
                        </View>
                    
                </View>

                <View style={styles.cameraButton} >
                    <Icon name="photo-camera" size={24} color="#fff" onPress={onCameraClick}/>
                </View>
                <Text style={styles.cameraText}>Search with your camera</Text>

            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="translate" size={15} color="#4285F4" style={{marginRight:5,paddingVertical:4}} />
                    <Text style={styles.navText}>Translate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="search" size={15} color="#4285F4" style={{marginRight:5}} />
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="assignment" size={15} color="#4285F4" style={{marginRight:5}} />
                    <Text style={styles.navText}>Homework</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Gallery Section */}
            <View style={styles.galleryHeader}>
                <Text style={styles.galleryTitle}>Screenshots</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={images}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <Image source={item?.uri} style={styles.thumbnail} />
                )}
                style={styles.galleryList}
            />
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
        marginBottom: 20,

    },
    topSectionNew: {
        flexDirection:"row",
        position: "absolute", // Position it on top of the camera
        top: "5%", // Adjust to the vertical center
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1, // Ensure it is on top of the camera
       
        width:"100%"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    topIcons: {
        flexDirection: "row",
    },
    icon: {
        marginRight: 12,
    },

    cameraSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        borderBottomStartRadius:10,
        borderBottomEndRadius:10,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    
    cameraButton: {
        position: "absolute", // Position it on top of the camera
        top: "55%", // Adjust to the vertical center
        left: "50%",
        transform: [{ translateX: -40 }, { translateY: -40 }], // Center the icon
        width: 60,
        height: 60,
        borderRadius: 40,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1, // Ensure it is on top of the camera
    },

    // Camera text should also be overlayed above the camera view
    cameraText: {
        position: "absolute", // Position it on top of the camera
        top: "75%", // Adjust vertical position as needed
        left: "50%",
        transform: [{ translateX: -90 }, { translateY: -10 }], // Center the text
        color: "#fff",
        fontSize: 16,
        zIndex: 1, // Ensure it is on top of the camera
    },

    // Error message when permission is not granted
    errorText: {
        color: "red",
        fontSize: 18,
        textAlign: "center",
    },

    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
      
        paddingVertical: 12,
        width:"90%",
        alignContent:"center",
        alignSelf:'center'

       
    
    },
    navItem: {
        alignItems: "center",
        flexDirection:"row",
        paddingHorizontal:10,
        paddingVertical:2,
        borderWidth:1,
        borderColor:"#3d3d3d",
        borderRadius:20,
        justifyContent:"center"
    },
  
    navText: {
        color: "#4285F4",
        fontSize: 14,
       
    },
    galleryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    galleryTitle: {
        color: "#fff",
        fontSize: 18,
    },
    viewAllText: {
        color: "#4285F4",
        fontSize: 14,
    },
    galleryList: {
        flex: 1,
    },
    thumbnail: {
        width: "30%",
        height: 100,
        margin: "1.66%",
        borderRadius: 8,
    },
    divider: {
        height: 1,          // The height of the line
        backgroundColor: "#3d3d3d", 
        marginBottom:10, // White color for the divider
       // Optional: Adds space above and below the divider
        width: "100%",      // Make the divider take the full width
      },
});

export default ImageSearchScreen;
