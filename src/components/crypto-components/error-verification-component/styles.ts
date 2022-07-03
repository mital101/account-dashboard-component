import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { OngoingVerificationComponentStyles } from '.';

const useMergeStyles = (
  style?: OngoingVerificationComponentStyles
): OngoingVerificationComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: OngoingVerificationComponentStyles = StyleSheet.create({
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
      fontWeight:'700',
      fontSize: 24,
      lineHeight: 36,
      textAlign: 'center',
      color: '#E06D6D',
      marginTop: 40,
    },
    messageTextStyle: {
      fontWeight:'700',
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'center',
      color: '#DCF5FC',
      marginTop: 16,
    },
    errorTextStyle:{
      fontWeight:'700',
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'center',
      color: '#E06D6D',
      marginTop: 16,
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
