import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { BalanceStyle } from '../../../types';

const useMergeStyles = (style?: BalanceStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: BalanceStyle = StyleSheet.create({
    wrapperStyle: {
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    containerStyle: {
      borderWidth: 1,
      borderColor: '#F5F5F5',
      paddingHorizontal: 12,
      paddingVertical: 17,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    titleTextStyle: {
      fontFamily: fonts.semiBold,
      fontSize: 12,
      color: '#094884',
    },
    amountTextStyle: {
      fontFamily: fonts.semiBold,
      fontSize: 28,
      color: colors.primaryColor,
    },
    viewCashflowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewCashflowTextStyle: {
      fontSize: 12,
      color: colors.primaryColor,
      fontFamily: fonts.regular,
      paddingHorizontal: 3,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
