import React, { forwardRef, useEffect } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { SearchInput } from 'react-native-theme-component';
import { MarketPriceComponentProps } from './types';
import useMergeStyles from './styles';
import { ArrowRightIcon } from '../../assets/images';

const MarketPricesComponent = forwardRef(
  ({ Root }: MarketPriceComponentProps, ref) => {
    const { style, props } = Root || {};

    const styles = useMergeStyles(style);
    const cryptoImg = require('../../assets/listCrypto.png');

    useEffect(() => {
      //TODO: implement load list crypto
    }, []);

    const onSearch = (text: string) => {
      console.log('onSearch crypto: ', text);
      //TODO: implement search crypto
    };

    const renderListCryptoData = () => {
      // Temporarily show image
      return (
        <Image style={styles.image} source={cryptoImg} resizeMode={'stretch'} />
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Market Prices</Text>
          <View style={styles.viewAllSection}>
            <TouchableOpacity style={styles.viewAllSection} onPress={() => {}}>
              <Text style={styles.viewAllLabel}>All Markets</Text>
              <ArrowRightIcon width={12} height={15} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <SearchInput
            blurOnSubmit={true}
            onChangeTextDebounce={onSearch}
            placeholder={'Search'}
            inputStyles={props?.searchInputProps?.inputStyles}
          />
        </View>
        <View style={styles.imageWrapper}>{renderListCryptoData()}</View>
      </View>
    );
  }
);

export default MarketPricesComponent;
