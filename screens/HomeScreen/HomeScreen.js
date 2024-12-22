import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, Animated } from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import routeNames from '../../navigation/routeNames';
import styles from './styles';

const posts = [
  { id: '1', image: require('../../assets/images/tata.jpg'), title: 'Ratan Tata Birthday: 10 Success Lessons You Can Learn From The Titan of Indian Business', source: 'The Health Site', sourceLogo: require('../../assets/images/hs.jpg') },
  { id: '2', image: require('../../assets/images/apj.jpg'), title: "APJ Abdul Kalam Birth Anniversary: Top Quotes By 'Missile Man Of India' That Will Continue To Inspire Generations", source: 'NDTV', sourceLogo: require('../../assets/images/ndtv.jpg') },
];





const categories = [
  { id: '1', name: 'Images', icon: 'image', color: "#fff", background: "#4d4430" },
  { id: '2', name: 'Translate', icon: 'translate', color: "#fff", background: "#363F4E" },
  { id: '3', name: 'School', icon: 'school', color: "#fff", background: "#33423A" },
  { id: '4', name: 'Music', icon: 'music-note', color: "#fff", background: "#483034" },
];


const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const postsIconSize=wp(4.2)
  const searchbarIconSize= wp(6.55)
  const categoryIconSize= wp(5.4)

  useEffect(() => {
    console.log("wp,hp",wp(1),hp(1))

  }, []);

  // Handle input change with debounce
  const handleInputChange = (text) => {
    setSearchText(text);

  }
  const onPressSearchBar = () => {
    navigation.navigate(routeNames.SEARCH); 
  };
  const onPressMic=()=>{
    navigation.navigate(routeNames.VOICE_SEARCH)
  }
  const onPressCamera=()=>{
    navigation.navigate(routeNames.IMAGE_SEARCH)
  }
  
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true } // Use native driver for better performance
  );

  const searchBarTranslate = scrollY.interpolate({
    inputRange: [0, 100], // Adjust based on the scroll range you want to capture
    outputRange: [0, -100], // Moves up by 60px
    extrapolate: 'clamp',
  });

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Image source={item?.image} style={styles.postImage} />
      <Text style={styles.postTitle}>{item.title}</Text>
      <View style={[styles.rowcontainer,{paddingVertical:wp(1.91)}]}>
        {/* <MaterialIconsIcon name="search" size={24} color="#999" style={styles.searchIcon} />
       <Text style={styles.postSource}>{item.source}</Text> */}

        <View style={styles.leftSection}>
          <Image
            source={item.sourceLogo} // Replace with actual logo URI
            style={styles.logoOne}
          />
          <Text style={styles.text}>
            {item.source}<Text style={styles.dot}>•</Text> <Text>6d</Text>
          </Text>
        </View>

        {/* Right Section: Icons */}
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIconsIcon name="favorite-border" size={postsIconSize} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <IoniconsIcon name="share-social-outline" size={postsIconSize} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <IoniconsIcon name="ellipsis-vertical" size={postsIconSize} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.stickySearchBar,
          {
            transform: [{ translateY: searchBarTranslate }],
          },
        ]}
      >
        <View style={styles.searchBar}>
          <MaterialIconsIcon name="search" size={searchbarIconSize} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={styles.input}
            value={searchText}
            onChangeText={handleInputChange}
            onFocus={onPressSearchBar}
          />
          <TouchableOpacity onPress={onPressMic}>
            <MaterialIconsIcon name="mic" size={searchbarIconSize} color="#999" style={{ paddingEnd: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCamera}>
            <IoniconsIcon name="camera-outline" size={searchbarIconSize} color="#999" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollContainer}
        // Space for sticky header
        onScroll={handleScroll} // Link onScroll to Animated.event
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >


        {/* Top Bar */}
        <View style={styles.topBar}>
          <MaterialIconsIcon name="science" size={searchbarIconSize} color="#fff" />
          {/* <Text style={styles.time}>G</Text> */}
          <View style={styles.topIcons}>
            <IoniconsIcon name="person-circle" size={searchbarIconSize} color="#fff" />
          </View>
        </View>

        {/* Google Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Google</Text>
        </View>

        {/* Search Bar */}
        {/* <View style={styles.stickySearchBar}>
          <View style={styles.searchBar}>
            <MaterialIconsIcon name="search" size={24} color="#999" style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              style={styles.input}
              value={searchText}
              onChangeText={handleInputChange}
              onFocus={onPressSearchBar} // Use onFocus for TextInput instead of onPress
            />
            <TouchableOpacity onPress={onPressSearchBar}>
              <MaterialIconsIcon name="mic" size={24} color="#999" style={{ paddingEnd: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <IoniconsIcon name="camera-outline" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        </View> */}


        {/* Category Icons */}
        <View style={styles.categoryIcons}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {categories.map((item) => (
              <TouchableOpacity style={styles.iconCircle(item?.background)}>
                <MaterialIconsIcon name={item?.icon} size={categoryIconSize} color={item?.color} style={{ opacity: 0.5 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.divider]} />

        {/* Weather & Air Quality */}
        <View style={styles.infoCards}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Gurugram</Text>
              <View style={[styles.rowcontainer, { marginTop:10 }]}>
                <Text style={styles.cardText}>30°</Text>
                <Text style={styles.cardText}>🌙</Text>
              </View>

            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Air quality · 170</Text>
              <View style={[styles.rowcontainer, { marginTop:10 }]}>
                <Text style={[styles.cardText,{  fontSize: 12,}]}>Moderate</Text>
                <MaterialIconsIcon name={"density-medium"} size={categoryIconSize} color={"#fff"} />
              </View>
            </View>
            <View style={styles.card}>
            <View style={[styles.rowcontainer, { marginBottom:10,  justifyContent: "flex-start", alignItems: 'center', }]}>
                <MaterialIconsIcon name={"settings"} size={categoryIconSize} color={"#fff"} />
                <Text style={[styles.cardTitle, { color: "#B0C4DE" ,paddingBottom:0}]}> Settings</Text>
              </View>
              <Text style={{color:"#fff",fontSize:11,marginTop:10}} >Customise your space</Text>
            </View>
          </ScrollView>
        </View>



        {/* Posts List */}
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.postsContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        />


      </Animated.ScrollView>
    </View>

  );
};


export default HomeScreen;
