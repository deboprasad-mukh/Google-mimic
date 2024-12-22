// Placeholder for styles in the respective folder.
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { fontFamilyNames } from '../../utils';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121212",
      paddingHorizontal: wp(4.4),
      paddingTop: wp(5.4),
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      // backgroundColor: "#1F1F1F",
      // borderRadius: wp(2.1),
      // paddingHorizontal: wp(3.2),
      height:wp(13.1),
      marginBottom: wp(4.4),
      borderBottomWidth: 0.5,
      borderBottomColor: "#333",
    },
    input: {
      flex: 1,
      color: "#fff",
      fontSize: wp(4.4),
      marginLeft: wp(2.1),
      fontFamily:fontFamilyNames.GREGULAR
    },
    icon: {
      marginLeft: wp(2.1),
    },
    historyList: {
      flex: 1,
    },
    historyItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: wp(3.2),
      // borderBottomWidth: 0.5,
      borderBottomColor: "#333",
    },
    historyLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    historyText: {
      color: "#fff",
      fontSize: wp(4.4),
      marginLeft: wp(3.2),
      fontFamily:fontFamilyNames.GREGULAR
    },
  });
  
export default styles;  