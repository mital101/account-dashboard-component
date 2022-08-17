import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoTransferComponentProps = {
  style?: CryptoTransferComponentStyles;
  props?: {
    onSelectCrypto?: () => void;
    onTransferPHP?: () => void;
    goToAccountLimit?: () => void;
    setVisibleCurrentBalance?: (isVisible: boolean) => void;
  };
};

export type CryptoTransferComponentStyles = {
  safeArea?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  pageSubTitleSection?: StyleProp<ViewStyle>;
  pageSubTitle?: StyleProp<TextStyle>;
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
  cardInputBalance?: StyleProp<ViewStyle>;
  inputBalanceWrapper?: StyleProp<ViewStyle>;
  rowInput?: StyleProp<ViewStyle>;
  balanceLabel?: StyleProp<TextStyle>;
  balanceTitle?: StyleProp<TextStyle>;
  smallBalanceLabel?: StyleProp<TextStyle>;
  labelPurchase?: StyleProp<TextStyle>;
  currentBalanceWrapper?: StyleProp<ViewStyle>;
  purchaseOptionView?: StyleProp<ViewStyle>;
  row?: StyleProp<ViewStyle>;
  input?: StyleProp<ViewStyle>;
  aboutLimitLabel?: StyleProp<ViewStyle>;
  horizontalPadding?: StyleProp<ViewStyle>;
  dailyLimit?: StyleProp<ViewStyle>;
  remainingWrapper?: StyleProp<ViewStyle>;
  remainLabel?: StyleProp<TextStyle>;
  dailyLimitLabel?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
  paddingBottomView?: StyleProp<ViewStyle>;
  errorRow?: StyleProp<ViewStyle>;
};

export type CryptoItem = {
  id: string;
  imageUrl: string;
  shortName: string;
  currentValue: string;
  fullName: string;
  rate: string;
};
