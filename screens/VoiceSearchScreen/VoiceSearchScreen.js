import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontFamilyNames } from '../../utils';
import styles from './styles';
const VoiceSearchScreen = ({ navigation }) => {
    const [displayText, setDisplayText] = useState('Listening...');

    useEffect(() => {
        // Toggle text every 2 seconds
        const interval = setInterval(() => {
            setDisplayText((prevText) =>
                prevText === 'Listening...' ? 'Speak' : 'Listening...'
            );
        }, 2000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>

            {/* Animation for Listening */}
            <LottieView
                source={require('../../assets/animations/listen.json')} // Add your Lottie animation JSON
                autoPlay
                loop
                style={styles.animation}
            />

            {/* Listening Text */}
            <Text style={styles.listeningText}>{displayText}</Text>
            <View style={styles.bottomNavSong}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="music-note" size={wp(4.1)} color="#3d3d3d" style={{ marginRight: wp(1.33), paddingVertical: wp(1.1) }} />
                    <Text style={styles.navText}>Search a song</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};



export default VoiceSearchScreen;
