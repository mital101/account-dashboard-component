import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { EmptyTransactionComponentStyles } from '.';

const useMergeStyles = (
  style?: EmptyTransactionComponentStyles
): EmptyTransactionComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: EmptyTransactionComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    titleTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 24,
      color: colors.primaryTextColor,
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 33,
    },
    messageTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#000000',
      textAlign: 'center',
    },
    addMoneyTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      lineHeight: 21,
      color: '#FF9800',
      paddingVertical: 20,
      marginTop: 22,
      textDecorationLine: 'underline',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
