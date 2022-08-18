import { Transaction } from '../../../model';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoTransactionsHistoryComponentProps = {
  style?: CryptoTransactionsHistoryComponentStyles;
  props?: {
    isDownloadMode?: boolean;
    onSelectTransactionItem?: (transaction: Transaction) => void;
    onSelectTransferIn?: () => void;
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
  emptyTransactionContainer?: StyleProp<ViewStyle>;
  emptyTransactionTitle?: StyleProp<TextStyle>;
  emptyTransactionSubTitle?: StyleProp<TextStyle>;
  emptyTransactionTitleNormal?: StyleProp<TextStyle>;
  imageWrapper?: StyleProp<ViewStyle>;
  tranferInBtn?: StyleProp<ViewStyle>;
  imageEmpty?: StyleProp<ImageStyle>;
  transferInLabel?: StyleProp<TextStyle>;
  downloadBtnSection?: StyleProp<ViewStyle>;
};

export type TransactionTypes = {
  id: string;
  title: string;
  code: string;
};

export type TransactionStatus = {
  id: string;
  title: string;
  code: string;
};
