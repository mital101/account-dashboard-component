import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoTransactionPostingComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoTransactionPostingComponentStyles
): CryptoTransactionPostingComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: 'red'
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
