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
      // paddingHorizontal: 22,
      // width: Dimensions.get('window').width - 30,
      marginHorizontal:15,
      marginTop:15
    },
    containerWrapperStyle: {
      flex:1,
      paddingHorizontal: 22,
    },
    rowSpaceBetween: {
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      marginTop: 10,
    },
    titleWrapper: {
      flexDirection: 'row',
    },
    title: {
      fontWeight: '500',
      lineHeight:24,
      fontSize: 14,
      color: '#020000',
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
    graphContainer:{height:200,width:150,paddingTop:20},
    placeHolderWrapper:{flex:1,justifyContent:'center',alignItems:'center'},
    item:{
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemContainer:{flexDirection: 'row', marginBottom: 12},







    itemSpaceBetween: {
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      // marginTop: 10,
    },
    subTitle: {
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      marginBottom:20
    },
    buttonWrapper: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // width: '80%',
      marginTop: 20,
      // backgroundColor:'red'
    },
    marginHorizontalView: {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    profileLink:{
      color: '#F8981D',
      fontWeight: '700',
      fontSize:14,
      lineHeight:16,
      textDecorationLine: 'underline',
      paddingRight:3

    },
    row: { flexDirection: 'row', alignItems: 'center' },

    subRowCurrency: {
      flexDirection: 'row',
      // alignItems: 'center',
      // marginVertical: 1,
    },
    accountBalance:{
      fontWeight: '500',
      fontSize: 12,
      color: '##7F7B82',
    },
    pointerView: {
      position: 'absolute',
      left: 0,
      bottom: 200,
      right: 0,
      alignItems: 'center',
      height: 100,
    },
    pointerText: {
      color: 'white',
      marginTop: 8,
      fontWeight: '700',
      fontSize: 14,
    },
    skipView: {
      position: 'absolute',
      bottom: 35,
      alignItems: 'center',
    },
    skipBtn: {
      padding: 15,
    },
    skipText: {
      color: '#3E2D68',
      fontWeight: '700',
      fontSize: 14,
    },
    column: { alignItems: 'center' },
    titleTooltip: {
      fontWeight: '700',
      fontSize: 14,
      lineHeight:16,
      marginLeft:10
    },
    messageTooltip: {
      fontWeight: '500',
      fontSize: 12,
      lineHeight:21,
    },
    viewTooltip: { paddingVertical:15,paddingHorizontal:10,width:290 },
    viewTooltipHeader: { flexDirection: 'row',paddingBottom:10, },
    currencyWrapper:{backgroundColor:'#DDD9E4',borderRadius:25,padding:5},
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
