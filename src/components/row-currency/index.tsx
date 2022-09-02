import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  Image,
  TextStyle,
} from 'react-native';
import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import { Currency } from '../../model';
import { LineChart } from 'react-native-svg-charts';
import { WalletService } from '../../services/wallet-service';
import {
  filterExchangeRateOptions,
  maxLengthExchangeRateHistory,
} from '../../constants/common';

export type RowCurrencyProps = {
  currency: Currency;
  style?: RowCurrencyStyle;
  onSelect?: (currency: Currency) => void;
};

export type RowCurrencyStyle = {
  row?: StyleProp<ViewStyle>;
  rowInfo?: StyleProp<ViewStyle>;
  rowSubInfo?: StyleProp<ViewStyle>;
  image?: StyleProp<ImageStyle>;
  rate?: StyleProp<TextStyle>;
  diff?: StyleProp<TextStyle>;
};

const walletService = WalletService.instance();

const RowCurrency = ({ onSelect, currency, style }: RowCurrencyProps) => {
  const styles = useMergeStyles(style);
  const [exchangeRateHistory, setExchangeRateHistory] = useState<number[]>([]);
  const [currencyRateData, setCurrencyRateData] = useState<any>();
  const [isValueReducing, setIsValueReducing] = useState<boolean>();

  const arrayMax = (arr: number[]) => {
    if (arr.length > 0) {
      return arr.reduce(function (p, v) {
        return p > v ? p : v;
      });
    }
    return 0;
  };

  const getChartData = async () => {
    const responeData = await walletService.getCurrenciesHistoricalExchangeRate(
      filterExchangeRateOptions[1].date,
      currency.code,
      'PHP',
      1,
      maxLengthExchangeRateHistory
    );
    if (responeData.data.length > 0) {
      // const rates = responeData.data.reverse().map((d: any) => d.exchangeRate);
      const rates = responeData.data.map((d: any) => d.exchangeRate);
      setExchangeRateHistory(rates);
    }
  };

  const getCurrencyData = async () => {
    const responeData = await walletService.getCurrenciesExchangeRate(
      1,
      10,
      'PHP',
      currency.code,
      true,
      'DAY',
      7
    );
    if (responeData.data.length > 0) {
      setCurrencyRateData(responeData.data[0]);
    }
  };

  useEffect(() => {
    getChartData();
    getCurrencyData();
  }, []);

  useEffect(() => {
    if (currencyRateData) {
      setIsValueReducing(currencyRateData.percentageChange < 0 ? true : false);
    }
  }, [currencyRateData]);

  const onSelectItem = () => {
    onSelect && onSelect(currency);
  };

  const max = arrayMax(exchangeRateHistory);

  const dataLine = exchangeRateHistory.map((n) => (n / max) * 100);

  const reducingColor = '#EB001B';
  const rasingColor = '#6CBE58';

  return (
    <TouchableOpacity
      onPress={onSelectItem}
      key={currency.code}
      style={[styles.row, { marginTop: 15 }]}
    >
      <View style={[styles.row, { height: '100%' }]}>
        <Image
          source={{
            uri: currency.logo,
          }}
          style={styles.image}
        />
        <View style={styles.rowInfo}>
          <Text>{currency.code}</Text>
          <Text>{currency.name}</Text>
        </View>
      </View>
      <View style={styles.rowSubInfo}>
        <View style={{ width: 100 }}>
          <LineChart
            style={{ height: 55 }}
            data={dataLine}
            svg={{ stroke: isValueReducing ? reducingColor : rasingColor }}
            contentInset={{ top: 14, bottom: 14 }}
          />
        </View>
      </View>
      <View>
        <View style={[styles.rowInfo, { alignItems: 'flex-end' }]}>
          {currencyRateData && (
            <Text
              style={styles.rate}
            >{`${useCurrencyFormat(currencyRateData.exchangeRate, 'PHP')}`}</Text>
          )}
          {currencyRateData && (
            <Text
              style={[
                styles.diff,
                { color: isValueReducing ? reducingColor : rasingColor },
              ]}
            >
              {`${isValueReducing ? currencyRateData.percentageChange : `+${currencyRateData.percentageChange}`}%`}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const useMergeStyles = (style?: RowCurrencyStyle): RowCurrencyStyle => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center' },
    image: { width: 43, height: 43 },
    rowInfo: {
      flexDirection: 'column',
      marginLeft: 10,
      height: 43,
      justifyContent: 'space-between',
    },
    rowSubInfo: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    rate: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: '#020000',
    },
    diff: {
      fontFamily: fonts.regular,
      fontSize: 10,
    },
    reducingStyle: {
      color: '#EB001B',
    },
    rasingStyle: {
      color: '#2E7D32',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default RowCurrency;
