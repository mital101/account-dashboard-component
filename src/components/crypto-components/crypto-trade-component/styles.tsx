import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import { AccountInfoCardThemeStyles } from './index';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: AccountInfoCardThemeStyles) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      marginHorizontal: 25,
      justifyContent: 'space-between',
      marginTop: 24,
    },
    image:{
      width: 43,
      height: 43
    },
    containerStyle: {
      borderRadius: 10,
      flex:1,
      marginHorizontal:15,
    },
    containerWrapperStyle: {
      flex:1,
      paddingHorizontal: 15,
    },
    successContainerStyle: {
      borderRadius: 10,
      flex:1,
      marginHorizontal:15,
      paddingTop: 50,
    },
    rowSpaceBetween: {
      justifyContent:'space-between',
      flexDirection:'row',
      alignItems:'center',
      marginTop: 10,
    },
    headerActiveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      backgroundColor:'#FFF0D9',
      paddingVertical:12,
      paddingHorizontal:50
    },
    headerInActiveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      // backgroundColor:'#FFF0D9',
      paddingVertical:12,
      paddingHorizontal:50
    },
    buttonTitle: {
      fontWeight: '700',
      fontSize: 14,
      color: '#F8981D',
      lineHeight:16,
    },
    labelWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'#fff',
      paddingVertical:13,
      paddingHorizontal:15,
      marginVertical: 20,
      borderRadius:6,

      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.2,
      shadowRadius: 1,
      elevation: 3,
    },
    headerBannerWrapper: {
      justifyContent: 'space-between',
      paddingLeft:7,
      paddingRight:20
      // alignItems: 'center',
    },
    headerLabel:{
      fontWeight: '700',
      fontSize: 14,
      color: '#020000',
      lineHeight:16,
      paddingBottom:5
    },
    headerSubLabel:{
      fontWeight: '400',
      fontSize: 10,
      color: '#7F7B82',
      lineHeight:16,
      paddingTop:5
    },
    subHeader:{
      flexDirection:'row',
    },
    subHeaderText:{
      fontWeight: '700',
      fontSize: 12,
      color: '#020000',
      lineHeight:21,
    },
    cardWrapper: {
      // flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:'#fff',
      paddingTop:20,
      // paddingHorizontal:16,
      paddingBottom:12,
      marginVertical: 20,
      borderRadius:6,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.2,
      shadowRadius: 1,
      elevation: 3,
    },
    cardBannerWrapper: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal:16,
    },
    cardBannerContainer: {flex:1,justifyContent: 'space-between',flexDirection: 'row'},
    cardLabelText:{
      fontWeight: '700',
      fontSize: 16,
      color: '#1D1C1D',
      lineHeight:24,
      paddingBottom:5
    },
    cardInputLabelText:{
      fontWeight: '700',
      fontSize: 16,
      color: '#1D1C1D',
      lineHeight:20,
      paddingBottom:5
    },
    textBoxWrapper:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      textAlignVertical: 'center'
    },
    cardValueText:{
      fontWeight: '500',
      fontSize: 14,
      color: '#1D1C1D',
      lineHeight:24,
      paddingBottom:5
    },
    cardButtonWrapper: {
      // flex:1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop:15,
    },
    cardButtonText:{
      fontWeight: '700',
      fontSize: 12,
      color: '#fff',
      lineHeight:21,
    },
    cardButtonItem:{
      backgroundColor:'#DDD9E4',
      paddingVertical:4,
      paddingHorizontal:20,
      marginHorizontal:3,
      borderRadius:4,
      // opacity:
    },
    activeCardButtonItem:{
      backgroundColor:'#F8981D',
      paddingVertical:4,
      paddingHorizontal:20,
      marginHorizontal:3,
      borderRadius:4,
      // opacity:
    },
    hrL:{
      height:1,
      backgroundColor:'#EAEAEB',
      marginVertical:15,
      width:'100%'
    },
    footerBannerWrapper:{
      justifyContent: 'flex-start',
      flexDirection:'row',
      paddingHorizontal:15,
      width:'100%'
    },
    footerSubLabel:{
      fontWeight: '400',
      fontSize: 10,
      color: '#7F7B82',
      lineHeight:16,
      paddingTop:5
    },
    footerLabel:{
      fontWeight: '700',
      fontSize: 10,
      color: '#000',
      lineHeight:16,
      paddingTop:5
    },
    footerCardWrapper: {
      // flexDirection: 'row',
      backgroundColor:'#DDD9E4',
      // paddingTop:20,
      paddingHorizontal:10,
      paddingVertical:10,
      // marginVertical: 20,
      borderRadius:6,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.2,
      shadowRadius: 1,
      elevation: 3,
    },
    footerCardSubLabel:{
      fontWeight: '500',
      fontSize: 9,
      color: '#3E2D68',
      lineHeight:18,
      // paddingTop:5
    },
    footerCardLabel:{
      fontWeight: '700',
      fontSize: 10,
      color: '#1D1C1D',
      lineHeight:18,
      textDecorationLine:'underline'
    },
    footerContainerStyle: {
      paddingVertical: 24,
      backgroundColor: 'rgba(246, 250, 255, 0.8)',
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%'
    },
    footerButtonWrapper : {flex:1,paddingHorizontal:6},
    containerStyle2: {
      padding: 25,
    },
    headerWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginVertical: 20,

    },
    modalTitleStyle: {
      fontWeight:'700',
      fontSize: 16,
      lineHeight: 24,
      color: '#020000'
    },
    modalTitleButtonStyle:{
      fontWeight:'700',
      fontSize: 16,
      lineHeight: 24,
      color: '#F8981D',
      textDecorationLine:'underline'
    },
    modalItemWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginVertical: 5,
    },
    modalItemTimer:{
      flexDirection:'row',
      justifyContent:'center',
      marginVertical: 5,
    },
    itemLabelStyle: {
      fontWeight:'500',
      fontSize: 14,
      lineHeight: 24,
      color: '#7F7B82'
    },
    itemValueStyle: {
      fontWeight:'700',
      fontSize: 14,
      lineHeight: 16,
      color: '#1D1C1D'
    },
    successTitle:{
      fontWeight: '700',
      fontSize: 24,
      color: '#2E7D32',
      lineHeight:36,
    },
    successHeaderMessage:{
      fontWeight: '500',
      fontSize: 14,
      color: '#4E4B50',
      lineHeight:24,
      marginVertical:20,
    },
    successPanel:{
      // flexDirection: 'row',
      backgroundColor:'#FFFFFF',
      paddingHorizontal:10,
      paddingVertical:10,
      borderRadius:6,
      marginVertical:20,
    },
    successItemGroup:{
      paddingVertical:7,
    },
    successItemLabel:{
      fontWeight: '500',
      fontSize: 12,
      color: '#7F7B82',
      lineHeight:21,
    },
    successItemValue:{
      fontWeight: '500',
      fontSize: 14,
      color: '#1D1C1D',
      lineHeight:24,
    },
    successItemStatus:{
      fontWeight: '700',
      fontSize: 14,
      color: '#2E7D32',
      lineHeight:16,
    },
    successDetailWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:8,
      alignItems:'center'
    },
    successDetailLabel:{
      fontWeight: '500',
      fontSize: 12,
      color: '#7F7B82',
      lineHeight:16,
    },
    successDetailValue:{
      fontWeight: '500',
      fontSize: 12,
      color: '#1D1C1D',
      lineHeight:21,
    },
    successLogoWrapper:{
      justifyContent:'center',
      flexDirection:'row',
      marginVertical:30
    },
    successButtonWrapper:{
      paddingVertical:5
    },
    successButtonPrimaryLabelStyle:{
      fontSize: 14,
      color: colors.primaryButtonColor,
      fontFamily: fonts.medium,
    },
    successButtonPrimaryStyle:{
      height: 42,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderColor:colors.primaryButtonColor,
      borderWidth:2,
    },
    containerFailed: {
      padding: 20,
      flex: 1,
      backgroundColor: '#3E2D68',
    },
    columnBetween: {
      flex: 1,
      justifyContent: 'space-around',
    },
    errorContentWrapper: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 50,
    },
    errorTitleWrapper: {
      alignItems: 'center',
    },
    errorMessageWrapper: {
      marginTop: 24,
    },
    errorMessageLabel: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: fonts.medium,
      textAlign: 'center',
    },
    iconErrorWrapper: {
      marginBottom: 30,
    },
    statusLabel: {
      color: '#E06D6D',
      fontSize: 24,
      fontFamily: fonts.medium,
      lineHeight: 36,
    },
    rowErrorBetween: {
      marginTop: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    containerFailed: {
      padding: 20,
      flex: 1,
      backgroundColor: '#3E2D68',
    },
    infoTitle: {
      color: '#7F7B82',
      fontSize: 12,
      fontFamily: fonts.regular,
    },
    infoSubTitle: {
      color: '#1D1C1D',
      fontSize: 12,
      fontFamily: fonts.regular,
    },
    errorInfoTitleColor: {
      color: '#FFFFFF',
    },
    btnTransparent: {
      borderColor: colors.primaryButtonColor,
      borderWidth: 1,
      marginTop: 10,
    },
    labelBtnTransaprent: { color: colors.primaryButtonColor },

  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
