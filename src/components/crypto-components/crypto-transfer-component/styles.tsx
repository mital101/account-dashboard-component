import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoTransferComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoTransferComponentStyles
): CryptoTransferComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 25,
      flex: 1,
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    title: {
      color: '#020000',
      fontFamily: fonts.medium,
      fontSize: 12,
      marginBottom: 20,
    },
    subTitle: {
      color: '#4E4B50',
      fontFamily: fonts.regular,
      fontSize: 14,
      marginVertical: 15,
    },
    scrollView: { marginBottom: 100 },
    contactContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 5,
    },
    tabbar: {
      flex: 1,
    },
    headerWrapper: {
      flexDirection: 'row',
    },
    headerView: {
      flex: 1,
      paddingVertical: 8,
      marginVertical: 15,
      alignItems: 'center',
    },
    headerSelectedBg: {
      backgroundColor: '#FFF0D9',
      borderRadius: 4,
    },
    headerTitle: {
      color: '#F8981D',
      fontSize: 14,
      fontFamily: fonts.semiBold,
    },
    content: {
      borderRadius: 8,
      marginTop: 10,
      paddingBottom: 15,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    rowItem: {
      width: '85%',
    },
    remainTitle: {
      fontSize: 10,
      color: '#1D1C1D',
      fontFamily: fonts.regular,
    },
    limitTitle: {
      fontSize: 12,
      fontFamily: fonts.semiBold,
      color: '#020000',
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    titleLogo: {
      fontSize: 8,
      color: '#1F2452',
    },
    imageWrapper: { width: 40, height: 40 },
    rowTitle: { flexDirection: 'row' },
    iconCrypto: { width: '100%', height: '100%' },
    titleSection: {
      flexDirection: 'column',
      marginLeft: 10,
      justifyContent: 'space-between',
    },
    rowWrapper: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    mainLabel: {
      fontWeight: '500',
      fontSize: 14,
      color: '#000000',
    },
    subLabel: {
      fontWeight: '500',
      fontSize: 10,
      color: '#7F7B82',
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
    actionWrapper: { paddingHorizontal: 23 },
    rowInput: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    balanceLabel: {
      fontSize: 16,
      fontFamily: fonts.medium,
      color: '#1D1C1D',
    },
    smallBalanceLabel: {
      fontSize: 10,
      fontFamily: fonts.medium,
      color: '#1D1C1D',
    },
    currentBalanceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingLeft: 22,
    },
    cardInputBalance: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      width: '100%',
    },
    inputBalanceWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: '#EAEAEB',
      alignItems: 'center',
      paddingTop: 28,
    },
    paddingBottomView: {
      paddingBottom: 28,
    },
    dailyLimitLabel: {
      fontSize: 12,
      color: '#020000',
      fontFamily: fonts.regular,
    },
    balanceTitle: {
      fontSize: 10,
      color: '#7F7B82',
      fontFamily: fonts.regular,
    },
    purchaseOptionView: {
      alignItems: 'center',
      marginTop: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelPurchase: {
      fontSize: 10,
      fontFamily: fonts.regular,
      color: '#4E4B50',
      marginTop: 2,
    },
    horizontalPadding: {
      width: 5,
    },
    dailyLimit: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 20,
      marginTop: 28,
    },
    aboutLimitLabel: {
      color: '#F8981D',
      textDecorationLine: 'underline',
      fontFamily: fonts.medium,
      fontSize: 12,
      marginRight: 5,
    },
    input: {
      marginLeft: 5,
      fontSize: 16,
      color: '#1D1C1D',
    },
    remainingWrapper: {
      alignItems: 'center',
      marginTop: 10,
    },
    remainLabel: {
      color: '#BAB7BB',
      fontSize: 10,
      fontFamily: fonts.regular,
    },
    errorText: {
      fontSize: 10,
      color: '#D32F2F',
      fontFamily: fonts.regular,
      maxWidth: '80%',
      textAlign: 'center',
    },
    errorRow: {
      alignItems: 'center',
      marginTop: 8,
      paddingBottom: 12,
    },
    pageSubTitle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#4E4B50',
    },
    pageSubTitleSection: {
      marginVertical: 15,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
