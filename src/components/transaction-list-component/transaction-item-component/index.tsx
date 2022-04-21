import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TransactionItemStyle } from '../../../types';
import useMergStyles from './styles';
import { useCurrencyFormat } from 'react-native-theme-component';
import { CreditDebitIndicator, Transaction, Wallet } from '../../../model';

export interface TransactionItemProps {
  wallets: Wallet[];
  transaction: Transaction;
  isFromAggregated?: boolean;
  style?: TransactionItemStyle;
  onItemPress?: () => void;
}

const TransactionItemComponent = (props: TransactionItemProps) => {
  const { transaction, isFromAggregated, style, onItemPress, wallets } = props;

  const styles = useMergStyles(style);

  const getTargetWalletId = () => {
    if (isFromAggregated) {
      if (transaction.creditDebitIndicator === CreditDebitIndicator.Credit) {
        return transaction.destinationAccount.walletId;
      } else {
        return transaction.sourceAccount.walletId;
      }
    }
    return undefined;
  };

  const [targetWallet, setTargetWalet] = useState<Wallet | undefined>(undefined);

  useEffect(() => {
    const _targetWalletId = getTargetWalletId();
    if (_targetWalletId) {
      const wallet = wallets.find(
        (item) => item.walletId.replace(/-/g, '') === _targetWalletId.replace(/-/g, '')
      );
      setTargetWalet(wallet);
    }
  }, [wallets]);

  const creditOrDebit =
    transaction.creditDebitIndicator === CreditDebitIndicator.Credit ? '+' : '-';

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.containerStyle} onPress={onItemPress}>
      <View style={styles.leftWrapStyle}>
        <Text style={styles.descriptionTextStyle}>{transaction.description}</Text>
        {targetWallet && (
          <Text style={styles.walletNameTextStyle}>
            {`${targetWallet.walletName} (${targetWallet.bankAccount?.bankBranchId ?? ''} ${
              targetWallet.bankAccount.accountNumber
            })`}
          </Text>
        )}
      </View>
      <View style={styles.rightWrapStyle}>
        <Text style={styles.amountTextStyle}>{`${creditOrDebit}${useCurrencyFormat(
          transaction.amount.amount,
          transaction.amount.currency
        )}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItemComponent;
