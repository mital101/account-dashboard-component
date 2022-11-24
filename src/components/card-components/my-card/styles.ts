import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { MyCardComponentStyles } from '@banking-component/account-dashboard-component/src/components/card-components/my-card/types';
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
    noteWrapper: {
      backgroundColor: '#DDD9E4',
      padding: 15,
      borderRadius: 8,
      marginBottom: 30,
      alignItems: 'center'
    },
    note: {
      fontSize: 10,
      color: '#020000',
      fontFamily: fonts.semiBold
    },
    noteDescription: {
      fontSize: 10,
      color: '#3E2D68'
    },
    cardProgressContainer: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      marginVertical: 20
    },
    cardProgressTitle: {
      color: '#020000',
      fontSize: 16,
      fontFamily: fonts.medium
    },
    cardProgressSubTitle: {
      color: '#676666',
      fontSize: 12,
      fontFamily: fonts.regular,
      marginTop: 20,
      marginBottom: 15
    },
    imageUD: {
      width: 75,
      height: 82
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    imagePC: {
      height: 140,
      width: '100%',
      borderRadius: 8,
      marginBottom: 20
    },
    pcCardContentView: {
      position: 'absolute',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
    },
    pcCardContentImageView: {
      flex: 1.5,
    },
    pcCardContentWrapper: {
      flex: 2,
      paddingVertical: 15
    },
    pcCardTitle: {
      color: '#F1F6FC',
      fontSize: 16,
      fontFamily: fonts.medium,
      marginBottom: 10
    },
    pcCardSubTitle: {
      color: '#F1F6FC',
      fontSize: 10,
      fontFamily: fonts.regular,
      marginBottom: 15
    },
    getACardBtn: {
      backgroundColor: 'red', width: 120, borderRadius: 20
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
