import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { PhysicalCardTransactionStatusComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: PhysicalCardTransactionStatusComponentStyles
): PhysicalCardTransactionStatusComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      paddingTop: 24,
      flex: 1,
    },
    content: {
      flex: 1
    },
    actionWrapper: {},
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    headerWrapper: {
      width: '70%'
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
    titleSuccess: {
      fontSize: 24,
      fontFamily: fonts.medium,
      color: '#40916C',
    },
    subTitle: {
      marginTop: 20,
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#353333'
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
    row: {flexDirection: 'row'},
    pcCardPreviewImgWrapper: {
      height: 200,
      marginTop: 20
    },
    image: {
      width: '100%',
      height: '100%'
    },
    footer: {

    },
    transactionInfo: {
      marginTop: 20
    },
    cbContainer: {
      marginBottom: 30
    },
    verticalSpacing: {
      marginVertical: 10
    },
    smallVerticalSpacing: {
      marginVertical: 5
    },
    cardContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 20,
      marginTop: 25
    },
    leftSection: {
      width: '90%'
    },
    rowBetween: {
      flexDirection:'row',
      justifyContent:'space-between'
    },
    cardTitle: {
      color: '#676666',
      fontSize: 12,
      fontFamily: fonts.regular
    },
    cardSubTitle: {
      color: '#020000',
      fontSize: 14,
      fontFamily: fonts.regular
    },
    noteContainer: {
      backgroundColor: '#DDD9E4',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      marginTop: 20
    },
    noteCardTitle: {
      fontFamily: fonts.medium,
      color: '#020000',
      fontSize: 10
    },
    noteCardContent: {
      fontFamily: fonts.regular,
      color: '#3E2D68',
      fontSize: 10
    },
    noteTitle: {
      fontFamily: fonts.medium,
      color: '#353333',
      fontSize: 12
    },
    containerViewShot: {
      backgroundColor: '#F1F6FC'
    },
    noteContent: {
      fontFamily: fonts.regular,
      color: '#353333',
      fontSize: 12
    },
    orderTitleSection: {
      marginTop: 20,
    },
    orderTitle: {
      fontSize: 18,
      fontFamily: fonts.medium,
      color: '#020000',
      marginBottom: 10
    },
    cardMoney: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#020000'
    },
    logoSection: {
      alignItems: 'center'
    },
    containerFailed: {
      padding: 20,
      flex: 1,
      backgroundColor: '#3E2D68',
    },
    btnTransparent: {
      borderColor: colors.primaryButtonColor,
      borderWidth: 1,
      marginTop: 10,
    },
    labelBtnTransaprent: { color: colors.primaryButtonColor },
    errorContentWrapper: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 50,
    },
    errorTitleWrapper: {
      alignItems: 'center',
    },
    errorMessageWrapper: {
      marginTop: 24,
    },
    errorMessageLabel: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: fonts.medium,
      textAlign: 'center',
    },
    columnBetween: {
      flex: 1,
      justifyContent: 'space-around',
    },
    iconErrorWrapper: {
      marginBottom: 30,
    },
    statusLabel: {
      color: '#E06D6D',
      fontSize: 24,
      fontFamily: fonts.medium,
      lineHeight: 36,
    },
    rowErrorBetween: {
      marginTop: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    infoTitle: {
      color: '#7F7B82',
      fontSize: 12,
      fontFamily: fonts.regular,
    },
    infoSubTitle: {
      color: '#1D1C1D',
      fontSize: 12,
      fontFamily: fonts.regular,
    },
    errorInfoTitleColor: {
      color: '#FFFFFF',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
