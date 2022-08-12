import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoTransferOutVerifyOTPComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoTransferOutVerifyOTPComponentStyles
): CryptoTransferOutVerifyOTPComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 25,
      flex: 1,
      backgroundColor: '#F1F6FC',
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
      marginTop: 20,
    },
    pageSubTitle: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: '#4E4B50',
    },
    content: {
      marginTop: 20,
    },
    infoView: {
      marginTop: 25,
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 30,
    },
    receiveOTPOptionBtn: {},
    receiveOTPOptionLabel: {
      color: colors.primaryButtonColor,
      textDecorationLine: 'underline',
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 16,
    },
    noteView: {
      padding: 20,
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: '#DDD9E4',
    },
    noteLabel: {
      color: '#1D1C1D',
      fontFamily: fonts.regular,
      fontSize: 10,
    },
    btnBackToDashboard: {
      borderColor: colors.primaryButtonColor,
      borderWidth: 1,
      marginTop: 10,
    },
    labelBackToDashboard: { color: colors.primaryButtonColor },
    countdownWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 40,
    },
    notReceivedCodeLabel: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 24,
      color: '#020000',
    },
    sendAnotherLabel: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 24,
      textDecorationLine: 'underline',
      color: colors.primaryButtonColor,
    },
    durationLabel: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 24,
      color: '#BAB7BB',
    },
    errorWrapper: {
      alignItems: 'center',
      marginTop: 15
    },
    errorText: {
      color: '#D32F2F'
    }
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
