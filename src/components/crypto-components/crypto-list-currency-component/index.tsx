import { CryptoListCurrencyComponentProps } from './types';
import React, { useContext, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import useMergeStyles from './styles';
import {
  WalletContext,
  WalletContextData,
} from '../../../context/wallet-context';
import RowCurrency from '../../row-currency';

export type CryptoListCurrencyRef = {
  onSaveToGallery: () => void;
};

const CryptoListCurrencyComponent = ({
  props,
  style,
}: CryptoListCurrencyComponentProps) => {
  const styles = useMergeStyles(style);
  const { getListCurrency, isLoadingListCurrency, listCurrency } =
    useContext<WalletContextData>(WalletContext);
  const { onCryptoSelect } = props || {};

  useEffect(() => {
    getListCurrency();
  }, []);

  const renderListCryptoData = () => {
    return (
      <FlatList
        data={listCurrency}
        ListHeaderComponent={
          <Text style={styles.pageTitle}>{'All Crypto'}</Text>
        }
        refreshing={false}
        onRefresh={getListCurrency}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <RowCurrency onSelect={onCryptoSelect} currency={item} />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderListCryptoData()}</View>
    </View>
  );
};

export default CryptoListCurrencyComponent;
