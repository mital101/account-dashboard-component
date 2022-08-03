import { Currency } from '../../../model';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoSearchComponentProps = {
  style?: CryptoSearchComponentStyles;
  props?: {
    onCryptoSelect?: (currency: Currency) => void;
  };
};

export type CryptoSearchComponentStyles = {
  container?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  list?: StyleProp<ViewStyle>;
  itemContainer?: StyleProp<ViewStyle>;
  row?: StyleProp<ViewStyle>;
  column?: StyleProp<ViewStyle>;
  itemImage?: StyleProp<ImageStyle>;
};
