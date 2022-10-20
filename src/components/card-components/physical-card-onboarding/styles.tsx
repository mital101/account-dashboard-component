import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { PhysicalCardConfirmComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: PhysicalCardConfirmComponentStyles
): PhysicalCardConfirmComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      paddingTop: 24,
      flex: 1,
    },
    content: {
      flex: 1, 
      marginTop: 20,
      alignItems: 'center'
    },
    actionWrapper: {},
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#FFFFFF',
      textAlign: 'center'
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
    title: {
      marginVertical: 20,
      fontSize: 16,
      fontFamily: fonts.medium,
      color: '#FFFFFF',
      textAlign: 'center'
    },
    subTitle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#FFFFFF',
      textAlign: 'center',
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
    cbContainer: {
      marginBottom: 30
    }
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
