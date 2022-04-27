import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ViewCashflowComponentStyle } from '../../../types';

const useMergeStyles = (style?: ViewCashflowComponentStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ViewCashflowComponentStyle = StyleSheet.create({
    containerStyle: {
      marginHorizontal: 15,
      marginBottom: 15,
    },
    labelTextStyle: {
      paddingVertical: 10,
      fontSize: 12,
      fontFamily: fonts.medium,
      color: '#0D2050',
    },
    messageContainerStyle: {
      backgroundColor: 'white',
      paddingVertical: 15,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    messageTextStyle: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: fonts.regular,
      color: '#0D2050',
    },
    viewButtonContainerStyle: {
      height: 35,
      minWidth: 103,
      borderRadius: 18,
      marginRight: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryButtonColor,
    },
    viewTitleTextStyle: {
      fontSize: 14,
      color: '#fff',
      marginHorizontal: 7,
      fontFamily: fonts.regular,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
