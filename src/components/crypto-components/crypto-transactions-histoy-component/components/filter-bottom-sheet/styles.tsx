import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { FilterTransactionModalStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: FilterTransactionModalStyles
): FilterTransactionModalStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
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
    statusSection: {
      marginVertical: 15,
    },
    rowStatusBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    statusBtn: {
      paddingVertical: 15,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    statusLabel: {
      color: colors.primaryButtonColor,
      fontSize: 14,
      fontFamily: fonts.medium,
    },
    statusBtnSelected: {
      backgroundColor: '#FFF0D9',
    },
    rowSelect: {
      alignItems: 'center',
      flexDirection: 'row-reverse',
    },
    titleRowSelect: {
      marginLeft: 0,
    },
    selectedBox: {
      backgroundColor: '#14BDEB',
      borderColor: 'transaprent',
    },
    unSelectedBox: { borderColor: 'transparent', backgroundColor: '#F4F4F4' },
    actionsView: { marginTop: 35 },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    allTimeTitle: {
      color: '#000000',
      marginRight: 10,
      fontFamily: fonts.medium,
    },
    datePickerSection: {
      marginTop: 15,
    },
    selectDateBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 20,
      backgroundColor: '#EAEAEB',
      borderRadius: 4,
    },
    horizontalMargin: {
      width: 13,
    },
    selectDateTitle: {
      color: '#BAB7BB',
      fontSize: 14,
      fontFamily: fonts.regular,
    },
    row: {
      flexDirection: 'row',
    },
    resetBtn: {
      marginTop: 12,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      textDecorationLine: 'underline',
    },
    resetTitle: {
      textDecorationLine: 'underline',
      fontFamily: fonts.medium,
      color: '#BAB7BB',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
