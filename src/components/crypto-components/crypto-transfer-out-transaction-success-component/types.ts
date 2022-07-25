import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";

export type CryptoTransferOutTransactionSuccessComponentProps = {
  style?: CryptoTransferOutTransactionSuccessComponentStyles;
  props?: {
    onBackToDashboard?: () => void;
    onBackToTransferIn?: () => void;
    onGoToHelpCenter?: () => void;
  };
};

export type CryptoTransferOutTransactionSuccessComponentStyles = {
  safeArea?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  containerCenter?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  subTitleWrapper?: StyleProp<ViewStyle>;
  circleProgressWrapper?: StyleProp<ViewStyle>;
  btnTransparent?: StyleProp<ViewStyle>;
  labelBtnTransaprent?: StyleProp<TextStyle>;
  completedTextColor?: StyleProp<TextStyle>;
  titleSuccess?: StyleProp<TextStyle>;
  subTitle?: StyleProp<TextStyle>;
  subTitleSuccess?: StyleProp<TextStyle>;
  contentSuccess?: StyleProp<ViewStyle>;
  subTitleSuccessWrapper?: StyleProp<ViewStyle>;
  btnActionsWrapper?: StyleProp<ViewStyle>;
  logoContainer?: StyleProp<ViewStyle>;
  rowBetween?: StyleProp<ViewStyle>;
  infoTitle?: StyleProp<TextStyle>;
  infoSubTitle?: StyleProp<TextStyle>;
  containerFailed?: StyleProp<ViewStyle>;
  errorContentWrapper?: StyleProp<ViewStyle>;
  columnBetween?: StyleProp<ViewStyle>;
  errorTitleWrapper?: StyleProp<ViewStyle>;
  iconErrorWrapper?: StyleProp<ViewStyle>;
  errorMessageWrapper?: StyleProp<ViewStyle>;
  rowErrorBetween?: StyleProp<ViewStyle>;
  statusLabel?: StyleProp<TextStyle>;
  errorMessageLabel?: StyleProp<TextStyle>;
  errorInfoTitleColor?: StyleProp<TextStyle>;
};
