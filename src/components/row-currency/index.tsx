import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  Image,
} from 'react-native';
import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { ThemeContext } from 'react-native-theme-component';
import { CurrencyExchangeRateData } from '@banking-component/wallet-component/src/model';
import { LineChart } from 'react-native-svg-charts';

export type RowCurrencyProps = {
  currency: CurrencyExchangeRateData;
  style?: RowCurrencyStyle;
  onSelect?: (id: string) => void;
};

export type RowCurrencyStyle = {
  row?: StyleProp<ViewStyle>;
  rowInfo?: StyleProp<ViewStyle>;
  rowSubInfo?: StyleProp<ViewStyle>;
  image?: StyleProp<ImageStyle>;
};

const RowCurrency = ({ onSelect, currency, style }: RowCurrencyProps) => {
  const styles = useMergeStyles(style);

  const data = [
    { x: 1453593600, y: 2.1 },
    { x: 1453680000, y: 2.5 },
    { x: 1453766400, y: 2.3 },
    { x: 1453852800, y: 2.42 },
    { x: 1453939200, y: 2.55 },
    { x: 1454025600, y: 2.41 },
    { x: 1454112000, y: 2.43 },
    { x: 1454198400, y: 2.2 },
  ];

  const arrayMin = (arr: number[]) => {
    return arr.reduce(function (p, v) {
      return p < v ? p : v;
    });
  };

  const arrayMax = (arr: number[]) => {
    return arr.reduce(function (p, v) {
      return p > v ? p : v;
    });
  };

  const onSelectItem = () => {
    onSelect && onSelect(currency.id);
  };

  const randomCryptoImgUrl =
    'https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_960_720.png';

  const dataValue = [
    2.456, 1.2, 1.5, 1.7, 1.8, 1.9, 2.3, 2.02, 2.456, 2.556, 2.6556, 2.556,
    2.6556, 2.556, 2.006, 1.2, 1.5, 1.7, 1.8, 1.9, 2.3, 2.02, 2.456, 2.556,
    2.6556, 2.556, 2.006, 1.2, 1.5, 1.7, 1.8, 1.9, 2.3, 2.0,
  ];
  const max = arrayMax(dataValue);

  const dataLine = dataValue.map((n) => (n / max) * 100);

  return (
    <TouchableOpacity
      onPress={onSelectItem}
      key={currency.id}
      style={[styles.row, { marginTop: 15 }]}
    >
      <View style={[styles.row, { height: '100%' }]}>
        <Image
          source={{
            uri: currency.fromCurrency.symbolGraphic.replace('sgv', 'png'),
          }}
          style={styles.image}
        />
        <View style={styles.rowInfo}>
          <Text>{currency.fromCurrency.code}</Text>
          <Text>{currency.fromCurrency.name}</Text>
        </View>
      </View>
      <View style={styles.rowSubInfo}>
        <View style={{ width: 100 }}>
          <LineChart
            style={{ height: 70 }}
            data={dataLine}
            svg={{ stroke: 'red' }}
            contentInset={{ top: 15, bottom: 15 }}
          />
        </View>
      </View>
      <View>
        <View style={styles.rowInfo}>
          <Text>{`₱${currency.exchangeRate}`}</Text>
          <Text>{`₱${currency.exchangeRate}`}</Text>
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
  });
  return defaultsDeep(style, defaultStyles);
};

export default RowCurrency;
