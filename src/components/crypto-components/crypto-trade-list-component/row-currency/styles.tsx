import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import { AccountInfoCardThemeStyles } from './index';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: AccountInfoCardThemeStyles) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {

      borderRadius: 10,
      flex:1,
      marginHorizontal:15,

    },
    image:{
      width: 43,
      height: 43 
    },
    containerWrapperStyle: {
      flex:1,
      paddingHorizontal: 15,
    },
    title: {
      fontWeight: '700',
      fontSize: 24,
      color: '#3E2D68',
      lineHeight:36,
    },
    subTitle:{
      fontWeight: '700',
      fontSize: 12,
      color: '#7F7B82',
      lineHeight:21,
    },
    tableHeader:{
      justifyContent:'space-between',
      flexDirection:'row',
      flex:1,
      alignItems:'center',
    },
    tableHeaderText:{
      fontWeight: '500',
      fontSize: 10,
      color: '#4E4B50',
      lineHeight:18,
    },
    tableEndHeaderText:{
      fontWeight: '500',
      fontSize: 10,
      color: '#4E4B50',
      lineHeight:18,
      marginRight:10
    },
    positiveRate:{
      fontWeight: '700',
      fontSize: 12,
      color: '#2E7D32',
      marginRight:5
    },
    nagativeRate:{
      fontWeight: '700',
      fontSize: 12,
      color: '#D32F2F',
      marginRight:5
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
      color: '#4E4B50',
      lineHeight:18,
    },
    dataValue:{
      fontWeight: '500',
      fontSize: 12,
      color: '#000000',
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
