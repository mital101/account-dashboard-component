import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { MyCardComponentStyles } from '@banking-component/wallet-component/src/components/card-components/my-card/types';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyles = (
  style?: MyCardComponentStyles
): MyCardComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: MyCardComponentStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 25,
      paddingVertical: 12,
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    vcCardContainer: {
      backgroundColor: '#181818',
      padding: 20,
      borderRadius: 8,
      marginVertical: 23,
      width: '100%',
    },
    row: {
      flexDirection: 'row'
    },
    ttCardContainer: {
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 17,
    },
    ttContent: {
      marginTop: 5
    },
    rowSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    cardText: {
      color: '#FFFFFF',
      fontSize: 10
    },
    title: {
      fontSize: 14,
      fontFamily: fonts.semiBold
    },
    titleSection: { 
      fontSize: 16,
      fontFamily: fonts.medium
    },
    normal: {
      fontSize: 12,
      fontFamily: fonts.medium
    },
    rowSubTitle: {
      marginTop: 12,
      marginBottom: 20
    },
    rowCardNumber: {
      marginVertical: 15
    },
    cvvSection: {
      marginLeft: 45
    },
    subTitle: {
      fontSize: 12,
      fontFamily: fonts.medium
    },
    dashboardCarousel: {
      marginTop: 20
    },
    sliderContainerStyle: {
      flex: 1,
      alignItems: 'center',
    },
    learnSection: {
      marginTop: 30
    },
    optionsSection: {
      flex: 1,
      width: '100%'
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    marginLeft: {
      marginLeft: 5
    },
    pointerView: {
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
      height: 100,
    },
    pointerText: {
      color: 'white',
      marginTop: 8,
      fontWeight: '700',
      fontSize: 14,
    },
    column: { alignItems: 'center' },
    skipView: {
      position: 'absolute',
      bottom: 35,
      alignItems: 'center',
    },
    skipBtn: {
      padding: 15,
    },
    skipText: {
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 14,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
