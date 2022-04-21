import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { WalletCardComponentStyles } from '.';

const useMergeStyles = (style?: WalletCardComponentStyles): WalletCardComponentStyles => {
  const defaultStyles: WalletCardComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    loadingContainerStyle: {
      height: 173,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
