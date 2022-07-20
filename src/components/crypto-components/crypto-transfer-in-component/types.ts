import { ReactNode } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoTransferInComponentProps = {
  style?: CryptoTransferInComponentStyles;
  props?: { 
    onSelectCrypto: () => void; 
  };
};

export type CryptoTransferInComponentStyles = {
  safeArea?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  title?: StyleProp<TextStyle>;
  subTitle?: StyleProp<TextStyle>;
  contactContainer?: StyleProp<ViewStyle>;
  scrollView?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  tabbar?: StyleProp<ViewStyle>;
  headerWrapper?: StyleProp<ViewStyle>;
  headerView?: StyleProp<ViewStyle>;
  headerSelectedBg?: StyleProp<ViewStyle>;
  headerTitle?: StyleProp<TextStyle>;
  limitTitle?: StyleProp<TextStyle>;
  remainTitle?: StyleProp<TextStyle>;
  rowBetween?: StyleProp<ViewStyle>;
  rowItem?: StyleProp<ViewStyle>;
  logoContainer?: StyleProp<ViewStyle>;
  titleLogo?: StyleProp<TextStyle>;
  imageWrapper?: StyleProp<ViewStyle>;
  rowTitle?: StyleProp<ViewStyle>;
  iconCrypto?: StyleProp<ImageStyle>;
  titleSection?: StyleProp<ImageStyle>;
  rowWrapper?: StyleProp<ViewStyle>; 
  item?: StyleProp<ViewStyle>; 
  itemWrapper?: StyleProp<ViewStyle>; 
  itemContainer?: StyleProp<ViewStyle>; 
  subLabel?: StyleProp<TextStyle>; 
  mainLabel?: StyleProp<TextStyle>; 
  actionWrapper?: StyleProp<ViewStyle>;
};


export type CryptoItem = {
  id: string;
  imageUrl: string;
  shortName: string,
  currentValue: string,
  fullName: string,
  rate: string
}