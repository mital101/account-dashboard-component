import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import { AccountInfoCardThemeStyles } from './index';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: AccountInfoCardThemeStyles) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      paddingVertical: 10,
      flex:1,
      marginHorizontal:15,
      marginTop:15

    },
    containerWrapperStyle: {
      flex:1,
      paddingHorizontal: 22,
    },
    text: {
      fontSize: 12,
      color: '#3E2D68',
      marginRight:10
    },
    viewAll:{
      color: '#F8981D',
      fontWeight: '700',
      fontSize:14,
      lineHeight:16,
      textDecorationLine: 'underline',
      paddingRight:3

    },
    rowCurrency: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    currency: {
      fontWeight: '700',
      fontSize: 16,
      color: '#3E2D68',
    },
    rowSpaceBetween: {
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      marginTop: 10,
    },
    rowWrapper: {
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      marginTop: 20,
    },
    mainLabel:{
      fontWeight: '500',
      fontSize: 14,
      color: '#000000',
    },
    subLabel:{
      fontWeight: '500',
      fontSize: 10,
      color: '#7F7B82',
    },
    title: {
      fontWeight: '500',
      lineHeight:24,
      fontSize: 14,
      color: '#020000',
      marginTop:30
    },
    text: {
      fontSize: 10,
      color: '#7F7B82',
      textAlign:'center',
      marginVertical:15,
      fontWeight: '500',
      lineHeight:18,
    },
    linkText:{
      color: '#F8981D',
      fontWeight: '700',
      fontSize:14,
      lineHeight:16,
      textDecorationLine: 'underline',
      marginVertical:15
    },
    item:{flexDirection:'row'},
    itemWrapper:{justifyContent:'space-between',paddingBottom:2,flex:1},
    itemContainer:{flexDirection:'row',justifyContent:'space-between',paddingLeft:10},
    placeHolderWrapper:{flex:1,justifyContent:'center',alignItems:'center'}

  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
