import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { fontFamilyNames } from '../../utils';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        // justifyContent: 'center',
        alignItems: 'center',
    },

    listeningText: {
        fontSize: wp(6.5),
       
        color: "#b5b4b1",
        marginBottom: wp(5.4),
        fontFamily:fontFamilyNames.GREGULAR
    },
    animation: {
        width: '100%',
        height: wp(41),
        marginTop: wp(21)
    },

    navItem: {
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: wp(4.1),
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: "#3d3d3d",
        borderRadius: wp(5.4),
        justifyContent: "flex-end"
    },
    navText: {
        color: "#b5b4b1",
        fontSize: wp(3.2),
        fontFamily:fontFamilyNames.GREGULAR
    },

    bottomNavSong: {
        position: 'absolute',
        bottom: wp(2.73)
    },
});

export default styles;