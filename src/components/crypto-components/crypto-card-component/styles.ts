import { defaultsDeep } from 'lodash';
import { StyleSheet, Dimensions } from 'react-native';
import { CryptoCardComponentStyles } from './index';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyles = (
  style?: CryptoCardComponentStyles
): CryptoCardComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: CryptoCardComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    marginHorizontalView: {
      width: 5,
    },
    containerWrapper: {
      maxHeight: Dimensions.get('window').height - 180,
      paddingHorizontal: 15,
    },
    loadingContainerStyle: {
      height: 173,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyCarouselContainerStyle: {
      marginTop: 25,
    },
    emptyWalletItemComponentStyle: {
      accountNumberStyle2: {
        fontSize: 12,
        color: '#7F7B82',
        flex: 1,
      },
      accountNumberStyle: {
        // fontFamily: fonts.bold,
        fontSize: 14,
        color: '#7F7B82',
        marginRight: 3,
        textDecorationLine: 'none',
      },
    },
    containerStyleMessage: {
      marginHorizontal: 25,
      backgroundColor: '#E7DBF5',
      marginVertical: 16,
      borderRadius: 8,
      elevation: 2,
      shadowColor: 'grey',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      margin: 1,
      // paddingBottom: 22,
      padding: 15,
    },
    labelTextStyle: {
      fontSize: 10,
      lineHeight: 10,
      color: '#5E0CBC',
      fontWeight: '400',
      width: 280,
    },
    label2TextStyle: {
      fontSize: 10,
      lineHeight: 10,
      color: '#5E0CBC',
      fontWeight: '400',
      marginTop: 20,
      width: 280,
    },
    labelTitlStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 36,
      color: colors.primaryTextColor,
      paddingLeft: 20,
    },
    pointerView: {
      position: 'absolute',
      left: 0,
      bottom: 50,
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
    column: { alignItems: 'center' },
    titleTooltip: {
      fontWeight: '700',
      fontSize: 14,
    },
    viewTooltip: { flexDirection: 'column' },
    viewTooltipHeader: { flexDirection: 'row' },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
