import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { SettingComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyles = (
  style?: SettingComponentStyles
): SettingComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles: SettingComponentStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      backgroundColor: '#F1F6FC',
    },
    scrollView: {},
    title: {
      fontSize: 24,
      fontFamily: fonts.medium,
      color: '#3E2D68',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
