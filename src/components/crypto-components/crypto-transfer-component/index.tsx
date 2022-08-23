import { CryptoTransferComponentProps } from './types';
import React, { useContext, useEffect, useState } from 'react';
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
import { ArrowRightIcon, InformationIcon } from '../../../assets/images';
import { WalletService } from '../../../services/wallet-service';
import { WalletContext } from '../../../context/wallet-context';

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

const walletService = WalletService.instance();

const CryptoTransferInComponent = ({
  props,
  style,
}: CryptoTransferComponentProps) => {
  const { onSelectCrypto, onTransferPHP, goToAccountLimit, setVisibleCurrentBalance } = props || {};
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [transferValue, setTransferValue] = useState<number>(0);
  const [selectedCrypto, setSelectedCrypto] = React.useState<string>();
  const [isLoadingValidation, setIsLoadingValidation] =
    useState<boolean>(false);
  const { walletLimits, setAmountCryptoIn, unionWallet, cryptoWallet, currentTransfer } =
    useContext(WalletContext);
  const isTransferIn = currentTransfer === 'moneyin'; 
  const currentAvailableBalance = useCurrencyFormat(
    (isTransferIn ? unionWallet?.availableBalance : cryptoWallet?.availableBalance) || 0,
    'PHP'
  );
  const transferValueFormated =
    transferValue > 0 ? useCurrencyFormat(transferValue, '', '') : '';

  const dailyLimit = walletLimits ? walletLimits.find(l => l.frequence === 'Daily') : null;
  const limitValueFormated = dailyLimit ? useCurrencyFormat(dailyLimit.limitValue, 'PHP') : 0; 
  const limitRemainingValueFormated = dailyLimit ? useCurrencyFormat(dailyLimit.remainingLimitValue, 'PHP') : 0; 
  const percentRemainning = dailyLimit ? (1 - (dailyLimit.remainingLimitValue / dailyLimit.limitValue)) * 100 : 0;
  
  const styles = useMergeStyles(style);

  const minimumError = transferValueFormated.length > 0 && transferValue < 200;
  const maximumError = transferValueFormated.length > 0 && transferValue > 100000;

  const higherCurrentBalanceError =
    transferValue > ((isTransferIn ? unionWallet?.currentBalance : cryptoWallet?.currentBalance) || 0);
  const isOverDailyLimitError = dailyLimit ? transferValue > dailyLimit?.remainingLimitValue : false;
  const isReachDailyLimitError = dailyLimit ? dailyLimit?.remainingLimitValue === 0 : false;
  const isInputValid = !minimumError && !maximumError && !higherCurrentBalanceError && !isOverDailyLimitError && !isReachDailyLimitError;
 
  const isValidToSubmit =
    selectedTabIndex === 0
      ? transferValue > 0 && isInputValid
      : !!selectedCrypto;

  useEffect(() => {
    setVisibleCurrentBalance && setVisibleCurrentBalance(selectedTabIndex === 0)
  }, [selectedTabIndex]);

  const renderTabbar = (title: string, indexTabbar: number) => (
    <TouchableOpacity
      style={[
        styles.headerView,
        indexTabbar === selectedTabIndex && styles.headerSelectedBg,
      ]}
      onPress={() => setSelectedTabIndex(indexTabbar)}
    >
      <Text style={styles.headerTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const onInputValue = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key !== 'Backspace') {
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
              isInputValid && styles.paddingBottomView,
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
            {!isInputValid && (
              <View style={styles.errorRow}>
                <Text style={styles.errorText}>
                  {isOverDailyLimitError ? 'The amount you entered exceeded your the daily limit of P100,000.00.' : maximumError ? 'The maximum amount that you’re allowed to transfer-in is ₱100,000.00' : minimumError
                    ? `The minimum amount that you’re allowed to transfer-in is ₱200.0`
                    : higherCurrentBalanceError
                    ? 'You have insufficient balance in your Pitaka.'
                    : 
                    isReachDailyLimitError ? 'You have reached your daily limit of P100,000.00. Please wait for the following day to transact again.' 
                    : 'Invalid amount'}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.currentBalanceWrapper}>
            <View style={styles.rowInput}>
              <Text style={styles.balanceTitle}>{isTransferIn ? 'My Pitaka Balance: ' : 'Available balance: '}</Text>
              <Text style={styles.smallBalanceLabel}>
                {currentAvailableBalance}
              </Text>
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
        {dailyLimit && <View style={styles.dailyLimit}>
          <View style={styles.rowBetween}>
            <Text style={styles.dailyLimitLabel}>
              {`Daily Limit (${limitValueFormated})`}
            </Text>
            <TouchableOpacity style={styles.row} onPress={goToAccountLimit}>
              <Text style={styles.aboutLimitLabel}>About Limit</Text>
              <ArrowRightIcon width={13} height={13} color={'#F8981D'} />
            </TouchableOpacity>
          </View>
          <ProcessBar processPercent={percentRemainning} />
          <View style={styles.remainingWrapper}>
            <Text style={styles.remainLabel}>{`${limitRemainingValueFormated} remaining`}</Text>
          </View>
        </View>}
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

  const handleOnTransferPHP = async () => {
    setIsLoadingValidation(true);
    if (unionWallet && cryptoWallet) {
      const result = isTransferIn ? await walletService.moneyInValidation(
        transferValue,
        unionWallet?.bankAccount.accountNumber,
        cryptoWallet?.bankAccount.accountNumber
      ) : await walletService.moneyOutValidation(
        transferValue,
        cryptoWallet?.bankAccount.accountNumber,
        unionWallet?.bankAccount.accountNumber,
      );

      if (result.Data) {
        setAmountCryptoIn(transferValue);
        setTransferValue(0);
        onTransferPHP && onTransferPHP();
      }
    }
    setIsLoadingValidation(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>{isTransferIn ? 'Transfer-in' : 'Transfer-out'}</Text>
        <View style={styles.pageSubTitleSection}>
          <Text style={styles.pageSubTitle}>{isTransferIn ? 'Add PHP or deposit crypto in your crypto pitaka' : 'Securely withdraw PHP from your crypto pitaka or transfer crypto to other wallets.'}</Text>
        </View>
        <View style={styles.tabbar}>
          <View style={styles.headerWrapper}>
            {renderTabbar('PHP', 0)}
            {renderTabbar('Crypto', 1)}
          </View>
          <View style={styles.content}>
            {selectedTabIndex === 0
              ? renderPHPContent()
              : renderCryptoContent()}
          </View>
        </View>
      </ScrollView>
      <View style={styles.actionWrapper}>
        <Button
          isLoading={isLoadingValidation}
          label={selectedTabIndex === 0 ? 'Transfer-in PHP' : 'Select'}
          onPress={
            selectedTabIndex === 0 ? handleOnTransferPHP : onSelectCrypto
          }
          disabled={!isValidToSubmit}
          disableColor={'#EAEAEB'}
        />
      </View>
    </SafeAreaView>
  );
};

export default CryptoTransferInComponent;
