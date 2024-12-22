import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { fontFamilyNames } from '../../utils';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: wp(5.5),
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    logo: {
      alignSelf: 'center',
      width: wp(32.8),
      height: wp(11),
      marginBottom: wp(4),
    },
    title: {
      fontSize: wp(6.5),
      color: '#202124',
      textAlign: 'center',
      fontFamily:fontFamilyNames.GREGULAR,
      marginBottom:wp(3)
    },
    subtitle: {
      fontSize: wp(4.4),
      color: '#5f6368',
      textAlign: 'center',
      marginBottom: wp(8.2),
      fontFamily:fontFamilyNames.GREGULAR
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#dadce0',
      padding: wp(2.8),
      fontSize: wp(4.4),
      color: '#202124',
      marginBottom: wp(5.5),
    },
    forgotText: {
      fontSize: wp(3.8),
      color: '#1a73e8',
      marginTop: wp(2.8),
      fontFamily:fontFamilyNames.GREGULAR
    },
    guestMode: {
      fontSize: wp(3.8),
      color: '#5f6368',
      marginTop: wp(5.46),
      textAlign: 'center',
      fontFamily:fontFamilyNames.GREGULAR
    },
    learnMore: {
      color: '#1a73e8',
      textDecorationLine: 'underline',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: wp(8.2),
    },
    createAccountText: {
      fontSize: wp(3.82),
      color: '#1a73e8',
      fontFamily:fontFamilyNames.GREGULAR
    },
    nextButton: {
      backgroundColor: '#1a73e8',
      paddingHorizontal: wp(5.46),
      paddingVertical: wp(2.8),
      borderRadius: wp(1.1),
    },
    nextButtonText: {
      fontSize: wp(4.4),
      color: '#fff',
      fontFamily:fontFamilyNames.GBOLD
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: wp(3.66),
      flexWrap: 'wrap',
    },
    footerText: {
      fontSize: wp(3.3),
      color: '#5f6368',
      marginHorizontal: wp(1.4),
      marginVertical: wp(0.6),
      fontFamily:fontFamilyNames.GREGULAR
    },
  });
export default styles;  