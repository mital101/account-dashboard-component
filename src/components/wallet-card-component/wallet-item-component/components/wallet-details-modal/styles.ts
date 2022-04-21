import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { WalletDetailsModalStyles } from '.';

const useMergeStyles = (style?: WalletDetailsModalStyles): WalletDetailsModalStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: WalletDetailsModalStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 25,
      paddingVertical: 18,
    },
    modalTitleStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 27,
      color: colors.primaryTextColor,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      marginTop: 21,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 22,
    },
    closeTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      lineHeight: 16,
      color: '#FF9800',
      textDecorationLine: 'underline',
    },
    itemContainerStyle: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    itemTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#7F7B82',
      flex: 1,
    },
    itemValueStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: colors.primaryTextColor,
      marginRight: 21,
    },
    copyContainerStyle: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 0,
      justifyContent: 'center',
    },
    copiedContainerStyle: {
      position: 'absolute',
      backgroundColor: '#000000',
      bottom: 25,
      left: 25,
      right: 25,
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 13,
    },
    copiedTextStyle: {
      color: '#ffffff',
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
