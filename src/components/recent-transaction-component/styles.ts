import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { RecentTransactionComponentStyles } from '.';

const useMergeStyles = (
  style?: RecentTransactionComponentStyles
): RecentTransactionComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: RecentTransactionComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      paddingHorizontal: 25,
    },
    headerTitleStyle: {
      fontFamily: fonts.bold,
      fontSize: 24,
      lineHeight: 36,
      color: colors.primaryColor,
    },
    sectionTitleStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      lineHeight: 21,
      color: '#7F7B82',
      marginBottom: 8,
      paddingTop: 20,
    },
    itemSeperatorStyle: {
      marginHorizontal: 20,
    },
    contentContainerStyle: {
      backgroundColor: '#ffffff',
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
    },
    loadmoreButtonContainerStyle: {
      height: 45,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.primaryButtonColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 23,
    },
    loadmoreButtonLabelStyle: {
      fontFamily: fonts.bold,
      color: colors.primaryButtonColor,
      fontSize: 14,
    },
    loadMoreIndicatorStyle: {
      marginVertical: 23,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
