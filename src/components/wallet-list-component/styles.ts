import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { WalletComponentStyle } from '../../types';

const useMergeStyles = (style?: WalletComponentStyle) => {
  const defaultStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
    },
    listDivider: {
      height: 10,
      width: '100%',
    },
    loadingWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyPlaceholder: {
      flex: 1,
      justifyContent: 'center',
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
