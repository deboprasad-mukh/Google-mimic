import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import routeNames from "./routeNames";

const Tab = createBottomTabNavigator();

// Dummy Screens for Tabs


const SavedScreen = () => (
  <View style={styles.screen}>
    <Text>Saved Screen</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.screen}>
    <Text>Notifications Screen</Text>
  </View>
);

const IconAlignment = ({ icon, label, focused }) => {
    return (
      <View style={styles.iconWrapper}>
        <View style={[styles.iconBackground, focused && styles.activeIconBackground]}>
          <Icon name={icon} size={24} color={focused ? '#B0C4DE' : '#888'} />
        </View>
        <Text style={[styles.label, focused && styles.activeLabel]}>{label}</Text>
      </View>
    );
  };

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home' // Ensure that the correct initial screen is loaded
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#121212',
          height: 50, // Set enough height for icons and labels
          display: route.name === 'Search' ? 'none' : 'flex',
        },
        headerShown: false, // Hide headers for tabs
    })}
    >
      {/* Home Tab */}
      <Tab.Screen
        name={routeNames.HOME}
        component={HomeScreen} // Use the correct Home component here
        options={{
          tabBarIcon: ({ focused }) => (
            <IconAlignment icon="home" label="Home" focused={focused} />
          ),
          tabBarLabel: () => null, // Hide label if not needed
        }}
      />

      {/* Search Tab */}
      <Tab.Screen
        name={routeNames.SEARCH}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconAlignment icon="search" label="Search" focused={focused} />
          ),
          tabBarLabel: () => null, // Hide label
        }}
      />

      {/* Saved Tab */}
      <Tab.Screen
        name={routeNames.SAVED_SCREEN}
        component={SavedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconAlignment icon="bookmark" label="Saved" focused={focused} />
          ),
          tabBarLabel: () => null, // Hide label
        }}
      />

      {/* Notifications Tab */}
      <Tab.Screen
        name={routeNames.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconAlignment icon="notifications" label="Notifications" focused={focused} />
          ),
          tabBarLabel: () => null, // Hide label
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: '#121212',
    },
    iconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      marginTop:10
    },
    iconBackground: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
    
      borderRadius: 20, // Rounded background for the icon
      backgroundColor: 'transparent', // Default transparent
    },
    activeIconBackground: {
      backgroundColor: '#444', // Rounded background for active icon
    },
    label: {
      fontSize: 11,
  
      color: '#888', // Default color for inactive labels
    },
    activeLabel: {
      color: '#B0C4DE', // Light blue for active tab label
      fontWeight: '600',
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
    },
  });

export default BottomTabNavigator;
