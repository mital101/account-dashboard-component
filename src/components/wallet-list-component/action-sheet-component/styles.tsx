import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ActionSheetStyle } from '../../../types';

const useMergeStyles = (style?: ActionSheetStyle) => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    modalStyle: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    containerStyles: {
      paddingHorizontal: Platform.OS === 'ios' ? 32 : 20,
      paddingTop: Platform.OS === 'ios' ? 20 : 15,
      paddingBottom: 10,
      justifyContent: 'center',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      backgroundColor: 'white',
    },
    buttonContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
    },
    buttonTextStyle: {
      fontFamily: fonts.regular,
      fontSize: 16,
      color: 'black',
    },
    cancelContainerStyle: {
      paddingVertical: 10,
      alignItems: 'center',
    },
    cancelTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: 'red',
    },
    leftIconContainer: {
      marginRight: 8,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
