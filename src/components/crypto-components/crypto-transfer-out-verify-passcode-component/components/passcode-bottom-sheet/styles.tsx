import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { PasscodeModalStyles } from './index';

const useMergeStyles = (style?: PasscodeModalStyles): PasscodeModalStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: PasscodeModalStyles = StyleSheet.create({
    container: {
      padding: 25,
      alignItems: 'center',
      height: 350,
    },
    title: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#020000',
    },
    passcode: {
      color: '#3E2D68',
      fontSize: 24,
      fontFamily: fonts.medium,
      lineHeight: 36,
      letterSpacing: 5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 15,
    },
    closeTitle: {
      color: colors.primaryButtonColor,
      fontFamily: fonts.medium,
      fontSize: 14,
      textDecorationLine: 'underline',
    },
    content: {
      marginTop: 20,
      flex: 1,
    },
    btnCancel: {
      borderColor: colors.primaryButtonColor,
      borderWidth: 1,
      marginTop: 10,
    },
    labelBtnCancel: { color: colors.primaryButtonColor },
    rowSelect: {
      alignItems: 'center',
      flexDirection: 'row-reverse',
      marginVertical: 8,
    },
    titleRowSelect: {
      marginLeft: 0,
    },
    selectedBox: {
      backgroundColor: '#14BDEB',
      borderColor: 'transaprent',
    },
    unSelectedBox: { borderColor: 'transparent', backgroundColor: '#F4F4F4' },
    actionsView: { marginTop: 20, width: '100%' },
    countdownCircleWrapper: {
      marginTop: 25,
      marginBottom: 12,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
