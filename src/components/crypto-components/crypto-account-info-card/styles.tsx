import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { AccountInfoCardThemeStyles } from './index';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (style?: AccountInfoCardThemeStyles) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    containerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3E2D68',
      borderRadius: 10,
      paddingVertical: 17,
      paddingHorizontal: 22,
      width: '100%',
    },
    text: {
      fontSize: 12,
      color: '#FFFFFF',
    },
    rowSpaceBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '80%',
      marginTop: 20,
    },
    marginHorizontalView: {
      width: 5,
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    rowCurrency: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    currency: {
      fontWeight: '700',
      fontSize: 24,
      color: '#FFFFFF',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
