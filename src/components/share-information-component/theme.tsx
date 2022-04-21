import { StyleSheet } from 'react-native';
import { ShareInformationComponentStyle } from '.';
import { ThemeContext } from 'react-native-theme-component';
import { useContext } from 'react';
import { defaultsDeep } from 'lodash';

const useMergeStyle = (style?: ShareInformationComponentStyle): ShareInformationComponentStyle => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: ShareInformationComponentStyle = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    mainContainerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    sectionTextStyle: {
      fontSize: 14,
      fontFamily: fonts.medium,
      paddingBottom: 10,
      paddingTop: 15,
      color: '#0D2050',
    },
    applyContainerStyle: {
      width: '100%',
      backgroundColor: 'white',
      shadowColor: '#000028',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 5,
      elevation: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: 'row',
    },
    accountWrapperStyle: {
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    accountContainerStyle: {
      flexDirection: 'row',
      height: 40,
      borderWidth: 1,
      borderColor: '#e2e2e2',
      borderRadius: 5,
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    accountNameTextStyle: {
      color: 'black',
      fontSize: 14,
      fontFamily: fonts.regular,
    },
    accountNameContainerStyle: { flexDirection: 'row', alignItems: 'center' },
    accountNumberTextStyle: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: '#646876',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
