import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoTradeComponentStyles } from './index';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: CryptoTradeComponentStyles) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      borderRadius: 10,
      flex: 1,
      marginHorizontal: 15,
    },
    containerWrapperStyle: {
      flex: 1,
      paddingHorizontal: 15,
    },
    pointer: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#000000',
    },
    title: {
      fontWeight: '700',
      fontSize: 24,
      color: '#3E2D68',
      lineHeight: 36,
    },
    subTitle: {
      fontWeight: '500',
      fontSize: 14,
      color: '#7F7B82',
      lineHeight: 24,
    },
    exchangeRate: {
      fontWeight: '500',
      fontSize: 12,
      color: '#2E7D32',
      lineHeight: 21,
    },
    nagativeExchangeRate: {
      fontWeight: '500',
      fontSize: 12,
      color: '#D32F2F',
      lineHeight: 21,
    },
    exchangePrecentage: {
      fontWeight: '500',
      fontSize: 14,
      color: '#1D1C1D',
      lineHeight: 24,
    },
    headerWrapper: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingVertical: 5,
    },
    chartActiveButton: {
      backgroundColor: '#FFF0D9',
      padding: 12,
    },
    chartInaActiveButton: {
      padding: 12,
    },
    chartButtonText: {
      fontWeight: '700',
      fontSize: 14,
      color: '#F8981D',
      lineHeight: 16,
    },
    rowWrapper: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 15,
    },
    rowSpaceBetween: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    image: {
      width: 40,
      height: 40,
    },
    rowCurrency: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    rowAbout: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 25,
    },
    title2: {
      fontWeight: '700',
      fontSize: 16,
      color: '#1D1C1D',
      lineHeight: 24,
      marginVertical: 15,
    },
    message: {
      fontWeight: '500',
      fontSize: 12,
      color: '#4E4B50',
      lineHeight: 21,
    },
    message2: {
      fontWeight: '500',
      fontSize: 11,
      color: '#4E4B50',
      lineHeight: 21,
    },
    footerContainerStyle: {
      paddingVertical: 24,
      backgroundColor: 'rgba(246, 250, 255, 0.8)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    footerButtonWrapper: { flex: 1, paddingHorizontal: 6 },

    mainLabel: {
      fontWeight: '500',
      fontSize: 14,
      color: '#000000',
    },
    subLabel: {
      fontWeight: '500',
      fontSize: 10,
      color: '#4E4B50',
      lineHeight: 18,
    },
    dataValue: {
      fontWeight: '500',
      fontSize: 12,
      color: '#000000',
    },
    text: {
      fontSize: 10,
      color: '#7F7B82',
      textAlign: 'center',
      marginVertical: 15,
      fontWeight: '500',
      lineHeight: 18,
    },
    linkText: {
      color: '#F8981D',
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 16,
      textDecorationLine: 'underline',
      marginVertical: 15,
    },

    item: { flexDirection: 'row' },
    itemWrapper: { justifyContent: 'space-between', paddingBottom: 2, flex: 1 },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
    },
    placeHolderWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
