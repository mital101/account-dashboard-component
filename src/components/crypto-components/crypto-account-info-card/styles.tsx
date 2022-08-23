import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import { AccountInfoCardThemeStyles } from './index';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: AccountInfoCardThemeStyles) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#3E2D68',
      borderRadius: 10,
      paddingVertical: 17,
      flex:1,
      paddingHorizontal: 22,
      width: Dimensions.get('window').width - 30,
      marginHorizontal:15
    },
    text: {
      fontSize: 12,
      color: '#FFFFFF',
      marginRight:10
    },
    rowSpaceBetween: {
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center'
    },
    buttonWrapper: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // width: '80%',
      marginTop: 20,
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
    rowCurrency: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    currency: {
      fontWeight: '700',
      fontSize: 24,
      color: '#FFFFFF',
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
      color: '#FFFFFF',
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
    viewTooltipBalance: {paddingVertical:5,paddingHorizontal:5,width:200 },
    viewTooltip: { paddingVertical:15,paddingHorizontal:10,width:290 },
    viewTooltipHeader: { flexDirection: 'row',paddingBottom:10, },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
