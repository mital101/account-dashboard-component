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
import { Wallet } from '../../../model';
import TransactionItemComponent from '../transaction-item-component';
import useMergeStyles from './styles';

export type TransactionCardComponentProps = {
  wallet: Wallet;
  dashline?: ReactNode;
  style?: TransactionCardComponentStyles;
  onViewAllTransactions: () => void;
};

export type TransactionCardComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  emptyTransactionTextStyle?: StyleProp<TextStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  viewAllTextStyle?: StyleProp<TextStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  itemSeperatorStyle?: StyleProp<ViewStyle>;
};

const TransactionCardComponent = ({
  style,
  wallet,
  dashline,
  onViewAllTransactions,
}: TransactionCardComponentProps) => {
  const styles: TransactionCardComponentStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const { isLoadingTransaction, getTransactionByWalletId } = useContext(WalletContext);
  const walletTransaction = getTransactionByWalletId(wallet.walletId);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerContainerStyle}>
        <Text style={styles.labelTextStyle}>{'Recent transactions'}</Text>
        <Text onPress={onViewAllTransactions} style={styles.viewAllTextStyle}>
          {'View all'}
        </Text>
      </View>
      {isLoadingTransaction ? (
        <ActivityIndicator style={styles.loadingContainerStyle} color={colors.primaryColor} />
      ) : isEmpty(walletTransaction?.data) ? (
        <Text style={styles.emptyTransactionTextStyle}>{'You have no transactions yet.'}</Text>
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
            return <TransactionItemComponent transaction={item} />;
          }}
        />
      )}
    </View>
  );
};

export default TransactionCardComponent;
