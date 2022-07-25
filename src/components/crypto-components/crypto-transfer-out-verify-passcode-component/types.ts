import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoTransferOutVerifyPasscodeComponentProps = {
  style?: CryptoTransferOutVerifyPasscodeComponentStyles;
  props?: {
    onSwitchToVerifyOTP?: () => void;
    onConfirmed?: () => void;
  };
};

export type CryptoTransferOutVerifyPasscodeComponentStyles = {
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
  receiveOTPOptionLabel?: StyleProp<TextStyle>;
  receiveOTPOptionBtn?: StyleProp<ViewStyle>;
};
