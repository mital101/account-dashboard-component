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
  const { getCryptoExchangeData, isLoadingCryptoExchange, cryptoExchangeData } =
    useContext<WalletContextData>(WalletContext);
  const { onCryptoSelect } = props || {};

  const renderListCryptoData = () => {
    return (
      <FlatList
        data={cryptoExchangeData}
        refreshing={isLoadingCryptoExchange}
        onRefresh={getCryptoExchangeData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RowCurrency onSelect={onCryptoSelect} currency={item} />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{'All Crypto'}</Text>
      <View style={styles.content}>{renderListCryptoData()}</View>
    </View>
  );
};

export default CryptoListCurrencyComponent;
