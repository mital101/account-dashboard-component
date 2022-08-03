import { CryptoSearchComponentProps } from './types';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import useMergeStyles from './styles';
import {
  WalletContext,
  WalletContextData,
} from '../../../context/wallet-context';
import { SearchInput } from 'react-native-theme-component';
import { ArrowRightIcon } from '../../../assets/arrow-right.icon';
import { Currency } from '../../../model';

const CryptoSearchComponent = ({
  props,
  style,
}: CryptoSearchComponentProps) => {
  const styles = useMergeStyles(style);
  const { onCryptoSelect } = props || {};
  const { getListCurrency, isLoadingListCurrency, listCurrency } =
    useContext<WalletContextData>(WalletContext);
  const [showData, setShowData] = useState<Currency[]>(listCurrency || []);

  console.log('render -> listCurrency', showData);

  useEffect(() => {
    getListCurrency();
  }, []);

  useEffect(() => {
    if (listCurrency && listCurrency.length > 0) {
      setShowData(listCurrency);
    }
  }, [listCurrency]);

  const onSelect = (data: Currency) => {
    onCryptoSelect && onCryptoSelect(data);
  };

  const renderListCryptoData = () => {
    return (
      <FlatList
        data={showData}
        refreshing={isLoadingListCurrency}
        onRefresh={getListCurrency}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onSelect(item)}
          >
            <View style={styles.row}>
              <Image
                source={{
                  uri: item.logo,
                }}
                style={styles.itemImage}
              />
              <View style={styles.column}>
                <Text>{item.code}</Text>
                <Text>{item.name}</Text>
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
    if (listCurrency) {
      setShowData(
        listCurrency.filter(
          (c) =>
            c.code.toLocaleLowerCase().includes(searchText) ||
            c.name.toLocaleLowerCase().includes(searchText)
        )
      );
    }
  };

  const onClearText = () => {
    setShowData(listCurrency || []);
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
