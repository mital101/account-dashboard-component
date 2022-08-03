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
import { Button } from 'react-native-theme-component';
import { LineChart } from 'react-native-gifted-charts';
import { Currency, CurrencyExchangeRateData } from '../../../model';
import { WalletService } from '../../../services/wallet-service';
import { filterExchangeRateOptions } from '../../../constants/common';
import moment from 'moment';

export type CryptoTradeComponentThemeProps = {
  style?: CryptoTradeComponentThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type CryptoTradeComponentThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type CryptoTradeComponentProps = {
  currency: Currency;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: CryptoTradeComponentThemeStyles;
  isEmpty?: boolean;
  onClick?: (data: any) => void;
  isList?: boolean;
};

export type FilterExchangeRateOption = {
  id: string;
  label: string;
  date: string;
};

export type ChartDataItem = {
  value: number;
  date: string;
  label: string;
};

const walletService = WalletService.instance();
const screenWidth = Dimensions.get('screen').width;

const CryptoTradeComponent = (props: CryptoTradeComponentProps) => {
  const { style, currency, onClick } = props;
  const styles = useMergeStyles(style);
  const [selectedFilterOptionsIndex, setSelectedFilterOptionsIndex] =
    useState<number>(0);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [maxExchangeRate, setMaxExchangeRate] = useState<number>();
  const [selectedExchangeValue, setSelectedExchangeValue] =
    useState<ChartDataItem>();
  const firstExchangeRate =
    chartData && chartData.length > 0 ? chartData[0].value : 0;
  const lastExchangeRate =
    chartData && chartData.length > 0
      ? chartData[chartData.length - 1].value
      : 0;
  const lastExchangeDate =
    chartData && chartData.length > 0
      ? moment(chartData[chartData.length - 1].date).format(
          'ddd DD, YYYY HH:ssA'
        )
      : '';

  let diffRateLabel: string = '';

  const isValueReducing = firstExchangeRate > lastExchangeRate;

  if (isValueReducing) {
    diffRateLabel = `-${
      (firstExchangeRate - lastExchangeRate) / firstExchangeRate
    }%`;
  } else {
    diffRateLabel = `+${
      (lastExchangeRate - firstExchangeRate) / lastExchangeRate
    }%`;
  }

  const reducingColor = '#EB001B';
  const rasingColor = '#6CBE58';

  const getCurrencyExchangeData = async () => {
    const responeData = await walletService.getCurrenciesHistoricalExchangeRate(
      filterExchangeRateOptions[selectedFilterOptionsIndex].date,
      currency.code,
      'PHP',
      1,
      100
    );
    if (responeData.data.length > 0) {
      let maxExchangeRate = responeData.data[0].exchangeRate;
      const chartData: ChartDataItem[] = responeData.data.map(
        (e: CurrencyExchangeRateData) => {
          if (e.exchangeRate > maxExchangeRate) {
            maxExchangeRate = e.exchangeRate;
          }
          return {
            value: e.exchangeRate,
            date: e.updatedAt,
            labelTextStyle: { color: '#7F7B82', fontSize: 10, marginLeft: 10 },
            label: moment(e.updatedAt).format('DD/MM'),
          };
        }
      );
      setMaxExchangeRate(maxExchangeRate);
      setChartData(chartData);
    }
  };

  useEffect(() => {
    getCurrencyExchangeData();
  }, [selectedFilterOptionsIndex]);

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
          <Text style={styles.subTitle}>{`As of ${lastExchangeDate}`}</Text>
        </View>
        <View style={styles.headerWrapper}>
          <Text
            style={styles.exchangePrecentage}
          >{`1 ${currency.code} ≈ ₱ ${lastExchangeRate}`}</Text>
          <Text
            style={
              isValueReducing
                ? styles.nagativeExchangeRate
                : styles.exchangeRate
            }
          >
            {diffRateLabel}
          </Text>
        </View>
        <View style={styles.rowWrapper}>
          {filterExchangeRateOptions.map((opt, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedFilterOptionsIndex(index);
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
            >{`₱ ${selectedExchangeValue.value}`}</Text>
          )}
          {selectedExchangeValue && (
            <Text style={styles.subTitle}>{`As of ${moment(
              selectedExchangeValue.date
            ).format('ddd DD, YYYY HH:ssA')}`}</Text>
          )}
        </View>

        <LineChart
          areaChart
          data={chartData}
          width={screenWidth - 60}
          adjustToWidth
          hideDataPoints
          color={isValueReducing ? reducingColor : rasingColor}
          thickness={2}
          startFillColor={isValueReducing ? reducingColor : rasingColor}
          endFillColor={isValueReducing ? reducingColor : rasingColor}
          startOpacity={0.9}
          endOpacity={0.1}
          initialSpacing={20}
          noOfSections={5}
          maxValue={maxExchangeRate}
          yAxisColor="#DDD9E4"
          yAxisThickness={1}
          rulesType="solid"
          yAxisSide="right"
          hideYAxisText={true}
          showVerticalLines
          xAxisColor="#DDD9E4"
          showStripOnPress={true}
          pointerConfig={{
            pointerStripColor: '#000000',
            pointerStripWidth: 2,
            pointerStripUptoDataPoint: true,
            pointerComponent: () => <View style={styles.pointer} />,
            pointerLabelComponent: (items: [ChartDataItem]) => {
              console.log('pointerLabelComponent -> items', items);
              setSelectedExchangeValue(items[0]);
              return <View />;
            },
          }}
        />
        {/* 
        <View style={styles.rowCurrency}>
          <Text style={styles.title2}>{`My Assets`}</Text>
        </View>
        <View style={styles.headerWrapper}>
          <Text style={styles.message}>{`1 BTC ≈ ₱ 2,444,810.00`}</Text>
          <Text style={styles.message}>{`+6.33% from yesterday`}</Text>
        </View> */}
        <View style={styles.rowCurrency}>
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
              onClick({ type: 'Buy', item: chartData });
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
              onClick({ type: 'Sell', item: chartData });
            }}
            label={'Sell'}
          />
        </View>
      </View>
    </View>
  );
};

export default CryptoTradeComponent;
