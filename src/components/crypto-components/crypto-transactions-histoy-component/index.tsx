import { CryptoTransactionsHistoryComponentProps } from './types';
import React from 'react';
import { View, Text, TouchableOpacity, SectionList, SafeAreaView } from 'react-native';
import useMergeStyles from './styles';
import { ArrowDownIcon, TransactionFilterIcon, SeperateLineIcon } from '../../../assets/images';
import  CryptoTransactionsCardComponent from '@banking-component/wallet-component/src/components/crypto-components/crypto-transactions-histoy-component/components/crypto-transaction-card';
import { Button } from 'react-native-theme-component';
import SelectTransactionTypeModal from './components/select-type-bottom-sheet';
import Clipboard from '@react-native-clipboard/clipboard';

const CryptoTransactionsHistoryComponent = ({props, style}: CryptoTransactionsHistoryComponentProps) => {
  const { onSelectTransactionItem, isDownloadMode } = props || {};

  const styles = useMergeStyles(style);

  const dummyData = [
    {
      title: "Nov 17, 2021",
      data: ["Risotto"]
    },
    {
      title: "Nov 17, 2021",
      data: ["Pizza", "Burger", "Risotto"]
    },
    {
      title: "Nov 17, 2021",
      data: ["Pizza", "Burger"]
    },
    {
      title: "Nov 17, 2021",
      data: ["Pizza", "Burger", "Risotto"]
    },
  ];

  const onSelectType = () => {
    
  }

  const renderHeader = () =>  <View style={styles.header}>
  <Text style={styles.pageTitle}>{isDownloadMode ? 'Download Transaction History' : 'My Crypto Transactions'}</Text>
  <View style={styles.rowBetween}>
    <TouchableOpacity style={styles.row} onPress={onSelectType}>
        <Text style={styles.selectTypeTitle}>All type of transactions</Text>
        <View style={styles.horizontalMargin}/>
        <ArrowDownIcon size={15} color='#020000' />
    </TouchableOpacity>
    <TouchableOpacity>
      <TransactionFilterIcon size={23} />
    </TouchableOpacity>
    </View>
</View>
  const renderFooter = () => <View style={styles.loadMoreWrapper}>
    <Button label="Load more" onPress={() => {}} />
  </View>


  const renderGroupTransaction = () => {
    return <SectionList 
      sections={dummyData}
      keyExtractor={(item, index) => item + index}

      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}

      ListHeaderComponent={renderHeader}
      ListFooterComponent={isDownloadMode ? null : renderFooter}

      ItemSeparatorComponent={() => 
      <View style={styles.seperateView}>
      
      <SeperateLineIcon height={1} />
      </View>}

      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.headerWrapper}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
      )}
      renderItem={({ item, index, section }) => (
        <CryptoTransactionsCardComponent 
        props = {{
          data: {id: 'test'},
          onSelect: onSelectTransactionItem, 
          isLastItem: index === section.data.length - 1,
          isFirstItem: index ===0
        }}
        />
      )}
    />
  }

  return (
    <SafeAreaView style={styles.container}>
        {renderGroupTransaction()}
        {isDownloadMode && <View style={styles.loadMoreWrapper}>
          <Button label="Download to this device" onPress={() => {}} />
        </View>}
        <SelectTransactionTypeModal isVisible={true} onClose={() => {
          console.log('close')
        }} />
    </SafeAreaView>
  );
} ;

export default CryptoTransactionsHistoryComponent;
