
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fontFamilyNames } from '../../utils';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      paddingTop: wp(3.4),
      paddingHorizontal: wp(2),
    },
   
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: wp(4.3),
    },
    time: {
      color: '#fff',
      fontSize: wp(4.9),
    },
    topIcons: {
      flexDirection: 'row',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: wp(1)>3.8? wp(7.3): wp(4.3),
    },
    logoText: {
      fontFamily: fontFamilyNames.GMED,
      fontSize: wp(9.8),
      color: '#fff',
      marginBottom: wp(17.8)
  
    },
  
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2D2D2D',
      borderRadius: 60,
   paddingHorizontal:10,
      width:"96%",
      height: hp(10),
    },
    searchIcon: {
      marginRight: wp(2.18),
    },
    input: {
      flex: 1,
      color: '#fff',
      fontSize: wp(4.91),
      fontFamily: fontFamilyNames.GREGULAR
    },
    categoryIcons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop:  wp(1.1),
      marginBottom:wp(1.4),
    },
    iconCircle: (color) => ({
      width: wp(21.9),
      height: wp(13.7),
      borderRadius: 30,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center',
      marginEnd: wp(2.73),
  
    }),
    infoCards: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      width: wp(41.25),
      backgroundColor: '#1F1F1F',
      marginHorizontal: wp(0.01),
      borderRadius: 12,
      padding: wp(3.27),
      marginRight: wp(2.73)
    },
    cardTitle: {
      color: '#fff',
      fontSize: wp(3.27),
      fontFamily: fontFamilyNames.GMED,
      paddingBottom: wp(2.8)
    },
    cardText: {
      color: '#fff',
      fontSize: wp(4.37),
      fontFamily: fontFamilyNames.GMED,
    },
    newsSection: {
      flexDirection: 'row',
      marginTop: wp(5.5),
      alignItems: 'center',
      backgroundColor: '#1F1F1F',
      borderRadius: 8,
      padding: wp(3.27),
    },
    newsImagePlaceholder: {
      width: wp(16.4),
      height: wp(16.4),
      borderRadius: 8,
      backgroundColor: '#555',
      marginRight: wp(3.27),
    },
    newsText: {
      flex: 1,
      color: '#fff',
      fontSize: wp(3.82),
      fontFamily:fontFamilyNames.GREGULAR
    },
    suggestionItem: {
      paddingVertical: wp(2.8),
      paddingHorizontal: wp(3.27),
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    suggestionText: {
      color: '#fff',
      fontSize: wp(4.37),
      fontFamily:fontFamilyNames.GREGULAR
    },
    loadingText: {
      color: '#999',
      textAlign: 'center',
      marginTop: wp(4.4),
      fontFamily:fontFamilyNames.GREGULAR
    },
    suggestionsContainer: {
      backgroundColor: '#1F1F1F',
      borderRadius: 8,
      paddingVertical: wp(2.2),
    },
    postsContainer: {
      paddingTop: wp(2.9),
    },
    postCard: {
     
      borderRadius: 10,
      marginBottom: wp(4.1),
      
    },
    postImage: {
      width: '100%',
      height: wp(41),
      borderRadius: 10,
      marginBottom: wp(2.8),
    },
    postTitle: {
      fontSize: wp(4.37),
      color: '#fff',
      marginBottom: wp(1.4),
      fontFamily:fontFamilyNames.GREGULAR
    },
    postSource: {
      fontSize: wp(3.27),
      color: '#aaa',
      fontFamily:fontFamilyNames.GREGULAR
    },
    
  
    stickySearchBar: {
      position: 'absolute',
      top: wp(30), // Below logo
      left: wp(3.5),
      right: 0,
      zIndex: 10,
  
  
    },
  
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoOne: {
      width: wp(4.2),
      height: wp(4.2),
      borderRadius: 12, // Circular logo
      marginRight: wp(2.18),
  
    },
    text: {
      color: '#fff',
      fontSize: wp(3.27),
      fontFamily:fontFamilyNames.GREGULAR
    },
    dot: {
      fontSize: wp(3.82),
      color: '#888', // Gray dot
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: wp(5.27),
    },
    rowcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    divider: {
      height: 1, 
      backgroundColor: '#666', 
      marginVertical: wp(2.8), 
    },
    postIconSize:{
  
    },
  });
  
export default styles;  