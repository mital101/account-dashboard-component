import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoTransactionsHistoryComponentProps = {
  style?: CryptoTransactionsHistoryComponentStyles;
  props?: {
    isDownloadMode?: boolean;
    onSelectTransactionItem?: (id: string) => void;
  };
};

export type CryptoTransactionsHistoryComponentStyles = {
  container?: StyleProp<ViewStyle>;
  header?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  sectionTitle?: StyleProp<TextStyle>;
  horizontalMargin?: StyleProp<ViewStyle>;
  rowBetween?: StyleProp<ViewStyle>;
  row?: StyleProp<ViewStyle>;
  selectTypeTitle?: StyleProp<TextStyle>;
  loadMoreWrapper?: StyleProp<ViewStyle>;
  seperateView?: StyleProp<ViewStyle>;
  headerWrapper?: StyleProp<ViewStyle>;
};
