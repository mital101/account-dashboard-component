import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { TransactionItemComponentStyles } from '.';

const useMergeStyles = (style?: TransactionItemComponentStyles): TransactionItemComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: TransactionItemComponentStyles = StyleSheet.create({
    containerStyle: {
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    headerContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
    },
    amountTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 24,
      color: colors.primaryTextColor,
    },
    descriptionTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 24,
      color: colors.primaryTextColor,
    },
    dateTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 10,
      lineHeight: 18,
      color: '#7F7B82',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
