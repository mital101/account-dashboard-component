import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Wallet } from '../../../model';

export type CryptoReviewSummaryComponentProps = {
  style?: CryptoReviewSummaryComponentStyles;
  props: { 
    onGoBack?: () => void;
    onSuccess?: () => void;
  };
};

export type CryptoReviewSummaryComponentStyles = {
  safeArea?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  actionWrapper?: StyleProp<ViewStyle>;
  pageSubTitle?: StyleProp<TextStyle>;
  pageSubTitleView?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  rowCenter?: StyleProp<ViewStyle>;
  infoView?: StyleProp<ViewStyle>;
  btnBackToDashboard?: StyleProp<ViewStyle>;
  noteView?: StyleProp<ViewStyle>;
  noteLabel?: StyleProp<TextStyle>;
  labelBackToDashboard?: StyleProp<TextStyle>;
};


export type CryptoItem = {
  id: string;
  imageUrl: string;
  shortName: string,
  currentValue: string,
  fullName: string,
  rate: string
}