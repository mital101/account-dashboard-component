import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { TransactionCardComponentStyles } from '.';

const useMergeStyles = (style?: TransactionCardComponentStyles): TransactionCardComponentStyles => {
  const { colors, fonts } = useContext(ThemeContext);

  const defaultStyles: TransactionCardComponentStyles = StyleSheet.create({
    containerStyle: {
      marginHorizontal: 25,
      backgroundColor: 'white',
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
      paddingBottom: 22,
    },
    labelTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 24,
      color: colors.primaryTextColor,
    },
    emptyTransactionTextStyle: {
      paddingTop: 30,
      paddingBottom: 40,
      textAlign: 'center',
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#7F7B82',
    },
    headerContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
      marginTop: 16,
      paddingHorizontal: 20,
    },
    viewAllTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      lineHeight: 16,
      textDecorationLine: 'underline',
      color: '#FF9800',
    },
    loadingContainerStyle: {
      paddingTop: 30,
      paddingBottom: 40,
    },
    itemSeperatorStyle: {
      marginHorizontal: 20,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
