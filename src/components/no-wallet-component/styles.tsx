import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { EmptyWalletThemeStyles } from '.';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: EmptyWalletThemeStyles) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: '#094884',
      lineHeight: 23,
      marginTop: 15,
    },
    buttonTextStyle: {
      fontSize: 15,
      fontFamily: fonts.medium,
      lineHeight: 23,
      color: '#094884',
      marginHorizontal: 8,
    },
    buttonContainerStyle: {
      paddingVertical: 17,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
