import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { CryptoLinkAccountComponentStyles } from '.';

const useMergeStyles = (
  style?: CryptoLinkAccountComponentStyles
): CryptoLinkAccountComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: CryptoLinkAccountComponentStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3E2D68',
    },
    mainContainerStyle: {
      height: Dimensions.get('window').height - 125,
    },
    headerTitle: {
      fontSize: 12,
      color: '#fff',
      marginVertical: 11,
      alignItems: 'center',
    },
    headerIcon: {
      fontSize: 12,
      color: '#000',
      marginVertical: 11,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      marginHorizontal: 25,
      justifyContent: 'space-between',
      marginTop: 24,
    },
    title: {
      fontSize: 24,
      lineHeight: 36,
      color: '#fff',
      marginTop: 17,
    },
    subTitle: {
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      color: '#fff',
      marginTop: 17,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
    contentWrapper: {
      marginVertical: 11,
      paddingHorizontal: 20,
    },
    contentTitle: {
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 24,
      color:'#fff',
    },
    checkBoxWrapper: { marginTop: 19 },
    checkBoxWrapperWithTooltip: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    tcLink:{color:'#F8981D',textDecorationLine: 'underline'},
    checkBoxInputFieldStyle: {
      selectedBoxStyle: {
        width: 20,
        height: 20,
        borderRadius: 4,
        backgroundColor: '#14BDEB',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
      },
      unSelectedBoxStyle: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#14BDEB',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
      },
      titleStyle: {
        flex: 1,
        fontSize: 12,
        color: '#FFF',
        lineHeight: 21,
      },
      containerStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
    },
    tcContentWrapper: {
      flex:1,
      backgroundColor:'#F1F6FC',

    },
    webViewmainContainerStyle: {
      height: Dimensions.get('window').height - 95,
    },
    webViewheader: {
      flexDirection: 'row',
      marginHorizontal: 25,
      justifyContent: 'space-between',
      marginVertical: 14,
    },
    disableButtonWrapper:{ paddingHorizontal: 15, bottom: 5,opacity:0.5 },
    buttonWrapper:{ paddingHorizontal: 15, bottom: 5 },
    riskHeadersubTitle: {
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 24,
      color: '#fff',
      marginTop: 17,
      paddingHorizontal: 20,
    },
    riskContentSubTitle: {
      fontWeight: '700',
      fontSize: 12,
      lineHeight: 17,
      color: '#ddd',
      // paddingHorizontal: 20,
    },
    riskContentTitle:{
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      color:'#fff',
    },
    radioBtncontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'space-between',
    },
    radioRowBetween:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    radioRow:{
      flexDirection: 'row'
    },
    radioRowInfo: {
      height: 45,
      justifyContent: 'space-between',
      // marginLeft: 10,
      paddingVertical: 2,
      flex: 1,
    },
    radioMainTitle:{
      color: '#FFF',
      fontSize: 12,
    },
    selectedRadioBtn: { flex: 1, backgroundColor: '#14BDEB', borderRadius: 20 },
    radioBtn: {
      marginLeft: 15,
      width: 30,
      height: 30,
      borderRadius: 20,
      borderColor: '#14BDEB',
      borderWidth: 1,
      padding: 4,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
