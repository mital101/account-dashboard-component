import React, { forwardRef, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SearchInput } from 'react-native-theme-component';
import { MarketPriceComponentProps } from './types';
import useMergeStyles from './styles';
import { ArrowRightIcon } from '../../assets/images';
import { WalletContext, WalletContextData } from '../../context/wallet-context';
import RowCurrency from '../../components/row-currency';

const MarketPricesComponent = forwardRef(
  ({ Root }: MarketPriceComponentProps, ref) => {
    const { getListCurrency, listCurrency } =
      useContext<WalletContextData>(WalletContext);
    const { style, props } = Root || {};
    const {
      onViewAllCrypto,
      searchInputProps,
      onSearchingCrypto,
      onSelectItemCurrency,
    } = props || {};

    const styles = useMergeStyles(style);

    useEffect(() => {
      //TODO: implement load list crypto
      getListCurrency();
    }, []);

    const renderListCryptoData = () =>
      listCurrency
        ?.slice(0, 4)
        .map((item) => (
          <RowCurrency
            currency={item}
            onSelect={onSelectItemCurrency}
            key={item.code}
          />
        ));

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Market Prices</Text>
          <View style={styles.viewAllSection}>
            <TouchableOpacity
              style={styles.viewAllSection}
              onPress={onViewAllCrypto}
            >
              <Text style={styles.viewAllLabel}>All Crypto</Text>
              <ArrowRightIcon width={12} height={15} color={'#FF9800'} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={onSearchingCrypto}>
          <SearchInput
            blurOnSubmit={true}
            placeholder={'Search'}
            inputStyles={searchInputProps?.inputStyles}
            editable={false}
            onPressIn={onSearchingCrypto}
          />
        </TouchableOpacity>
        <View style={styles.contentWrapper}>{renderListCryptoData()}</View>
      </View>
    );
  }
);

export default MarketPricesComponent;
