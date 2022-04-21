import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TransactionListComponentProps } from '../../types';
import useMergeStyles from './styles';
import { WalletContext } from '../../context/wallet-context';
import { ThemeContext } from 'react-native-theme-component';
import WalletCarouselComponent from './wallet-carousel-component';
import PageIndicatorComponent from './page-indicator-component';
import TransactionPageComponent from './transaction-page-component';
import EmptyTransactionComponent from './no-transaction-component';
import { isEmpty } from 'lodash';
import EmptyWalletComponent from '../no-wallet-component';
import { Wallet } from '../../model';
const { width } = Dimensions.get('window');

const TransactionListComponent = (props: TransactionListComponentProps) => {
  const {
    Root,
    CarouselItem,
    Pagination,
    TransactionPage,
    EmptyTransaction,
    TransactionItem,
    EmptyWallet,
  } = props;
  const containerStyle = Root?.style;
  const _carouselItemWidth = CarouselItem?.props?.carouselItemWidth ?? width - 32;
  const _carouselWidth = CarouselItem?.props?.carouselWidth ?? width;

  const styles = useMergeStyles(containerStyle);

  // state
  const carouselRef: any = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>(undefined);

  //context data and function
  const {
    transactions,
    fetchTransactions,
    wallets,
    getAggregatedWallets,
    isLoadingWallets,
  } = useContext(WalletContext);
  const { colors, i18n } = useContext(ThemeContext);
  const [_initialWallet, setInitialWallet] = useState(Root?.props?.initWallet);
  const [_initIndex, setInitIndex] = useState<number | undefined>(undefined);
  const aggregatedWallets = getAggregatedWallets();

  useEffect(() => {
    setInitialWallet(Root?.props?.initWallet);
  }, [Root?.props]);

  useEffect(() => {
    if (_initialWallet && !isEmpty(aggregatedWallets)) {
      const initIndex =
        aggregatedWallets.findIndex((wallet) => wallet.walletId === _initialWallet.walletId) || 0;
      if (!_initIndex) {
        setTimeout(() => {
          changeToIndex(initIndex);
        }, 500);
        setInitIndex(initIndex);
      }
    }
  }, [aggregatedWallets, _initialWallet]);

  useEffect(() => {
    if (!isEmpty(wallets)) {
      changeToIndex(0);
    }
  }, [wallets]);

  useEffect(() => {
    if (!isEmpty(aggregatedWallets)) {
      let focusWallet = aggregatedWallets[currentIndex];
      const transactionIndex = transactions.findIndex(
        (ts) => ts.walletId === focusWallet?.walletId
      );
      if (focusWallet && transactionIndex === -1) {
        fetchTransactions(focusWallet.walletId, 1);
      }
      setCurrentWallet(focusWallet);
    }
  }, [currentIndex, wallets]);

  const changeToIndex = (index: number) => {
    setCurrentIndex(index);
    carouselRef?.current?.snapToItem(index);
  };

  if (isEmpty(wallets)) {
    if (isLoadingWallets) {
      return (
        <View style={styles.loadingWrap}>
          {Root?.components?.loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
        </View>
      );
    }
    return (
      <EmptyWalletComponent
        message={EmptyWallet?.props.message ?? i18n?.t('transaction_list_component.msg_no_wallet')}
        buttonLabel={
          EmptyWallet?.props.buttonLabel ??
          i18n?.t('transaction_list_component.btn_link_bank_account')
        }
        style={EmptyWallet?.style}
        {...EmptyWallet?.props}
        {...EmptyWallet?.components}
      />
    );
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.carouselWrap}>
        <Carousel
          removeClippedSubviews={false}
          ref={carouselRef}
          data={aggregatedWallets}
          keyExtractor={(item: Wallet) => item.walletId}
          extraData={aggregatedWallets}
          renderItem={({ item }: any) => {
            return (
              <WalletCarouselComponent
                style={CarouselItem?.style}
                wallet={item}
                {...CarouselItem?.props}
                {...CarouselItem?.components}
              />
            );
          }}
          sliderWidth={_carouselWidth}
          itemWidth={_carouselItemWidth}
          inactiveSlideScale={1}
          loop={false}
          activeSlideAlignment='start'
          layout='default'
          onSnapToItem={(index: number) => {
            if (_initialWallet) {
              setInitialWallet(undefined);
            }
            setCurrentIndex(index);
          }}
        />
      </View>
      <View style={styles.paginationWrap}>
        {aggregatedWallets.map((_: any, index: number) => (
          <PageIndicatorComponent
            key={index}
            isActive={currentIndex === index}
            style={Pagination?.style}
            {...Pagination?.props}
          />
        ))}
      </View>
      {currentWallet && (
        <TransactionPageComponent
          wallets={wallets}
          key={currentWallet.walletId}
          wallet={currentWallet}
          emptyPlaceholder={
            <EmptyTransactionComponent
              style={EmptyTransaction?.style}
              {...EmptyTransaction?.components}
            />
          }
          itemStyle={TransactionItem?.style}
          {...TransactionPage?.component}
          {...TransactionPage?.props}
        />
      )}
    </View>
  );
};

export default TransactionListComponent;
