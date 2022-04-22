import moment from 'moment';
import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useCurrencyFormat } from 'react-native-theme-component';
import { CreditDebitIndicator, Transaction } from '../../../model';
import useMergeStyles from './styles';

export type TransactionItemComponentProps = {
  onPressed: () => void;
  transaction: Transaction;
  dateFormat?: string;
  style?: TransactionItemComponentStyles;
};

export type TransactionItemComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
  dateTextStyle?: StyleProp<TextStyle>;
};

const TransactionItemComponent = ({
  style,
  transaction,
  dateFormat,
  onPressed,
}: TransactionItemComponentProps) => {
  const styles: TransactionItemComponentStyles = useMergeStyles(style);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPressed} style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.descriptionTextStyle}>
          {transaction.recipientDescription ?? transaction.description}
        </Text>
        <Text style={styles.amountTextStyle}>
          {`${
            transaction.creditDebitIndicator === CreditDebitIndicator.Credit ? '+' : '-'
          } ${useCurrencyFormat(transaction.amount.amount, transaction.amount.currency)}`}
        </Text>
      </View>
      <Text style={styles.dateTextStyle}>
        {moment(transaction.txnDateTime).format(dateFormat ?? 'MMM DD, YYYY HH:MM A')}
      </Text>
    </TouchableOpacity>
  );
};

export default TransactionItemComponent;
