import { Currency } from '../../../model';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoListCurrencyComponentProps = {
  style?: CryptoListCurrencyComponentStyles;
  props?: {
    onCryptoSelect?: (currency: Currency) => void;
  };
};

export type CryptoListCurrencyComponentStyles = {
  container?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  content?: StyleProp<ViewStyle>;
};

export type CryptoItem = {
  id: string;
  imageUrl: string;
  shortName: string;
  currentValue: string;
  fullName: string;
  rate: string;
};
