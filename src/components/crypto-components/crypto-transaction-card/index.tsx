import { Transaction } from '../../../model';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import useMergeStyles from './styles';
import { useCurrencyFormat } from 'react-native-theme-component';
import moment from 'moment';

export type CryptoTransactionsCardComponentProps = {
  style?: CryptoTransactionHistoryCardStyles;
  props?: {
    data: Transaction;
    isLastItem?: boolean;
    isFirstItem?: boolean;
    isVisible?: boolean;
    onSelect?: (transaction: Transaction) => void;
  };
};

export type CryptoTransactionHistoryCardStyles = {
  container?: StyleProp<ViewStyle>;
  row?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  subTitle: StyleProp<TextStyle>;
  verticalMargin?: StyleProp<ViewStyle>;
  borderRadiusTop?: StyleProp<ViewStyle>;
  borderRadiusBottom?: StyleProp<ViewStyle>;
};

const CryptoTransactionsCardComponent = ({
  style,
  props,
}: CryptoTransactionsCardComponentProps) => {
  const {
    data,
    isVisible = true,
    isLastItem,
    isFirstItem,
    onSelect,
  } = props || {};
  const styles = useMergeStyles(style);

  const isMoneyOut = data?.txnType === 'MoneyOut';
  const isAmountPytaka = data?.amount.currency === 'PHP';
  const formatedAmount = data?.amount.amount
    ? useCurrencyFormat(data?.amount.amount, 'PHP')
    : '';
  const displayAmount = `${isMoneyOut ? '-' : '+'} ${
    isAmountPytaka
      ? formatedAmount
      : data?.amount.amount + ' ' + data?.amount.currency
  }`;
  const displayTitle = `${isMoneyOut ? 'Transfer-out' : 'Transfer-in'} (${
    data?.amount.currency
  })`;
  const formatedDateTime = data?.txnDateTime
    ? moment(`${data.txnDateTime}Z`).format('MMM DD, YYYY HH:ss A')
    : '';
  const getStringStatus = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'Completed';
      case 'PROCESSING':
        return 'Pending';
      case 'FAILED':
      default:
        return 'Failed';
    }
  };
  const displayStatus = data?.status ? getStringStatus(data.status) : '';
  const statusColor =
    displayStatus === 'Completed'
      ? '#2E7D32'
      : displayStatus === 'Pending'
      ? '#7C6D98'
      : '#D32F2F';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isFirstItem && styles.borderRadiusTop,
        isLastItem && styles.borderRadiusBottom,
      ]}
      onPress={() => (onSelect && data ? onSelect(data) : true)}
    >
      <View style={styles.row}>
        <Text style={styles.title}>{displayTitle}</Text>
        <Text style={styles.title}>{isVisible ? displayAmount : '***'}</Text>
      </View>
      <View style={styles.verticalMargin} />
      <View style={styles.row}>
        <Text style={styles.subTitle}>{formatedDateTime}</Text>
        <Text style={[styles.subTitle, { color: statusColor }]}>
          {displayStatus}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoTransactionsCardComponent;
