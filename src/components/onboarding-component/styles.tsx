import { defaultsDeep } from 'lodash';
import { Dimensions, StyleSheet } from 'react-native';
import { OnboardingComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const { width } = Dimensions.get('window');
const horizontalPaddingTotal = 40;
const itemWidth = width - horizontalPaddingTotal;

const useMergeStyles = (
  style?: OnboardingComponentStyles
): OnboardingComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: OnboardingComponentStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryColor,
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    sliderWrapper: { width: itemWidth, alignItems: 'center', marginTop: 25,flex: 1, },
    imageWrapper: {
      marginTop: 25,
      alignItems: 'center',
    },
    image: { width: '100%', height: '100%' },
    title: {
      color: colors.backgroundTextColor,
      fontSize: 24,
      lineHeight: 36,
      textAlign: 'center',
      fontFamily: fonts.semiBold,
    },
    subTitle: {
      marginTop: 23,
      color: colors.backgroundTextColor,
      fontSize: 18,
      lineHeight: 24,
      textAlign: 'center',
      fontFamily: fonts.medium,
    },
    description: {
      marginTop: 10,
      color: colors.backgroundTextColor,
      fontSize: 14,
      lineHeight: 24,
      textAlign: 'center',
      fontFamily: fonts.regular,
    },
    secondaryTitle: {
      textDecorationLine: 'underline',
      fontFamily: fonts.medium,
      color: colors.primaryButtonColor,
    },
    secondaryBtn: {
      marginTop: 12,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      textDecorationLine: 'underline',
    }
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
