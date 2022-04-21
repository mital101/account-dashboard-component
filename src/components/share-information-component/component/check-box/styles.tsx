import { CheckBoxStyle } from '.';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';
import { defaultsDeep } from 'lodash';

const useMergeStyle = (style?: CheckBoxStyle): CheckBoxStyle => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: CheckBoxStyle = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      paddingVertical: 7,
      alignItems: 'center',
    },
    boxContainerStyle: {
      padding: 2,
      borderRadius: 4,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      marginRight: 12,
    },
    labelTextStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#0D2050',
    },
    subLabelTextStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#646876',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
