import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { HelpCenterComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyles = (
  style?: HelpCenterComponentStyles
): HelpCenterComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: HelpCenterComponentStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      backgroundColor: '#F1F6FC',
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
      marginTop: 20
    },
    title: {
      color: '#020000',
      fontFamily: fonts.semiBold,
      fontSize: 16,
      marginVertical: 25,
    },
    subTitle: {
      color: '#4E4B50',
      fontFamily: fonts.medium,
      fontSize: 14,
      marginVertical: 15,
    },
    scrollView: { marginBottom: 100 },
    contactContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 5,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
