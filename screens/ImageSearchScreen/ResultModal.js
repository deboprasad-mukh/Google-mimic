import React from "react";
import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity, Dimensions, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
const { height } = Dimensions.get("window");

const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
    { id: '6', title: 'Item 6' },
    { id: '7', title: 'Item 7' },
    { id: '8', title: 'Item 8' },
];

const ResultModal = ({ navigation }) => {
    const translateY = useSharedValue(height * 0.6); // Start position (collapsed state)

    const relatedSearchData = [
        { id: "1", title: "Petroleum Jelly Original Vaseline", image: "https://via.placeholder.com/100" },
    ];

    const normalSearchData = [
        {
            id: "1",
            title: "Vaseline cream - Price in India",
            source: "Flipkart",
            stock: "In stock",
            price: "₹510*",
            image: "https://via.placeholder.com/120",
        },
        {
            id: "2",
            title: "Petroleum Jelly Original Vaseline",
            source: "Amazon.in",
            stock: "In stock",
            price: "₹75*",
            image: "https://via.placeholder.com/120",
        },
        {
            id: "3",
            title: "She looks 10 years younger with this...",
            source: "YouTube",
            stock: "",
            price: "",
            image: "https://via.placeholder.com/120",
        },
        {
            id: "4",
            title: "She looks 10 years younger with this...",
            source: "YouTube",
            stock: "",
            price: "",
            image: "https://via.placeholder.com/120",
        },
        {
            id: "5",
            title: "She looks 10 years younger with this...",
            source: "YouTube",
            stock: "",
            price: "",
            image: "https://via.placeholder.com/120",
        },
        {
            id: "6",
            title: "She looks 10 years younger with this...",
            source: "YouTube",
            stock: "",
            price: "",
            image: "https://via.placeholder.com/120",
        },
        {
            id: "7",
            title: "She looks 10 years younger with this...",
            source: "YouTube",
            stock: "",
            price: "",
            image: "https://via.placeholder.com/120",
        },
        {
            id: "8",
            title: "She looks 10 years younger with this...",
            source: "YouTube",
            stock: "",
            price: "",
            image: "https://via.placeholder.com/120",
        },
        {
            id: "9",
            title: "She looks 10 years younger with this...",
            source: "YouTube",
            stock: "",
            price: "",
            image: "https://via.placeholder.com/120",
        },
    ];


    // // Render a related search item
    // const renderRelatedSearchItem = ({ item }) => (
    //     <View style={styles.relatedSearchItem}>
    //         <Image source={{ uri: item.image }} style={styles.relatedSearchImage} />
    //         <Text style={styles.relatedSearchText}>{item.title}</Text>
    //     </View>
    // );

    // Render a normal search item
    const renderNormalSearchItem = ({ item }) => (
        <View style={styles.resultItem}>
            <Image source={{ uri: item.image }} style={styles.resultImage} />
            <View style={styles.resultDetails}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                <Text style={styles.resultSource}>{item.source}</Text>
                {item.stock ? <Text style={styles.resultStock}>{item.stock}</Text> : null}
                {item.price ? <Text style={styles.resultPrice}>{item.price}</Text> : null}
            </View>
        </View>
    );
    const renderItemRow = ({ item, index }) => {
        // Check if it's an odd index, to render two items side by side
        const item1 = normalSearchData[index * 2];
        const item2 = normalSearchData[index * 2 + 1];
    
        return (
          <View style={styles.row}>
            {item1 && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item1.image }} style={styles.image} />
                <View style={{flexDirection:"row",justifyContent:'flex-start',paddingTop:2}}>
                <Icon name="youtube" size={24} color={"#FF0000"} />
                <Text style={[styles.description,{marginTop:0}]}>Youtube</Text>
                </View>    
                
                <Text style={styles.description}>{item1.title}</Text>
              </View>
            )}
            {item2 && (
              <View style={styles.imageContainer2}>
                <Image source={{ uri: item2.image }} style={styles.image} />
                <Text style={styles.description}>{item2.title}</Text>
              </View>
            )}
          </View>
        );
      };

    return (
        <NativeViewGestureHandler waitFor="panGesture">
        <View style={styles.container}>
           
            {/* Search Bar */}
        

            {/* Categories */}
            <View style={styles.categoryBar}>
                {["All", "Products", "Homework", "Visual matches", "About this image"].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.categoryItem}>
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {/* Normal Search */}
                <FlatList
                    data={normalSearchData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItemRow}
                    style={styles.normalSearchList}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled // Allow independent scrolling
                    scrollEventThrottle={16} 
                    numColumns={1}
                />

                {/* Related Search
                <View style={styles.relatedSearch}>
                    <Text style={styles.relatedSearchTitle}>Related search</Text>
                    <FlatList
                        data={relatedSearchData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderRelatedSearchItem}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled // Allow independent scrolling
                        scrollEventThrottle={16} 
                    />
                </View> */}
            </View>
      
        </View>
        </NativeViewGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 10,
    },
    searchBar: {
        marginBottom: 10,
    },
    searchInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222222",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        fontSize: 16,
    },
    categoryBar: {
        flexDirection: "row",
        marginBottom: 10,
    },
    categoryItem: {
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#333333",
        borderRadius: 20,
    },
    categoryText: {
        color: "#fff",
        fontSize: 14,
    },
    content: {
        flexDirection: "row",
        flex: 1,
    },
    normalSearchList: {
        flex: 1,
        marginRight: 10,
    },
    resultItem: {
       justifyContent:'center',
       alignItems:'center',
       alignSelf:'center',
        marginBottom: 10,
        backgroundColor: "#222222",
        borderRadius: 8,
        padding: 10,
    },
    resultImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    resultDetails: {
        marginLeft: 10,
        justifyContent: "center",
    },
    resultTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    resultSource: {
        color: "#ccc",
        fontSize: 14,
    },
    resultStock: {
        color: "#4caf50",
        fontSize: 14,
    },
    resultPrice: {
        color: "#ff9800",
        fontSize: 14,
        fontWeight: "bold",
    },
    relatedSearch: {
        width: 150,
        backgroundColor: "#222222",
        borderRadius: 8,
        padding: 10,
    },
    relatedSearchTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    relatedSearchItem: {
        marginBottom: 10,
        alignItems: "center",
    },
    relatedSearchImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginBottom: 5,
    },
    relatedSearchText: {
        color: "#fff",
        fontSize: 12,
        textAlign: "center",
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      imageContainer: {
        width: '48%',
       
        marginBottom: 10,
      },
      imageContainer2: {
        width: '48%',
        height:"80%",
        marginTop: 30,
      },
      image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
      },
      description: {
        marginTop: 2,
    
        color: '#999',
        fontSize: 14,
      },
});



export default ResultModal;