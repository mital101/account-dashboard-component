import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { ReactNode, useContext } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  FlatList,
} from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { DashlineIcon } from '../../assets/images';
import { WalletContext } from '../../context/wallet-context';
import { Transaction, Wallet } from '../../model';
import TransactionItemComponent, {
  TransactionItemComponentStyles,
} from '../wallet-card-component/transaction-item-component';
import EmptyTransactionComponent, {
  EmptyTransactionComponentStyles,
} from './components/empty-transaction-component';
import ErrorTransactionComponent, {
  ErrorTransactionComponentStyles,
} from './components/error-transaction-component';
import useMergeStyles from './styles';

export type RecentTransactionComponentProps = {
  wallet: Wallet;
  onAddMoney: () => void;
  onTransactionDetails: (transaction: Transaction) => void;
  dateFormat?: string;
  sectionDateFormat?: string;
  emptyTransaction?: ReactNode;
  errorTransaction?: ReactNode;
  dashLine?: ReactNode;
  style?: RecentTransactionComponentStyles;
};

export type RecentTransactionComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  sectionTitleStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  itemSeperatorStyle?: StyleProp<ViewStyle>;
  loadmoreButtonContainerStyle?: StyleProp<ViewStyle>;
  loadmoreButtonLabelStyle?: StyleProp<TextStyle>;
  loadMoreIndicatorStyle?: StyleProp<ViewStyle>;
  emptyTransactionComponentStyle?: EmptyTransactionComponentStyles;
  errorTransactionComponentStyle?: ErrorTransactionComponentStyles;
  transactionItemComponentStyle?: TransactionItemComponentStyles;
};

const RecentTransactionComponent = ({
  style,
  wallet,
  sectionDateFormat,
  dateFormat,
  emptyTransaction,
  onAddMoney,
  errorTransaction,
  dashLine,
  onTransactionDetails,
}: RecentTransactionComponentProps) => {
  const styles: RecentTransactionComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);

  const {
    groupTransactions,
    isRefreshingTransaction,
    refreshTransactions,
    getTransactionPaging,
    isLoadingTransaction,
    fetchTransactions,
    transactionError,
  } = useContext(WalletContext);
  const grouppedTransactions = groupTransactions(wallet.walletId);
  const paging = getTransactionPaging(wallet.walletId);

  const loadMoreTransactions = () => {
    if (paging) {
      const { pageNumber, totalRecords, pageSize } = paging;
      if (wallet.walletId && !isLoadingTransaction && pageNumber * pageSize < totalRecords) {
        fetchTransactions(wallet.walletId, pageNumber + 1);
      }
    }
  };

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={isRefreshingTransaction}
        onRefresh={() => {
          refreshTransactions(wallet.walletId);
        }}
        tintColor={colors.primaryColor}
      />
    );
  };

  if (transactionError) {
    return (
      <>
        {errorTransaction ?? (
          <ErrorTransactionComponent
            isRefreshing={isRefreshingTransaction}
            onRefresh={() => {
              refreshTransactions();
            }}
            style={styles.errorTransactionComponentStyle}
          />
        )}
      </>
    );
  }

  if (!grouppedTransactions || isEmpty(grouppedTransactions)) {
    return (
      <ScrollView
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={renderRefreshControl()}
      >
        <Text style={styles.headerTitleStyle}>{`${wallet.walletName} Transactions`}</Text>
        {emptyTransaction ?? (
          <EmptyTransactionComponent
            onAddMoney={onAddMoney}
            wallet={wallet}
            style={styles.emptyTransactionComponentStyle}
          />
        )}
      </ScrollView>
    );
  }

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.headerTitleStyle}>{`${wallet.walletName} Transactions`}</Text>
      <FlatList
        keyExtractor={(item) => item.section}
        refreshControl={renderRefreshControl()}
        showsVerticalScrollIndicator={false}
        data={grouppedTransactions}
        ListFooterComponent={() => {
          if (paging) {
            const { pageNumber, totalRecords, pageSize } = paging;
            const canLoadMore = pageNumber * pageSize < totalRecords;
            if (isLoadingTransaction) {
              return (
                <ActivityIndicator
                  style={styles.loadMoreIndicatorStyle}
                  size={'large'}
                  color={colors.primaryColor}
                />
              );
            }
            return canLoadMore ? (
              <TouchableOpacity
                onPress={loadMoreTransactions}
                activeOpacity={0.8}
                style={styles.loadmoreButtonContainerStyle}
              >
                <Text style={styles.loadmoreButtonLabelStyle}>
                  {i18n?.t('recent_transaction_component.btn_load_more') ?? 'Load more'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            );
          }
          return <View />;
        }}
        renderItem={({ item }) => {
          return (
            <>
              <Text style={styles.sectionTitleStyle}>
                {moment(item.section).format(sectionDateFormat ?? 'MMM DD, YYYY')}
              </Text>
              <View style={styles.contentContainerStyle}>
                {item.data.map((transaction, index) => {
                  return (
                    <View key={transaction.txnId}>
                      <TransactionItemComponent
                        style={styles.transactionItemComponentStyle}
                        dateFormat={dateFormat}
                        transaction={transaction}
                        onPressed={() => onTransactionDetails(transaction)}
                      />
                      {index !== item.data.length - 1 && (
                        <View style={styles.itemSeperatorStyle}>
                          {dashLine ?? <DashlineIcon height={1} />}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default RecentTransactionComponent;
