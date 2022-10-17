import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CardUpdateTransactionLimitsComponentProps = {
  style?: CardUpdateTransactionLimitsComponentStyles;
  props: {
    onCancelUpdateTransactionLimits: () => void;
    onDismissAlert: () => void;
    isShowConfirmALert: boolean;
    onConfirm: (value: number) => void;
  };
};

export type CardUpdateTransactionLimitsComponentStyles = {
  container?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  pageSubtite?: StyleProp<TextStyle>;
  actionWrapper?: StyleProp<ViewStyle>; 
  titleSection?: StyleProp<ViewStyle>; 
  dragSection?: StyleProp<ViewStyle>; 
  amountRow?: StyleProp<ViewStyle>; 
  processRow?: StyleProp<ViewStyle>; 
  title?: StyleProp<TextStyle>; 
  subTitle?: StyleProp<TextStyle>;
  amountNumber?: StyleProp<TextStyle>; 
  lineAmount?: StyleProp<ViewStyle>; 
  circleAmount?: StyleProp<ViewStyle>; 
  viewAmountNumber?: StyleProp<ViewStyle>; 
  bigLineAmount?: StyleProp<ViewStyle>; 
  amountLineSection?: StyleProp<ViewStyle>; 
  bigLineColumnAmount?: StyleProp<ViewStyle>; 
  row?: StyleProp<ViewStyle>; 
};
