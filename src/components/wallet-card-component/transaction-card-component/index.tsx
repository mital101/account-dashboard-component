import { isEmpty } from 'lodash';
import React, { ReactNode, useContext } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
  FlatList,
} from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { DashlineIcon } from '../../../assets/dashline.icon';
import { WalletContext } from '../../../context/wallet-context';
import { Transaction, Wallet } from '../../../model';
import TransactionItemComponent, {
  TransactionItemComponentStyles,
} from '../transaction-item-component';
import useMergeStyles from './styles';

export type TransactionCardComponentProps = {
  wallet: Wallet;
  dateFormat?: string;
  dashline?: ReactNode;
  style?: TransactionCardComponentStyles;
  onViewAllTransactions: () => void;
  onTransactionDetails: (transaction: Transaction) => void;
};

export type TransactionCardComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  emptyTransactionTextStyle?: StyleProp<TextStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  viewAllTextStyle?: StyleProp<TextStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  itemSeperatorStyle?: StyleProp<ViewStyle>;
  transactionItemComponentStyle?: TransactionItemComponentStyles;
};

const TransactionCardComponent = ({
  style,
  wallet,
  dashline,
  onViewAllTransactions,
  dateFormat,
  onTransactionDetails,
}: TransactionCardComponentProps) => {
  const styles: TransactionCardComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const { isLoadingTransaction, getTransactionByWalletId } = useContext(WalletContext);
  const walletTransaction = getTransactionByWalletId(wallet.walletId);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.labelTextStyle}>
          {i18n?.t('wallet_card_component.lbl_recent_transactions') ?? 'Recent transactions'}
        </Text>
        <Text onPress={onViewAllTransactions} style={styles.viewAllTextStyle}>
          {i18n?.t('wallet_card_component.btn_view_all') ?? 'View all'}
        </Text>
      </View>
      {isLoadingTransaction ? (
        <ActivityIndicator style={styles.loadingContainerStyle} color={colors.primaryColor} />
      ) : isEmpty(walletTransaction?.data) ? (
        <Text style={styles.emptyTransactionTextStyle}>
          {i18n?.t('wallet_card_component.msg_no_transaction') ?? 'You have no transactions yet.'}
        </Text>
      ) : (
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item) => item.txnId}
          data={walletTransaction?.data.slice(0, 3)}
          initialNumToRender={3}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeperatorStyle}>{dashline ?? <DashlineIcon height={1} />}</View>
          )}
          renderItem={({ item }) => {
            return (
              <TransactionItemComponent
                onPressed={() => onTransactionDetails(item)}
                dateFormat={dateFormat}
                transaction={item}
                style={styles.transactionItemComponentStyle}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default TransactionCardComponent;
