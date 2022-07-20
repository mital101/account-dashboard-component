import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoReceiveSummaryComponentProps = {
  style?: CryptoReceiveSummaryComponentStyles;
  props?: { 
    onSelectCrypto: () => void; 
  };
};

export type CryptoReceiveSummaryComponentStyles = {
  safeArea?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  actionWrapper?: StyleProp<ViewStyle>;
  pageSubTitle?: StyleProp<TextStyle>;
  pageSubTitleView?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
};


export type CryptoItem = {
  id: string;
  imageUrl: string;
  shortName: string,
  currentValue: string,
  fullName: string,
  rate: string
}