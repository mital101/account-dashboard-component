import { TransactionStatus } from '../../types';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type FilterTransactionModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initValue?: TransactionStatus;
  style?: FilterTransactionModalStyles;
  dataTransactionStatus: TransactionStatus[];
  onSubmitFilter?: (
    status?: TransactionStatus,
    isSelectAllTime?: boolean,
    from?: Date,
    to?: Date
  ) => void;
};

export type FilterTransactionModalStyles = {
  container?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  row?: StyleProp<ViewStyle>;
  rowBetween?: StyleProp<ViewStyle>;
  closeTitle?: StyleProp<TextStyle>;
  titleRowSelect?: StyleProp<TextStyle>;
  header?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  statusSection?: StyleProp<ViewStyle>;
  statusBtn?: StyleProp<ViewStyle>;
  statusBtnSelected?: StyleProp<ViewStyle>;
  statusTitle?: StyleProp<TextStyle>;
  rowStatusBtn?: StyleProp<ViewStyle>;
  statusLabel?: StyleProp<TextStyle>;
  rowSelect?: StyleProp<ViewStyle>;
  selectedBox?: StyleProp<ViewStyle>;
  unSelectedBox?: StyleProp<ViewStyle>;
  startEndDateTitle?: StyleProp<TextStyle>;
  allTimeTitle?: StyleProp<TextStyle>;
  datePickerSection?: StyleProp<ViewStyle>;
  selectDateBtn?: StyleProp<ViewStyle>;
  horizontalMargin?: StyleProp<ViewStyle>;
  actionsView?: StyleProp<ViewStyle>;
  selectDateTitle?: StyleProp<TextStyle>;
  resetBtn?: StyleProp<ViewStyle>;
  resetTitle?: StyleProp<TextStyle>;
};
