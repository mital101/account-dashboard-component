import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { MarketPriceComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyles = (style?: MarketPriceComponentStyles): MarketPriceComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: MarketPriceComponentStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      backgroundColor: colors.mainBackgroundColor,
    },
    imageWrapper: {
      height: 300,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 7,
    },
    viewAllSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontFamily: fonts.semiBold,
      color: 'black',
      fontSize: 16,
    },
    viewAllLabel: {
      color: colors.primaryButtonColor,
      marginRight: 7,
      textDecorationLine: 'underline',
      fontFamily: fonts.semiBold,
      fontSize: 14,
    },
    viewAllBtn: {
      flexDirection: 'row',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
