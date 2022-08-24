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
    diffRateLabel = `-${(
      ((firstExchangeRate - lastExchangeRate) / firstExchangeRate) *
      100
    ).toFixed(2)}%`;
  } else {
    diffRateLabel = `+${(
      ((lastExchangeRate - firstExchangeRate) / lastExchangeRate) *
      100
    ).toFixed(2)}%`;
  }

  const reducingColor = '#EB001B';
  const rasingColor = '#6CBE58';

  const selectedExchangeValueFormated = selectedExchangeValue
    ? useCurrencyFormat(selectedExchangeValue.value, 'PHP')
    : '';

  useEffect(() => {
    getCurrencyExchangeData(0);
  }, []);

  const getCurrencyExchangeData = async (selectedOptionIndex: number) => {
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
      const reverseData = showingData.reverse();
      let maxExchangeRate = reverseData[0].exchangeRate;
      const chartData: ChartDataItem[] = reverseData.map(
        (e: CurrencyExchangeRateData) => {
          if (e.exchangeRate > maxExchangeRate) {
            maxExchangeRate = e.exchangeRate;
          }

          if (selectedOptionIndex > 1) {
            return {
              value: e.exchangeRate,
              date: e.updatedAt,
            };
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
      setSelectedFilterOptionsIndex(selectedOptionIndex);
    }
  };

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
                getCurrencyExchangeData(index);
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
            ).format(
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
          noOfSections={selectedFilterOptionsIndex + 2}
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
              onClick && onClick({ type: 'Buy', item: chartData });
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
              onClick && onClick({ type: 'Sell', item: chartData });
            }}
            label={'Sell'}
          />
        </View>
      </View>
    </View>
  );
};

export default CryptoTradeComponent;
