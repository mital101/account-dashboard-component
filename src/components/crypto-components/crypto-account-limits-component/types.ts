import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type AccountLimitsComponentProps = {
  Root?: {
    style?: AccountLimitsComponentStyles;
    props?: {};
  };
};

export type AccountLimitsComponentStyles = {
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
};

export type CryptoLimitItem = {
  name: string;
  limit: number;
  symbol: string;
  remain: number;
  imageUrl?: string;
};
