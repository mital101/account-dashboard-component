import { CryptoTransactionsHistoryComponentProps } from './types';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
} from 'react-native';
import useMergeStyles from './styles';
import { TransactionTypes } from './types';
import {
  ArrowDownIcon,
  TransactionFilterIcon,
  SeperateLineIcon,
} from '../../../assets/images';
import { Button } from 'react-native-theme-component';
import {
  CryptoTransactionsCardComponent,
  SelectTransactionTypeModal,
  FilterTransactionModal,
} from './components';
import {
  typeOfTransaction,
  statusOfTransaction,
} from '../../../constants/common';

const CryptoTransactionsHistoryComponent = ({
  props,
  style,
}: CryptoTransactionsHistoryComponentProps) => {
  const { onSelectTransactionItem, isDownloadMode } = props || {};
  const [isShowFilterModel, setIsShowFilterModel] = useState<boolean>(false);
  const [isShowSelectTypeModel, setIsShowSelectTypeModel] =
    useState<boolean>(false);
  const [selectedTypesTransaction, setSelectedTypesTransaction] = useState<
    TransactionTypes[]
  >([]);

  const styles = useMergeStyles(style);

  const dummyData = [
    {
      title: 'Nov 17, 2021',
      data: ['Risotto'],
    },
    {
      title: 'Nov 17, 2021',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Nov 17, 2021',
      data: ['Pizza', 'Burger'],
    },
    {
      title: 'Nov 17, 2021',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
  ];

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

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.pageTitle}>
        {isDownloadMode
          ? 'Download Transaction History'
          : 'My Crypto Transactions'}
      </Text>
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
    </View>
  );
  const renderFooter = () => (
    <View style={styles.loadMoreWrapper}>
      <Button label="Load more" onPress={() => {}} />
    </View>
  );

  const renderGroupTransaction = () => {
    return (
      <SectionList
        sections={dummyData}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={isDownloadMode ? null : renderFooter}
        ItemSeparatorComponent={() => (
          <View style={styles.seperateView}>
            <SeperateLineIcon height={1} />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerWrapper}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item, index, section }) => (
          <CryptoTransactionsCardComponent
            props={{
              data: { id: 'test' },
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
    console.log('onSelectTransactionTypes: ', types);
    setSelectedTypesTransaction(types);
  };

  const onSubmitFilter = () => {
    console.log('onSubmitFilter');
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderGroupTransaction()}
      {isDownloadMode && (
        <View style={styles.loadMoreWrapper}>
          <Button label="Download to this device" onPress={() => {}} />
        </View>
      )}
      <SelectTransactionTypeModal
        isVisible={isShowSelectTypeModel}
        onClose={onCloseSelectTypeModel}
        initialValue={selectedTypesTransaction}
        onSelectTransactionTypes={onSelectTransactionTypes}
        dataTransactionTypes={typeOfTransaction}
      />
      <FilterTransactionModal
        isVisible={isShowFilterModel}
        onClose={onCloseFilterModel}
        dataTransactionStatus={statusOfTransaction}
        onSubmitFilter={onSubmitFilter}
      />
    </SafeAreaView>
  );
};

export default CryptoTransactionsHistoryComponent;
