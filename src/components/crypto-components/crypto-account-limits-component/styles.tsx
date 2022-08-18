import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { AccountLimitsComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyles = (
  style?: AccountLimitsComponentStyles
): AccountLimitsComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: AccountLimitsComponentStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      backgroundColor: '#F1F6FC',
      flex: 1,
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    title: {
      color: '#020000',
      fontFamily: fonts.semiBold,
      fontSize: 16,
      marginVertical: 25,
    },
    subTitle: {
      color: '#4E4B50',
      fontFamily: fonts.medium,
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
      backgroundColor: '#FFFFFF',
      padding: 17,
      borderRadius: 8,
      marginTop: 10,
      paddingTop: 22,
      paddingBottom: 15,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    rowItem: {
      marginBottom: 18,
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
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
