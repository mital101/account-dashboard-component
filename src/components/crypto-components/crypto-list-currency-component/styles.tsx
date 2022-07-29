import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoListCurrencyComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoListCurrencyComponentStyles
): CryptoListCurrencyComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      backgroundColor: '#F1F6FC',
      paddingTop: 24,
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    content: {
      marginTop: 20,
      borderRadius: 8,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
