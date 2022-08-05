import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { CryptoItemComponentStyle } from '.';

const useMergeStyles = (style?: CryptoItemComponentStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: CryptoItemComponentStyle = StyleSheet.create({
    containerStyle: {
      // backgroundColor: '#ffffff',
      borderRadius: 5,
      justifyContent: 'center',
      height: 110,
      // width:'80%',
      elevation: 2,
      shadowColor: 'grey',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      margin: 1,
      marginTop: 20,
      marginHorizontal:15
    },
    cardContainerStyle: {
      flex:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      paddingLeft:20
    },
    cardBackgroundStyle: {
    },
    contentContainerStyle: {
      // flex: 1,
      paddingHorizontal: 50,
      paddingTop: 18,
      paddingBottom: 20,
      justifyContent: 'space-between',
    },
    accountLinkTextStyle: {
      fontSize: 12,
      fontWeight:'700',
      paddingRight:10,
      color: '#FF9800',
      textDecorationLine:'underline',
      // lineHeight:21
    },
    accountLinkIconStyle:{paddingLeft:8,marginTop:-2,},
    cryptoNameStyle: {
      fontWeight:'500',
      fontSize: 12,
      color: '#fff',
      // lineHeight:21
    },
    cryptoWalletTitleStyle: {
      // fontFamily: fonts.bold,
      fontSize: 15,
      color: '#fff',
      fontWeight:'700',
      lineHeight:24
      // flex: 1,
    },
    headerContainerStyle: {
      // flexDirection: 'row',
      // alignItems: 'center',
      height:15,
      flex:1
    },
    accountNumberStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: '#FF9800',
      marginRight: 3,
      textDecorationLine: 'underline',
    },
    bottomContainerStyle: {
      flexDirection: 'row',
    },


    walletContainerStyle: {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      justifyContent: 'center',
      height: 173,
      elevation: 2,
      shadowColor: 'grey',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      margin: 1,
    },
    walletContentContainerStyle: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 20,
      justifyContent: 'space-between',
    },
    walletHeaderContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    walletNameStyle: {
      fontFamily: fonts.bold,
      fontSize: 12,
      color: '#FFF',
      flex: 1,
    },
    accountNumberStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: '#FF9800',
      marginRight: 3,
      textDecorationLine: 'underline',
    },
    amountTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 24,
      lineHeight: 36,
      color: '#FFF',
    },
    subRowCurrency: {
      flexDirection: 'row',
      // alignItems: 'center',
      // marginVertical: 1,
    },
    currencyLink:{
      fontWeight: '500',
      fontSize: 10,
      color: '#2E7D32',
    },
    currencySubLink:{
      fontWeight: '500',
      fontSize: 10,
      color: '#7F7B82',
    },


  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
