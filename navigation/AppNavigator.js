import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routeNames from "./routeNames";

// Screens
import SignInScreen from "../screens/SignIn/SignInScreen"; // Example screen path
import BottomTabNavigator from "./BottomTabNavigator";
import VoiceSearchScreen from "../screens/VoiceSearchScreen/VoiceSearchScreen";
import ImageSearchScreen from "../screens/ImageSearchScreen/ImageSearchScreen";
import ImageSearchResult from "../screens/ImageSearchScreen/ImageSearchResult";
import ImageResultList from "../screens/ImageSearchScreen/ImageResultList";
// import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Customize header visibility
      }}
    >
      {/* Initial Screens */}
      <Stack.Screen name={routeNames.SIGN_IN} component={SignInScreen} />

      {/* Main App with Bottom Tabs */}
      <Stack.Screen name={routeNames.MAIN} component={BottomTabNavigator} />

      {/* Additional Screens*/}
      <Stack.Screen name={routeNames.VOICE_SEARCH} component={VoiceSearchScreen} /> 
      <Stack.Screen name={routeNames.IMAGE_SEARCH} component={ImageSearchScreen} /> 
      <Stack.Screen name={routeNames.IMAGE_RESULT} component={ImageSearchResult} />
      <Stack.Screen name={routeNames.IMAGE_RESULT_LIST} component={ImageResultList} /> 
    </Stack.Navigator>
  );
};

export default AppNavigator;
