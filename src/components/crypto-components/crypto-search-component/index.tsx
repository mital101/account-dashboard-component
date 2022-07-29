import { CryptoSearchComponentProps } from './types';
import React, { useContext, useState } from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import useMergeStyles from './styles';
import {
  WalletContext,
  WalletContextData,
} from '../../../context/wallet-context';
import { SearchInput } from 'react-native-theme-component';
import { ArrowRightIcon } from '../../../assets/arrow-right.icon';
import { CurrencyExchangeRateData } from '../../../model';

const CryptoSearchComponent = ({
  props,
  style,
}: CryptoSearchComponentProps) => {
  const styles = useMergeStyles(style);
  const { onCryptoSelect } = props || {};
  const { getCryptoExchangeData, isLoadingCryptoExchange, cryptoExchangeData } =
    useContext<WalletContextData>(WalletContext);
  const [showData, setShowData] = useState<CurrencyExchangeRateData[]>(
    cryptoExchangeData || []
  );

  const onSelect = (id: string) => {
    onCryptoSelect && onCryptoSelect(id);
  };

  const renderListCryptoData = () => {
    return (
      <FlatList
        data={showData}
        refreshing={isLoadingCryptoExchange}
        onRefresh={getCryptoExchangeData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onSelect(item.id)}
          >
            <View style={styles.row}>
              <Image
                source={{
                  uri: item.fromCurrency.symbolGraphic.replace('sgv', 'png'),
                }}
                style={styles.itemImage}
              />
              <View style={styles.column}>
                <Text>{item.fromCurrency.code}</Text>
                <Text>{item.fromCurrency.name}</Text>
              </View>
            </View>
            <ArrowRightIcon width={20} height={20} color={'#F8981D'} />
          </TouchableOpacity>
        )}
      />
    );
  };

  const onSearch = (text: string) => {
    console.log('onSearch crypto: ', text);
    const searchText = text.trim().toLocaleLowerCase();
    if (cryptoExchangeData) {
      setShowData(
        cryptoExchangeData.filter(
          (c) =>
            c.fromCurrency.code.toLocaleLowerCase().includes(searchText) ||
            c.fromCurrency.name.toLocaleLowerCase().includes(searchText)
        )
      );
    }
  };

  const onClearText = () => {
    setShowData(cryptoExchangeData || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{'Search'}</Text>
      <SearchInput
        blurOnSubmit={true}
        onChangeTextDebounce={onSearch}
        onClearText={onClearText}
        placeholder={'Search coins and assets'}
        inputStyles={{
          textInputStyle: {
            borderColor: '#1EBCE8',
          },
          activeInputBorderColor: {
            borderColor: '#1EBCE8',
          },
        }}
      />
      {renderListCryptoData()}
    </View>
  );
};

export default CryptoSearchComponent;
