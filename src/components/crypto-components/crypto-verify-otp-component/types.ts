import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoVerifyOTPComponentProps = {
  style?: CryptoVerifyOTPComponentStyles;
  props?: { 
    onConfirmed: () => void;
  };
};

export type CryptoVerifyOTPComponentStyles = {
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
};
