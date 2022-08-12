import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoTransferOutVerifyOTPComponentProps = {
  style?: CryptoTransferOutVerifyOTPComponentStyles;
  props?: {
    onConfirmed: (amount: number, type: string, status: string, date: string, refNumber: string) => void;
  };
};

export type CryptoTransferOutVerifyOTPComponentStyles = {
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
  sendAnotherLabel?: StyleProp<TextStyle>;
  durationLabel?: StyleProp<TextStyle>;
  notReceivedCodeLabel?: StyleProp<TextStyle>;
  countdownWrapper?: StyleProp<ViewStyle>;
  errorWrapper?: StyleProp<ViewStyle>;
  errorText?: StyleProp<TextStyle>;
};
