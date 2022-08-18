import {
  CryptoTransactionsHistoryComponentProps,
  TransactionStatus,
} from './types';
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
  RefreshControl,
  Image,
} from 'react-native';
import useMergeStyles from './styles';
import { TransactionTypes } from './types';
import {
  ArrowDownIcon,
  TransactionFilterIcon,
  SeperateLineIcon,
  images,
} from '../../../assets/images';
import { Button } from 'react-native-theme-component';
import {
  SelectTransactionTypeModal,
  FilterTransactionModal,
} from './components';
import {
  typeOfTransaction,
  statusOfTransaction,
} from '../../../constants/common';
import CryptoTransactionsCardComponent from '../crypto-transaction-card';
import { WalletContext } from '../../../context/wallet-context';
import _ from 'lodash';
import { Transaction } from '../../../model';
import moment from 'moment';
import { FilterTransaction } from '../../../types';

const CryptoTransactionsHistoryComponent = ({
  props,
  style,
}: CryptoTransactionsHistoryComponentProps) => {
  const { onSelectTransactionItem, isDownloadMode, onSelectTransferIn } =
    props || {};
  const [isShowFilterModel, setIsShowFilterModel] = useState<boolean>(false);
  const [isShowSelectTypeModel, setIsShowSelectTypeModel] =
    useState<boolean>(false);
  const {
    getCryptoTransactions,
    cryptoTransactions,
    isLoadingGetCryptoTransactions,
    cryptoTransactionsPaging,
  } = useContext(WalletContext);
  const [filter, setFilter] = useState<FilterTransaction>();
  const isCanLoadMore =
    cryptoTransactions &&
    cryptoTransactionsPaging &&
    cryptoTransactions.length < cryptoTransactionsPaging.totalRecords;

  const styles = useMergeStyles(style);

  const groupByDate = _.groupBy(cryptoTransactions, (transaction) =>
    moment(`${transaction.txnDateTime}Z`).format('MMM DD, YYYY')
  );

  const sectionData: { title: string; data: Transaction[] }[] = [];

  for (let key in groupByDate) {
    sectionData.push({
      title: key,
      data: groupByDate[key],
    });
  }

  useEffect(() => {
    getCryptoTransactions(false, filter);
  }, [filter]);

  const onShowSelectTypeModel = () => {
    setIsShowSelectTypeModel(true);
  };

  const onCloseSelectTypeModel = () => {
    setIsShowSelectTypeModel(false);
  };

  const onShowFilterModel = () => {
    setIsShowFilterModel(true);
  };

  const onCloseFilterModel = () => {
    setIsShowFilterModel(false);
  };

  const onRefresh = () => {
    getCryptoTransactions(false, filter);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.pageTitle}>
        {isDownloadMode
          ? 'Download Transaction History'
          : 'My Crypto Transactions'}
      </Text>
      {filter || sectionData.length > 0 ? (
        <View style={styles.rowBetween}>
          <TouchableOpacity style={styles.row} onPress={onShowSelectTypeModel}>
            <Text style={styles.selectTypeTitle}>All type of transactions</Text>
            <View style={styles.horizontalMargin} />
            <ArrowDownIcon size={15} color="#020000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShowFilterModel}>
            <TransactionFilterIcon size={23} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

  const renderFooter = () => (
    <View style={styles.loadMoreWrapper}>
      {!isDownloadMode && isCanLoadMore && (
        <Button
          isLoading={isLoadingGetCryptoTransactions}
          label="Load more"
          onPress={() => getCryptoTransactions(true, filter)}
        />
      )}
    </View>
  );

  const renderListEmpty = () => {
    return (
      <View style={styles.emptyTransactionContainer}>
        {filter ? (
          <Text style={styles.emptyTransactionTitleNormal}>
            You have no transactions yet.
          </Text>
        ) : (
          <View>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.imageEmpty}
                source={images.emptyTransactions}
              />
            </View>
            <Text style={styles.emptyTransactionTitle}>
              You have no transactions yet.
            </Text>
            <Text style={styles.emptyTransactionSubTitle}>
              Please try transferring in cash or crypto to your Crypto Pitaka
              and enjoy the rest of our crypto service features.
            </Text>
            <TouchableOpacity
              style={styles.tranferInBtn}
              onPress={onSelectTransferIn}
            >
              <Text style={styles.transferInLabel}>Transfer-in Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderGroupTransaction = () => {
    return (
      <SectionList
        sections={sectionData}
        keyExtractor={(item) => item.txnId}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingGetCryptoTransactions}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={() => (
          <View style={styles.seperateView}>
            <SeperateLineIcon height={1} />
          </View>
        )}
        ListEmptyComponent={renderListEmpty}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerWrapper}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item, index, section }) => (
          <CryptoTransactionsCardComponent
            props={{
              data: item,
              onSelect: onSelectTransactionItem,
              isLastItem: index === section.data.length - 1,
              isFirstItem: index === 0,
            }}
          />
        )}
      />
    );
  };

  const onSelectTransactionTypes = (types: TransactionTypes[]) => {
    setFilter({
      ...filter,
      types: types.map((t) => t.code),
    });
  };

  const onSubmitFilter = (
    status?: TransactionStatus,
    isSelectAllTime?: boolean,
    from?: Date,
    to?: Date
  ) => {
    const dayFrom = isSelectAllTime
      ? '2000-10-31'
      : moment(from).format('YYYY-MM-DD');
    const dayTo = isSelectAllTime
      ? moment().format('YYYY-MM-DD')
      : moment(to).format('YYYY-MM-DD');

    setFilter({
      ...filter,
      status: status?.code,
      from: dayFrom,
      to: dayTo,
    });
  };

  return (
    <>
      {renderGroupTransaction()}
      {isDownloadMode && (
        <View style={styles.downloadBtnSection}>
          <Button
            label="Download to this device"
            disabled={cryptoTransactions?.length === 0}
            onPress={() => {}}
          />
        </View>
      )}
      <SelectTransactionTypeModal
        isVisible={isShowSelectTypeModel}
        onClose={onCloseSelectTypeModel}
        onSelectTransactionTypes={onSelectTransactionTypes}
        dataTransactionTypes={typeOfTransaction}
      />
      <FilterTransactionModal
        isVisible={isShowFilterModel}
        onClose={onCloseFilterModel}
        dataTransactionStatus={statusOfTransaction.slice(0, 3)}
        onSubmitFilter={onSubmitFilter}
      />
    </>
  );
};

export default CryptoTransactionsHistoryComponent;
