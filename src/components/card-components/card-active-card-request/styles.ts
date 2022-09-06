import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { ActiveCardRequestStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyles = (
  style?: ActiveCardRequestStyles
): ActiveCardRequestStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ActiveCardRequestStyles = StyleSheet.create({
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
      color: '#FFFFFF',
      fontSize: 24,
      fontFamily: fonts.medium,
      lineHeight: 36,
      textAlign: 'center'
    },
    containerFailed: {
      padding: 20,
      flex: 1,
    },
    containerCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    content: {
      alignItems: 'center',
    },
    title: {
      color: '#FFFFFF',
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
      color: '#FFFFFF',
      fontFamily: fonts.medium,
      textAlign: 'center',
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
