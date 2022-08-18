import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoTransactionsHistoryComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoTransactionsHistoryComponentStyles
): CryptoTransactionsHistoryComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      height: '100%',
      paddingHorizontal: 25,
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.medium,
      color: '#3E2D68',
    },
    sectionTitle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#7F7B82',
    },
    horizontalMargin: {
      width: 10,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
    },
    downloadBtnSection: {
      marginTop: 15,
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    selectTypeTitle: { color: '#1D1C1D', fontSize: 16 },
    loadMoreWrapper: { marginTop: 25, marginBottom: 60 },
    seperateView: { backgroundColor: '#FFFFFF' },
    headerWrapper: { marginTop: 20, marginBottom: 10 },
    emptyTransactionContainer: {
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 100,
    },
    emptyTransactionTitle: {
      fontSize: 16,
      color: '#1D1C1D',
      fontFamily: fonts.medium,
      textAlign: 'center',
      marginTop: 25,
    },
    emptyTransactionTitleNormal: {
      fontSize: 16,
      color: '#1D1C1D',
      fontFamily: fonts.regular,
      textAlign: 'center',
      marginTop: 25,
    },
    emptyTransactionSubTitle: {
      fontSize: 12,
      color: '#020000',
      fontFamily: fonts.regular,
      textAlign: 'center',
      marginTop: 25,
    },
    imageWrapper: {
      width: 150,
      height: 150,
      alignSelf: 'center',
    },
    imageEmpty: {
      width: '100%',
      height: '100%',
    },
    tranferInBtn: {
      marginTop: 34,
      alignSelf: 'center',
    },
    transferInLabel: {
      color: '#F8981D',
      textDecorationLine: 'underline',
      fonstSize: 14,
      fontFamily: fonts.medium,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
