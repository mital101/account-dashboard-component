import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { TransactionDetailsComponentStyles } from '.';

const useMergeStyles = (
  style?: TransactionDetailsComponentStyles
): TransactionDetailsComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: TransactionDetailsComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    headerTitleStyle: {
      lineHeight: 36,
      color: colors.primaryColor,
      fontFamily: fonts.bold,
      fontSize: 24,
      paddingHorizontal: 24,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftButtonStyle: {
      paddingVertical: 20,
      paddingHorizontal: 24,
    },
    rightButtonStyle: {
      paddingVertical: 15,
      paddingHorizontal: 24,
    },
    rightButtonTitleStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      textDecorationLine: 'underline',
      color: '#FF9800',
    },
    mainContainerStyle: {
      backgroundColor: '#ffffff',
      marginHorizontal: 24,
      marginTop: 20,
      marginBottom: 16,
      paddingHorizontal: 20,
      borderRadius: 8,
      elevation: 3,
      shadowColor: '#000000',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowRadius: 1,
      paddingVertical: 30,
    },
    labelTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#7F7B82',
    },
    valueTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 24,
      color: colors.primaryTextColor,
    },
    rowItemContainerStyle: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    blockSpaceContainerStyle: {
      height: 12,
    },
    totalAmountTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 24,
      color: colors.primaryColor,
    },
    shareButtonContainerStyle: {
      height: 45,
      borderWidth: 1,
      borderColor: colors.primaryButtonColor,
      marginHorizontal: 24,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 24,
    },
    shareButtonLabelStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: colors.primaryButtonColor,
    },
    screenshotContainerStyle: {
      flex: 1,
      backgroundColor: colors.appBarBackgroundColor,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
