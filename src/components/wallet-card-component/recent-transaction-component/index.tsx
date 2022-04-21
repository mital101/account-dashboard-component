import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useContext } from 'react';
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
import { DashlineIcon } from '../../../assets/images';
import { WalletContext } from '../../../context/wallet-context';
import { Wallet } from '../../../model';
import TransactionItemComponent from '../transaction-item-component';
import useMergeStyles from './styles';

export type RecentTransactionComponentProps = {
  wallet: Wallet;
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
};

const RecentTransactionComponent = ({ style, wallet }: RecentTransactionComponentProps) => {
  const styles: RecentTransactionComponentStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);

  const {
    groupTransactions,
    isRefreshingTransaction,
    refreshTransactions,
    getTransactionPaging,
    isLoadingTransaction,
    fetchTransactions,
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

  if (!grouppedTransactions || isEmpty(grouppedTransactions)) {
    return (
      <ScrollView
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={renderRefreshControl()}
      >
        <Text>Empty transactions</Text>
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
                <Text style={styles.loadmoreButtonLabelStyle}>{'Load more'}</Text>
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
                {moment(item.section, 'DD MMM YYYY').format('MMM DD, YYYY')}
              </Text>
              <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.txnId}
                scrollEnabled={false}
                data={item.data}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeperatorStyle}>{<DashlineIcon height={1} />}</View>
                )}
                renderItem={(props) => {
                  return <TransactionItemComponent transaction={props.item} />;
                }}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default RecentTransactionComponent;
