import { CryptoTransferInComponentProps } from './types';
import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { CryptoItem } from './types';
import useMergeStyles from './styles';
import {
  RadioButtonItem,
  RadioButtonGroup,
  Button,
  ProcessBar,
  useCurrencyFormat,
} from 'react-native-theme-component';
import { InformationIcon } from '../../../assets/information2.icon';
import { ArrowRightIcon } from '../../../assets/arrow-right.icon';

const randomCryptoImgUrl =
  'https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_960_720.png';

const cryptoDummyData: CryptoItem[] = [
  {
    id: '1',
    imageUrl: randomCryptoImgUrl,
    shortName: 'BTC',
    currentValue: '0.00628167',
    fullName: 'Bitcoin',
    rate: '≈ ₱ 9,591.54',
  },
  {
    id: '2',
    imageUrl: randomCryptoImgUrl,
    shortName: 'ETH',
    currentValue: '0.014716',
    fullName: 'Ethereum',
    rate: '≈ ₱ 1,515.16',
  },
  {
    id: '3',
    imageUrl: randomCryptoImgUrl,
    shortName: 'USDC',
    currentValue: '9.73469',
    fullName: 'USD Coin',
    rate: '≈ ₱ 510.00',
  },
  {
    id: '4',
    imageUrl: randomCryptoImgUrl,
    shortName: 'SLP',
    currentValue: '1608.77699',
    fullName: 'Smooth Love Potion',
    rate: '≈ ₱ 510.00',
  },
  {
    id: '5',
    imageUrl: randomCryptoImgUrl,
    shortName: 'AXS',
    currentValue: '0.2198',
    fullName: 'Axie Infinity',
    rate: '≈ ₱ 264.33',
  },
  {
    id: '6',
    imageUrl: randomCryptoImgUrl,
    shortName: 'AXS',
    currentValue: '0.2198',
    fullName: 'Axie Infinity',
    rate: '≈ ₱ 264.33',
  },
  {
    id: '7',
    imageUrl: randomCryptoImgUrl,
    shortName: 'AXS',
    currentValue: '0.2198',
    fullName: 'Axie Infinity',
    rate: '≈ ₱ 264.33',
  },
  {
    id: '8',
    imageUrl: randomCryptoImgUrl,
    shortName: 'AXS',
    currentValue: '0.2198',
    fullName: 'Axie Infinity',
    rate: '≈ ₱ 264.33',
  },
];

const CryptoTransferInComponent = ({
  props,
  style,
}: CryptoTransferInComponentProps) => {
  const { onSelectCrypto, isError = true } = props || {};
  const styles = useMergeStyles(style);
  const [index, setIndex] = useState<number>(0);
  const [transferValue, setTransferValue] = useState<number>(0);
  const [selectedCrypto, setSelectedCrypto] = React.useState<string>();

  const transferValueFormated =
    transferValue > 0 ? useCurrencyFormat(transferValue, '', '') : '';

  const renderTabbar = (title: string, indexTabbar: number) => (
    <TouchableOpacity
      style={[
        styles.headerView,
        indexTabbar === index && styles.headerSelectedBg,
      ]}
      onPress={() => setIndex(indexTabbar)}
    >
      <Text style={styles.headerTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const onInputValue = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key !== 'Backspace') {
      console.log(
        transferValue,
        e.nativeEvent.key,
        parseInt(`${transferValue}${e.nativeEvent.key}`)
      );
      setTransferValue(parseInt(`${transferValue || ''}${e.nativeEvent.key}`));
    } else {
      setTransferValue(parseInt(`${transferValue || ''}`.slice(0, -1)));
    }
  };

  const renderPHPContent = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{'Transfer-in Amount'}</Text>
        <View style={styles.cardInputBalance}>
          <View
            style={[
              styles.inputBalanceWrapper,
              !isError && styles.paddingBottomView,
            ]}
          >
            <View style={styles.rowInput}>
              <Text style={styles.balanceLabel}>₱</Text>
              <TextInput
                value={transferValueFormated}
                onKeyPress={onInputValue}
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
              />
            </View>
            {isError && (
              <View style={styles.errorRow}>
                <Text style={styles.errorText}>
                  The minimum amount that you’re allowed to transfer-in is ₱1.00
                </Text>
              </View>
            )}
          </View>
          <View style={styles.currentBalanceWrapper}>
            <View style={styles.rowInput}>
              <Text style={styles.balanceTitle}>My Pitaka Balance: </Text>
              <Text style={styles.smallBalanceLabel}>₱ 36,000.75</Text>
            </View>
          </View>
        </View>
        <View style={styles.purchaseOptionView}>
          <TouchableOpacity style={styles.row} onPress={() => {}}>
            <InformationIcon size={12} color={'#4E4B50'} />
            <View style={styles.horizontalPadding} />
            <Text style={styles.labelPurchase}>
              Receive instantly. ₱ 0 transfer fee
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dailyLimit}>
          <View style={styles.rowBetween}>
            <Text style={styles.dailyLimitLabel}>
              Daily Limit (₱ 100,000.00)
            </Text>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.aboutLimitLabel}>About Limit</Text>
              <ArrowRightIcon width={15} height={15} color={'#F8981D'} />
            </TouchableOpacity>
          </View>
          <ProcessBar processPercent={50} />
          <View style={styles.remainingWrapper}>
            <Text style={styles.remainLabel}>₱ 100,000.00 remaining</Text>
          </View>
        </View>
      </View>
    );
  };

  const transferToRadioButtonItem = (data: CryptoItem[]): RadioButtonItem[] => {
    return data.map((item) => ({
      title: item.shortName,
      subTitle: item.fullName,
      imageUrl: item.imageUrl,
      rightTitle: item.currentValue,
      rightSubTitle: item.rate,
      value: item.id,
    }));
  };

  const renderCryptoContent = () => (
    <RadioButtonGroup
      data={transferToRadioButtonItem(cryptoDummyData)}
      onSelect={setSelectedCrypto}
      selectedValue={selectedCrypto}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>{'Transfer-in'}</Text>
        <View style={styles.tabbar}>
          <View style={styles.headerWrapper}>
            {renderTabbar('PHP', 0)}
            {renderTabbar('Crypto', 1)}
          </View>
          <View style={styles.content}>
            {index === 0 ? renderPHPContent() : renderCryptoContent()}
          </View>
        </View>
      </ScrollView>
      <View style={styles.actionWrapper}>
        <Button
          label="Select"
          onPress={onSelectCrypto}
          disabled={!selectedCrypto}
          disableColor={'#EAEAEB'}
        />
      </View>
    </SafeAreaView>
  );
};

export default CryptoTransferInComponent;
