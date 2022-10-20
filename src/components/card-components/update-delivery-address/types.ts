import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type UpdateDeliveryAddressComponentProps = {
  style?: UpdateDeliveryAddressComponentStyles;
  props: {
    onSuccess: () => void;
  };
};

export type UpdateDeliveryAddressComponentStyles = {
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
  cardContainer?: StyleProp<ViewStyle>;
  orderTitleSection?: StyleProp<ViewStyle>;
  rowBetween?: StyleProp<ViewStyle>;
  leftSection?: StyleProp<ViewStyle>;
  noteContainer?: StyleProp<TextStyle>;
  cardTitle?: StyleProp<TextStyle>;
  cardSubTitle?: StyleProp<TextStyle>;
  noteCardContent?: StyleProp<TextStyle>;
  noteCardTitle?: StyleProp<TextStyle>;
  orderTitle?: StyleProp<TextStyle>;
  noteContent?: StyleProp<TextStyle>;
  noteTitle?: StyleProp<TextStyle>;
  cardMoney?: StyleProp<TextStyle>;
};
