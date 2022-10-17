import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CardUpdateTransactionLimitsComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CardUpdateTransactionLimitsComponentStyles
): CardUpdateTransactionLimitsComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      paddingTop: 24,
      flex: 1,
    },
    content: {
      flex: 1, 
    },
    actionWrapper: {},
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    pageSubtite: {
      marginTop: 15,
      color: '#353333',
      fontSize: 14,
      fontFamily: fonts.medium
    },
    titleSection: {
      marginVertical: 35
    },
    title: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: '#020000'
    },
    subTitle: {
      fontSize: 10,
      fontFamily: fonts.regular,
      color: '#676666'
    },
    dragSection: {
      marginTop: 35
    },
    amountRow: {
      width: '100%',
      height: 4,
      backgroundColor: '#676666',
      borderRadius: 2
    },
    processRow: {
      height: 4,
      backgroundColor: '#3E2D68',
      position: 'absolute',
      borderRadius: 2
    },
    lineAmount: {
      position: 'absolute', width: 1, height: 6,  backgroundColor: '#676666'
    },
    bigLineAmount: {
      position: 'absolute', width: 1, height: 12,  backgroundColor: '#676666'
    },
    bigLineColumnAmount: {
      width: 1, height: 12,  backgroundColor: '#676666', marginBottom: 5
    },
    circleAmount: {
      position: 'absolute', width: 20, height: 20, borderRadius: 20, backgroundColor: 'white', borderColor: 'black', borderWidth: 1 
    },
    viewAmountNumber: {
      position: 'absolute', bottom: 15, backgroundColor: '#353333', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2 
    },
    amountLineSection: {
      marginTop: 15
    },
    amountNumber: {
      color: '#676666',
      fontSize: 12,
      fontFamily: fonts.regular
    },
    row: {flexDirection: 'row', alignItems: 'center'},

  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
