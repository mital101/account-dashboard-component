import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoReceiveSummaryComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoReceiveSummaryComponentStyles
): CryptoReceiveSummaryComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    safeArea: {
      flex: 1
    },
    container: {
      paddingHorizontal: 25,
      flex: 1,
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    actionWrapper: {
      paddingHorizontal: 20
    },
    pageSubTitleView: {
      marginTop: 20
    },
    pageSubTitle: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: '#4E4B50'
    },
    content: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginTop: 20,
      borderRadius: 8
    }
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
