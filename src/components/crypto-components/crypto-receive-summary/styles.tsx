import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoReceiveSummaryComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoReceiveSummaryComponentStyles
): CryptoReceiveSummaryComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 25,
      flex: 1,
      backgroundColor: '#F1F6FC'
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    actionWrapper: {
      marginTop: 40,
      marginBottom: 20,
      paddingHorizontal: 25,
    },
    pageSubTitleView: {
      marginTop: 20
    },
    pageSubTitle: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: '#4E4B50'
    },
    content: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginTop: 20,
      borderRadius: 8,
    },
    infoView: {
      marginTop: 25
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 15
    },
    noteView: {
      padding: 20,
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: '#DDD9E4'
    },
    noteLabel: {
      color: '#1D1C1D',
      fontFamily: fonts.regular,
      fontSize: 10
    },
    btnBackToDashboard: {borderColor: colors.primaryButtonColor, borderWidth: 1, marginTop: 10},
    labelBackToDashboard: {color: colors.primaryButtonColor},
    containerFailed: {
      padding: 20,
      flex: 1,
      backgroundColor: '#3E2D68',
    },
    rrorContentWrapper: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 50,
    },
    columnBetween: {
      flex: 1,
      justifyContent: 'space-around',
    },
    errorTitleWrapper: {
      alignItems: 'center',
    },
    errorMessageWrapper: {
      marginTop: 24,
    },
    errorContentWrapper: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 50,
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
    errorMessageLabel: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: fonts.medium,
      textAlign: 'center',
    },
    rowErrorBetween: {
      marginTop: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    containerCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    title: {
      color: '#3E2D68',
      fontSize: 24,
      fontFamily: fonts.medium,
    },
    subTitleWrapper: {
      marginTop: 25,
      marginBottom: 50,
      maxWidth: '80%',
    },
    circleProgressWrapper: {
      marginTop: 15,
    },
    subTitle: {
      fontSize: 16,
      color: '#7F7B82',
      fontFamily: fonts.medium,
      textAlign: 'center',
    },
    loadingContent: {
      alignItems: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
