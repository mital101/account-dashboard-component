import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { SelectTransactionTypeModalStyles } from './index';

const useMergeStyles = (
  style?: SelectTransactionTypeModalStyles
): SelectTransactionTypeModalStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: SelectTransactionTypeModalStyles = StyleSheet.create({
    container: {
      padding: 25,
    },
    title: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: colors.primaryTextColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    closeTitle: {
      color: colors.primaryButtonColor,
      fontFamily: fonts.medium,
      fontSize: 14,
      textDecorationLine: 'underline',
    },
    content: {
      marginTop: 20,
    },
    rowSelect: {
      alignItems: 'center',
      flexDirection: 'row-reverse',
      marginVertical: 8,
    },
    titleRowSelect: {
      marginLeft: 0,
    },
    selectedBox: {
      backgroundColor: '#14BDEB',
      borderColor: 'transaprent',
    },
    unSelectedBox: { borderColor: 'transparent', backgroundColor: '#F4F4F4' },
    actionsView: { marginTop: 20 },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
