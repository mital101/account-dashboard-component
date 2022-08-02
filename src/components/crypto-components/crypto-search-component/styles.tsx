import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoSearchComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoSearchComponentStyles
): CryptoSearchComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      backgroundColor: '#F1F6FC',
      paddingTop: 15,
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    content: {
      marginTop: 20,
      borderRadius: 8,
      height: '100%',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 22,
    },
    list: { paddingBottom: 280, paddingTop: 20 },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
    },
    column: {
      justifyContent: 'space-between',
      marginLeft: 7,
      height: 42,
    },
    itemImage: { width: 50, height: '100%' },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
