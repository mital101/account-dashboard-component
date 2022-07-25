import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { CryptoTransferOutReviewSummaryComponentStyles } from './types';
import { ThemeContext } from 'react-native-theme-component';

const useMergeStyles = (
  style?: CryptoTransferOutReviewSummaryComponentStyles
): CryptoTransferOutReviewSummaryComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      paddingHorizontal: 25,
      backgroundColor: '#F1F6FC'
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: '#3E2D68',
    },
    actionWrapper: {
      marginTop: 40,
      marginBottom: 20,
      paddingHorizontal: 25,
    },
    pageSubTitleView: {
      marginTop: 20
    },
    pageSubTitle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#4E4B50'
    },
    content: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginTop: 20,
      borderRadius: 8,
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginTop: 15
    },
    noteView: {
      padding: 20,
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: '#DDD9E4'
    },
    noteLabel: {
      color: '#1D1C1D',
      fontFamily: fonts.regular,
      fontSize: 10
    },
    btnBackToDashboard: {borderColor: colors.primaryButtonColor, borderWidth: 1, marginTop: 10},
    labelBackToDashboard: {color: colors.primaryButtonColor}
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
