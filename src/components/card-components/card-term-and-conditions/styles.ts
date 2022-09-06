import { defaultsDeep } from 'lodash';
import { StyleSheet, Dimensions } from 'react-native';
import { CardTermAndConditionsStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';

const useMergeStyles = (
  style?: CardTermAndConditionsStyles
): CardTermAndConditionsStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: CardTermAndConditionsStyles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      marginTop: 20,
      flex: 1
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    tabbarBtn: {
      flex: 1,
      padding: 15,
      alignItems: 'center',
      borderRadius: 5
    },
    tabbarBtnTitle: {
      color: '#F8981D',
      fontSize: 14,
      fontFamily: fonts.semiBold,
    },
    content: {
      flex: 1,
      paddingTop: 20
    },
    contentTitle: {
      fontFamily: fonts.medium,
      fontSize: 14,
    },
    contentSubTitle: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: '#3E2D68'
    },
    spacingnVertical: {
      marginVertical: 15
    },
    iconInfoWrapper: {
      marginRight: 5
    },
    contentScrollView: {
      backgroundColor: '#F8F8F8',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    paddingBottom: {
      height: 40
    },
    loadingView: {alignItems: 'center', justifyContent: 'space-around', marginTop: 50}
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
