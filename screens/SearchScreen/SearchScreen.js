import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import routeNames from "../../navigation/routeNames";
import styles from "./styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
const searchHistory = [
  "the godfather",
  "ok",
  "hampi railway station",
  "epam careers",
  "go karting bangalore",
  "feelin fine infraction music",
  "fuera de tu alcance sixto yegros sponsor dios",
  "myntra",
  "chatgpt",
  "apollo bannerghatta",
  "devanuke ibrahim tatlises",
  "bero 03 fan made slowed dj zk3",
];

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Replace this with your API endpoint
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      console.log('Fetching suggestions for:', query);
      // Example API call (replace with your API)
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyAZTyjUdcy-Ej0MzEqiFZkFQIh7-1wW6So&cx=42602ccf9a887474c&q=${query}`
      );
      console.log('API Response:', response.data);
      setSuggestions(response.data.items || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (text) => {

    setSearchText(text);

    // Debounce API calls
    clearTimeout(handleInputChange.debounceTimer);
    handleInputChange.debounceTimer = setTimeout(() => {
      fetchSuggestions(text);
    }, 300); // 300ms debounce
  };

  const onLensPressed = () => {
    navigation.navigate(routeNames.IMAGE_RESULT)
  }
  const onMicPressed = () => {
    navigation.navigate(routeNames.VOICE_SEARCH)
  }
  const onClosePressed=()=>{
    setSearchText("")
  }




  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.historyItem}>
      <View style={styles.historyLeft}>
        <Icon name="history" size={wp(6.5)} color="#666" />
        <Text style={styles.historyText}>{item?.title ? item?.title : item}</Text>
      </View>
      <Icon name="arrow-upward" size={wp(5.4)} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>

        <Image source={require('../../assets/images/Glogo.jpg')} style={{ width: wp(6.5), height: wp(6.5) }} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={(text) => handleInputChange(text)}
        />
        {searchText=="" ?
          <View style={{flexDirection:"row"}}>
            <Icon name="mic" size={wp(6.5)} color="#4285F4" style={styles.icon} onPress={onMicPressed} />
            <Icon name="camera-alt" size={wp(6.5)} color="#4285F4" style={[styles.icon, { paddingStart: wp(4.1) }]} onPress={onLensPressed} />
          </View>
          :
          <Icon name="close" size={wp(6.5)} color="#4285F4" style={[styles.icon, { paddingStart: wp(4.1) }]} onPress={onClosePressed} />
        }

      </View>

      {/* Search History List */}
      <FlatList
        data={searchText != "" ? suggestions : searchHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.historyList}
      />
    </View>
  );
};


export default SearchScreen;
