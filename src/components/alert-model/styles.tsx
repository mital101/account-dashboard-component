import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { AlertModalStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: AlertModalStyles
): AlertModalStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      width: '100%', 
      backgroundColor: 'white', 
      borderRadius: 5, 
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 35
    },
    title: {
      textAlign: 'center',
      marginVertical: 12,
      color: '#3E2D68',
      fontFamily: fonts.medium,
      fontSize: 16
    },
    subtitle: {
      textAlign: 'center',
      color: '#1D1C1D',
      fontSize: 14,
      fontFamily: fonts.regular,
      maxWidth: '85%',
      marginBottom: 15
    },
    buttonAction: {
      width: '82%',
      marginTop: 15,
      marginBottom: 5
    },
    iconWrapper: {
      paddingVertical: 15,
      alignItems: 'center'
    },
    secondaryBtnAction: {
      paddingVertical: 10,
      marginTop: 10
    },
    secondaryBtnLabel: {
      color: colors.primaryButtonColor,
      textDecorationLine: 'underline',
      fontFamily: fonts.medium,
      fontSize: 14
    }
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
