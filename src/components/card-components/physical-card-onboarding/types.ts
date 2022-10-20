import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type PhysicalCardConfirmComponentProps = {
  style?: PhysicalCardConfirmComponentStyles;
  props: {
    onConfirm: () => void;
  };
};

export type PhysicalCardConfirmComponentStyles = {
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
  footer?: StyleProp<ViewStyle>;
  cbContainer?: StyleProp<ViewStyle>;
  image?: StyleProp<ImageStyle>;
  headerWrapper?: StyleProp<ViewStyle>;
  pcCardPreviewImgWrapper?: StyleProp<ViewStyle>;
};
