import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { MessageComponentStyles } from './index';

const useMergeStyles = (
  style?: MessageComponentStyles
): MessageComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: MessageComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: '#3E2D68',
    },
    mainContainerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    footerContainerStyle: {
      padding: 24,
    },
    titleTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 24,
      lineHeight: 36,
      textAlign: 'center',
      color: '#DCF5FC',
      marginTop: 40,
    },
    messageTextStyle: {
      fontWeight:'700',
      fontSize: 24,
      lineHeight: 24,
      textAlign: 'center',
      color: '#DCF5FC',
      marginTop: 16,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
