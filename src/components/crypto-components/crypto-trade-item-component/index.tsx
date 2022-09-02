import React, { useEffect, useState } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import useMergeStyles from './styles';
import { Button, useCurrencyFormat } from 'react-native-theme-component';
import { LineChart } from 'react-native-gifted-charts';
import { Currency, CurrencyExchangeRateData } from '../../../model';
import { WalletService } from '../../../services/wallet-service';
import {
  filterExchangeRateOptions,
  maxLengthExchangeRateHistory,
} from '../../../constants/common';
import moment from 'moment';

export type CryptoTradeComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type CryptoTradeComponentProps = {
  currency: Currency;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: CryptoTradeComponentStyles;
  isEmpty?: boolean;
  onClick?: (data: any) => void;
  isList?: boolean;
};

export type FilterExchangeRateOption = {
  id: string;
  label: string;
  date: string;
  unit?: string;
  offset?: number;
};

export type ChartDataItem = {
  value: number;
  date: string;
  label: string;
  labelComponent: Function;
};

const walletService = WalletService.instance();
const screenWidth = Dimensions.get('screen').width;

const CryptoTradeComponent = (props: CryptoTradeComponentProps) => {
  const { style, currency, onClick } = props;
  const styles = useMergeStyles(style);
  const [selectedFilterOptionsIndex, setSelectedFilterOptionsIndex] =
    useState<number>(0);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [currencyRateChange, setCurrencyRateChange] = useState<string>();
  const [maxExchangeRate, setMaxExchangeRate] = useState<number>();
  const [currentExchangeRate, setCurrentExchangeRate] = useState<number>(0);
  const [currentExchangeRateDate, setCurrentExchangeRateDate] = useState<string>();
  const [selectedExchangeValue, setSelectedExchangeValue] =
    useState<ChartDataItem>();

  const isValueReducing = currencyRateChange && currencyRateChange.toString()[0] === '-';
  const currentExchangeRateShowing = useCurrencyFormat(currentExchangeRate, 'PHP')
  const [exchangeRateHistory, setExchangeRateHistory] = useState<number[]>([]);


  const reducingColor = '#EB001B';
  const rasingColor = '#6CBE58';

  const selectedExchangeValueFormated = selectedExchangeValue
    ? useCurrencyFormat(selectedExchangeValue.value, 'PHP')
    : '';


  const getCurrencyExchangeRateData = async (selectedOptionIndex: number) => {
    if(filterExchangeRateOptions[selectedOptionIndex]) {
      const responeData = await walletService.getCurrenciesExchangeRate(
        1,
        10,
        'PHP',
        currency.code,
        true,
        filterExchangeRateOptions[selectedOptionIndex].unit,
        filterExchangeRateOptions[selectedOptionIndex].offset
      );
      if (responeData.data.length > 0) {
        setCurrencyRateChange(`${responeData.data[0].percentageChange}%`);
        setCurrentExchangeRate(responeData.data[0].exchangeRate);
        setCurrentExchangeRateDate(responeData.data[0].updatedAt);
        const rates = responeData.data.map((d: any) => d.exchangeRate);
        setExchangeRateHistory(rates);

      }
    }
  };

  useEffect(() => {
    getChartData(0);
    getCurrencyExchangeRateData(0);
  }, []);

  const getChartData = async (selectedOptionIndex: number) => {
    const responeData = await walletService.getCurrenciesHistoricalExchangeRate(
      filterExchangeRateOptions[selectedOptionIndex].date,
      currency.code,
      'PHP',
      1,
      maxLengthExchangeRateHistory
    );
    if (responeData.data.length > 0) {
      const showingData =
        selectedOptionIndex > 2
          ? responeData.data.filter(
              (_: any, index: number) => index % (selectedOptionIndex + 1) === 0
            )
          : responeData.data;
      // const reverseData = showingData.reverse();
      const reverseData = showingData;
      // let maxExchangeRate = reverseData[0].exchangeRate;
      let maxExchangeRate =  Math.max(...reverseData.map(o => o.exchangeRate))
      let minExchangeRate =  Math.min(...reverseData.map(o => o.exchangeRate))
      let dataDif = maxExchangeRate - minExchangeRate;
      const chartData: ChartDataItem[] = reverseData.map(
        (e: CurrencyExchangeRateData) => {
          // if (e.exchangeRate > maxExchangeRate) {
          //   maxExchangeRate = e.exchangeRate;
          // }

          if (selectedOptionIndex > 1) {
            return {
              value: e.exchangeRate,
              date: e.updatedAt,
            };
          }

          return {
            value: (e.exchangeRate),
            date: e.updatedAt,
            labelTextStyle: { color: '#7F7B82', fontSize: 10, marginLeft: 10 },
            label: moment(e.updatedAt).format('DD/MM'),
          };
        }
      );
      setMaxExchangeRate(maxExchangeRate);
      setChartData(chartData);
      setSelectedFilterOptionsIndex(selectedOptionIndex);
    }
  };

  const arrayMax = (arr: number[]) => {
    if (arr.length > 0) {
      return arr.reduce(function (p, v) {
        return p > v ? p : v;
      });
    }
    return 0;
  };

  const max = arrayMax(exchangeRateHistory);

  const dataLine = exchangeRateHistory.map((n) => (n / max) * 100);
  console.log('chartData ',chartData);


  return (
    <View style={styles.containerStyle}>
      <ScrollView
        style={styles.containerWrapperStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.rowSpaceBetween}>
          <View style={styles.rowCurrency}>
            <Text
              style={styles.title}
            >{`${currency.name} (${currency.code})`}</Text>
          </View>
          <Image source={{ uri: currency.logo }} style={styles.image} />
        </View>

        <View style={styles.rowCurrency}>
          <Text style={styles.subTitle}>{`As of ${currentExchangeRateDate}`}</Text>
        </View>
        <View style={styles.headerWrapper}>
          <Text
            style={styles.exchangePrecentage}
          >{`1 ${currency.code} ≈ ${currentExchangeRateShowing}`}</Text>
          <Text
            style={
              isValueReducing
                ? styles.nagativeExchangeRate
                : styles.exchangeRate
            }
          >
            {isValueReducing ? currencyRateChange : `+${currencyRateChange}`}
          </Text>
        </View>
        <View style={styles.rowWrapper}>
          {filterExchangeRateOptions.map((opt, index) => (
            <TouchableOpacity
              onPress={() => {
                getChartData(index);
                getCurrencyExchangeRateData(index);
              }}
              style={
                selectedFilterOptionsIndex === index
                  ? styles.chartActiveButton
                  : styles.chartInaActiveButton
              }
            >
              <Text style={styles.chartButtonText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.headerWrapper}>
          {selectedExchangeValue && (
            <Text
              style={styles.exchangePrecentage}
            >{`${selectedExchangeValueFormated}`}</Text>
          )}
          {selectedExchangeValue && (
            <Text style={styles.subTitle}>{`As of ${moment(
              selectedExchangeValue.date
            ).locale('en').format(
              selectedFilterOptionsIndex > 1
                ? 'YYYY-MM-DD'
                : 'ddd DD, YYYY HH:ssA'
            )}`}</Text>
          )}
        </View>

        <LineChart
          areaChart
          data={chartData}
          width={screenWidth - 60}
          adjustToWidth
          hideDataPoints
          color={isValueReducing ? reducingColor : rasingColor}
          startFillColor={isValueReducing ? reducingColor : rasingColor}
          endFillColor={isValueReducing ? reducingColor : rasingColor}
          startOpacity={0.9}
          endOpacity={0.1}
          initialSpacing={20}
          noOfSections={5}
          yAxisColor="#DDD9E4"
          yAxisThickness={1}
          rulesType="solid"
          yAxisSide="right"
          hideYAxisText={true}
          showVerticalLines={true}
          xAxisColor="#DDD9E4"
          showStripOnPress={true}
          maxValue={maxExchangeRate ? maxExchangeRate * 1.3 : 0}
          pointerConfig={{
            pointerStripColor: '#000000',
            pointerStripWidth: 2,
            pointerStripUptoDataPoint: true,
            pointerComponent: () => <View style={styles.pointer} />,
            pointerLabelComponent: (items: [ChartDataItem]) => {
              setSelectedExchangeValue(items[0]);
              return <View />;
            },
          }}
          // yAxisOffset={117500}
        />
        {/*
        <View style={styles.rowCurrency}>
          <Text style={styles.title2}>{`My Assets`}</Text>
        </View>
        <View style={styles.headerWrapper}>
          <Text style={styles.message}>{`1 BTC ≈ ₱ 2,444,810.00`}</Text>
          <Text style={styles.message}>{`+6.33% from yesterday`}</Text>
        </View> */}
        <View style={styles.rowAbout}>
          <Text style={styles.title2}>{`About ${currency.name}`}</Text>
        </View>
        <View style={styles.headerWrapper}>
          <Text style={styles.message2}>{currency.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footerContainerStyle}>
        <View style={styles.footerButtonWrapper}>
          <Button
            onPress={() => {
              onClick && onClick({ type: 'Buy', item: currency,currentExchangeRateShowing });
            }}
            // label={
            //   i18n?.t("customer_invoke_component.lbl_continue") ??
            //   "Continue"
            // }
            label={'Buy'}
          />
        </View>
        <View style={styles.footerButtonWrapper}>
          <Button
            onPress={() => {
              onClick && onClick({ type: 'Sell', item: currency,currentExchangeRateShowing  });
            }}
            label={'Sell'}
          />
        </View>
      </View>
    </View>
  );
};

export default CryptoTradeComponent;
