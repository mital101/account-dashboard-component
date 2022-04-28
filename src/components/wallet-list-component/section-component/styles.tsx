import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { AccountSectionStyle } from '../../../types';

const useMergeStyles = (style?: AccountSectionStyle) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    sectionTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#094884',
      lineHeight: 21,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
