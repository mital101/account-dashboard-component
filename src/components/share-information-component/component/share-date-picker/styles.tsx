import { StyleSheet } from 'react-native';
import { ShareDatePickerStyle } from '.';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';
import { defaultsDeep } from 'lodash';

const useMergeStyle = (style?: ShareDatePickerStyle): ShareDatePickerStyle => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: ShareDatePickerStyle = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    labelTextStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#000000',
    },
    contentContainerStyle: {
      height: 40,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#F0F3F8',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      justifyContent: 'space-between',
      marginTop: 10,
    },
    dateTextStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#0D2050',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
