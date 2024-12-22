import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import routeNames from '../../navigation/routeNames';
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
const SignInScreen = () => {
    const navigation = useNavigation();

    const handleSignIn = () => {
        navigation.navigate(routeNames.MAIN);
      };
  return (
    <View style={styles.container}>
      {/* Google Logo */}
      <Image
        source={require("../../assets/images/logo.jpg")}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>with your Google Account</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email or phone"
        placeholderTextColor="#757575"
      />

      {/* Forgot Email Link */}
      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot email?</Text>
      </TouchableOpacity>

      {/* Guest Mode Text */}
      <Text style={styles.guestMode}>
        Not your computer? Use Guest mode to sign in privately.{' '}
        <Text style={styles.learnMore}>Learn more</Text>
      </Text>

      {/* Create Account and Next Buttons */}
      <View style={styles.bottomRow}>
        <TouchableOpacity>
          <Text style={styles.createAccountText}>Create account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleSignIn}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Links */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>English (United States)</Text>
        <Text style={styles.footerText}>Help</Text>
        <Text style={styles.footerText}>Privacy Policy</Text>
        <Text style={styles.footerText}>Terms of Service</Text>
      </View>
    </View>
  );
};


export default SignInScreen;
