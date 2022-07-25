import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoTransferOutTransactionSuccessComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoTransferOutTransactionSuccessComponentStyles
): CryptoTransferOutTransactionSuccessComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      padding: 20,
      flex: 1,
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
    containerFailed: {
      padding: 20,
      flex: 1,
      backgroundColor: '#3E2D68',
    },
    containerCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    content: {
      alignItems: 'center',
    },
    contentSuccess: {
      marginBottom: 20,
      marginTop: 30,
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 8,
    },
    subTitleSuccess: {
      color: '#4E4B50',
      lineHeight: 24,
      fontSize: 14,
      fontFamily: fonts.regular,
    },
    subTitleSuccessWrapper: {
      marginTop: 25,
    },
    title: {
      color: '#3E2D68',
      fontSize: 24,
      fontFamily: fonts.medium,
    },
    titleSuccess: {
      fontSize: 24,
      color: '#2E7D32',
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
    completedTextColor: {
      color: '#2E7D32',
      fontFamily: fonts.medium,
      fontSize: 14,
    },
    btnTransparent: {
      borderColor: colors.primaryButtonColor,
      borderWidth: 1,
      marginTop: 10,
    },
    labelBtnTransaprent: { color: colors.primaryButtonColor },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
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
    logoContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 35,
    },
    btnActionsWrapper: {
      marginBottom: 20,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
