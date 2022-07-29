import React, { forwardRef, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SearchInput } from 'react-native-theme-component';
import { MarketPriceComponentProps } from './types';
import useMergeStyles from './styles';
import { ArrowRightIcon } from '../../assets/images';
import { WalletContext, WalletContextData } from '@banking-component/wallet-component/src/context/wallet-context';
import LoadingSpinner from '../loading-spinner';
import RowCurrency from '@banking-component/wallet-component/src/components/row-currency';

const MarketPricesComponent = forwardRef(
  ({ Root }: MarketPriceComponentProps, ref) => {
    const { getCryptoExchangeData, cryptoExchangeData } = useContext<WalletContextData>(WalletContext);
    const { style, props } = Root || {};
    const { onViewAllCrypto, searchInputProps, onSearchingCrypto, onSelectItemCurrency } = props || {};

    const styles = useMergeStyles(style);

    useEffect(() => {
      //TODO: implement load list crypto
      getCryptoExchangeData();
    }, []);

    const renderListCryptoData = () => cryptoExchangeData?.slice(0, 5).map((item) => <RowCurrency currency={item} onSelect={onSelectItemCurrency} key={item.id} />)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Market Prices</Text>
          <View style={styles.viewAllSection}>
            <TouchableOpacity style={styles.viewAllSection} onPress={onViewAllCrypto}>
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
