import { Transaction } from '../../../model';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoTransactionDetailsComponentProps = {
  style?: CryptoTransactionDetailsComponentStyles;
  props?: { 
    transaction: Transaction
   };
};

export type CryptoTransactionDetailsComponentStyles = {
  container?: ViewStyle;
  containerWrapper?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  rowBetween?: StyleProp<ViewStyle>;
  logoContainer?: StyleProp<ViewStyle>;
  shareContainer?: StyleProp<ViewStyle>;
  infoTitle?: StyleProp<TextStyle>;
  infoSubTitle?: StyleProp<TextStyle>;
  marginVertical?: StyleProp<ViewStyle>;
};
