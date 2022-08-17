import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoTransactionHistoryCardStyles } from './index';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoTransactionHistoryCardStyles
): CryptoTransactionHistoryCardStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 22,
      paddingVertical: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    borderRadiusTop: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    borderRadiusBottom: {
      borderBottomLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    title: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#000000',
    },
    subTitle: {
      fontFamily: fonts.regular,
      fontSize: 10,
      color: '#7F7B82',
    },
    verticalMargin: {
      height: 10,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
