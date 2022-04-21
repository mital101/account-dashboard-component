import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { WalletItemComponentStyle } from '.';

const useMergeStyles = (style?: WalletItemComponentStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: WalletItemComponentStyle = StyleSheet.create({
    containerStyle: {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      justifyContent: 'center',
      height: 173,
      elevation: 2,
      shadowColor: 'grey',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      margin: 1,
    },
    cardBackgroundStyle: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    contentContainerStyle: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 20,
      justifyContent: 'space-between',
    },
    amountTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 24,
      lineHeight: 36,
      color: colors.primaryTextColor,
    },
    walletNameStyle: {
      fontFamily: fonts.bold,
      fontSize: 12,
      color: '#7F7B82',
      flex: 1,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    accountNumberStyle: {
      fontFamily: fonts.bold,
      fontSize: 14,
      color: '#FF9800',
      marginRight: 3,
      textDecorationLine: 'underline',
    },
    bottomContainerStyle: {
      flexDirection: 'row',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
