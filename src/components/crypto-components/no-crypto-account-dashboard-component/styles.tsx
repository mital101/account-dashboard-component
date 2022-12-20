import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import { EmptyWalletThemeStyles } from '.';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: EmptyWalletThemeStyles) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#3E2D68',
      borderRadius: 10,
      paddingVertical: 20,
      marginHorizontal:15,
      flex:1,
      paddingHorizontal: 22,
      width: Dimensions.get('window').width - 30,

    },
    containerWrapperStyle:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageTextStyle: {
      // fontFamily: fonts.medium,
      fontWeight:'700',
      fontSize: 16,
      color: '#FFFFFF',
      lineHeight: 24,
      marginTop: 10,
    },
    subMessageTextStyle: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 21,
      color: '#FFFFFF',
      textAlign:'center'
    },
    messageContainerStyle: {
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      width: 260
    },
    buttonStyle:{
      // height:40,
      backgroundColor: '#F8981D',
      width: '90%',
      paddingVertical: 12,
      borderRadius: 5,
      marginVertical: 10
    },
    buttonLabelTextStyle:{
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 16,
      color: '#FFFFFF',
      textAlign:'center'
    },
    lineSeperatorStyle:{
      marginTop: 10,
      backgroundColor: '#fff',
      height: 1,
      width: '100%',
      opacity: 0.2,
    },
    buttonWrapper:{
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between',
      marginTop: 20,
    }
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
