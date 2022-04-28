import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { LinkAccountStyle } from '../../../types';

const useMergeStyles = (style?: LinkAccountStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      paddingHorizontal: 16,
      paddingVertical: 17,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonTextStyle: {
      fontSize: 15,
      fontFamily: fonts.medium,
      lineHeight: 23,
      color: colors.primaryColor,
      marginHorizontal: 8,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
