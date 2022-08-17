import React, { ReactNode, useContext, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleProp,
  View,
  ViewStyle,
  ScrollView,
  Text,
  TextStyle,
  FlatList,
} from 'react-native';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';
import { AuthContext } from 'react-native-auth-component';

import {
  CryptoHelpLinkIcon,
  InfoIcon,
  PointerIcon,
  SeperateLineIcon,
} from '../../../assets/images';
import Tooltip, {
  TooltipChildrenContext,
} from 'react-native-walkthrough-tooltip';

import EmptyWalletComponent from '../no-crypto-wallet-component';
import CryptoItemComponent from '../crypto-item-component/index';
import AccountSummaryCard from '../../crypto-components/crypto-account-summary-card';
import BreakdownSummaryCard from '../../crypto-components/crypto-breakdown-card';
import MyCryptoCard from '../../crypto-components/my-crypto-card';

import MarketPricesComponent from '../../market-price-component';
import { Wallet, Transaction } from '../../../model';
import { WalletItemComponentStyle } from '../../wallet-card-component/wallet-item-component';
import { TransactionCardComponentStyles } from '../../wallet-card-component/transaction-card-component';
import CryptoTransactionsCardComponent from '../crypto-transaction-card';
import { WalletContext } from '../../../context/wallet-context';

export type CryptoAccountComponentProps = {
  style?: CryptoAccountComponentStyles;
  dateFormat?: string;
  carouselWidth?: number;
  phoneNumber: string;
  carouselItemWidth?: number;
  loadingIndicator?: ReactNode;
  onAddMoney: (wallet: Wallet) => void;
  onSendMoney: (wallet: Wallet) => void;
  onViewAllTransactions: () => void;
  onTransactionDetails: (transaction: Transaction) => void;
  onLinkAccount: () => void;
  onViewAccount: () => void;
  children?: ReactNode;
  isActive?: boolean;
  onClickMyCrypto: () => void;
  onSelectCryptoTransaction: (transaction: Transaction) => void;
  userId: string;
};

export type CryptoAccountComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  containerWrapper?: StyleProp<ViewStyle>;
  carouselContainerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  walletItemComponentStyle?: WalletItemComponentStyle;
  transactionCardComponentStyle?: TransactionCardComponentStyles;
  pointerView?: StyleProp<ViewStyle>;
  pointerText?: StyleProp<TextStyle>;
  skipView?: StyleProp<ViewStyle>;
  skipBtn?: StyleProp<ViewStyle>;
  skipText?: StyleProp<TextStyle>;
  column?: StyleProp<ViewStyle>;
  marginHorizontalView?: StyleProp<ViewStyle>;
  titleTooltip?: StyleProp<TextStyle>;
  viewTooltip?: StyleProp<ViewStyle>;
  viewTooltipHeader?: StyleProp<ViewStyle>;
  emptyCarouselContainerStyle?: StyleProp<ViewStyle>;
  recentTransactionSection?: StyleProp<ViewStyle>;
  recentTransactionWrapper?: StyleProp<ViewStyle>;
  row?: StyleProp<ViewStyle>;
  tilteSection?: StyleProp<TextStyle>;
  emptyTransactionContainer?: StyleProp<ViewStyle>;
  emptyTransactionTitle?: StyleProp<TextStyle>;
  viewAll?: StyleProp<TextStyle>;
};

const CryptoAccountComponent = ({
  style,
  carouselItemWidth,
  carouselWidth,
  loadingIndicator,
  onAddMoney,
  onSendMoney,
  onLinkAccount,
  phoneNumber,
  onViewAllTransactions,
  dateFormat,
  onTransactionDetails,
  onViewAccount,
  children,
  isActive,
  onClickMyCrypto,
  onSelectCryptoTransaction,
  userId,
}: CryptoAccountComponentProps) => {
  const { colors, i18n } = useContext(ThemeContext);

  const styles: CryptoAccountComponentStyles = useMergeStyles(style);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [showTransferTips, setTransferTips] = useState<boolean>(false);
  const [showHelpTips, setHelpTips] = useState<boolean>(false);
  const [showSliderTips, setSliderTips] = useState<boolean>(false);

  const [ref, setRef] = useState(null);

  const { profile } = useContext(AuthContext);
  const {
    getCryptoTransactions,
    cryptoTransactions,
    isLoadingGetCryptoTransactions,
  } = useContext(WalletContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const { walletsById, getFinancialProfile, financialProfile } =
    useContext(WalletContext);
  const [cryptoWallet, getCryptoWallet] = useState<any>([]);

  useEffect(() => {
    if (userId) {
      console.log('userId ', userId);

      getFinancialProfile(userId, 'PDAX');
    }
  }, []);

  useEffect(() => {
    if (walletsById) {
      let filteredArray = walletsById.find((item) => item.status === 'ACTIVE');
      getCryptoWallet(filteredArray);
    }
  }, [walletsById]);

  useEffect(() => {
    getCryptoTransactions();
  }, []);

  return (
    <View style={styles.containerStyle}>
      <ScrollView
        style={styles.containerWrapper}
        showsVerticalScrollIndicator={false}
        ref={(ref) => {
          setRef(ref);
        }}
      >
        <Text
          onPress={() => {
            setIsEmpty(!isEmpty);
          }}
          style={styles.userName}
        >{`My Crypto Pitaka`}</Text>
        {/*(
            <EmptyWalletComponent
              onLinkAccountPressed={() => {
                onLinkAccount();
              }}
              onLayout={() => {
                //onLayout()
              }}
            />
          )*/}
        <AccountSummaryCard
          onClickHide={() => {
            setIsVisible(!isVisible);
          }}
          isProtected={isVisible}
          walletData={cryptoWallet}
          financialProfile={financialProfile}
          isEmpty={isEmpty}
        />

        <BreakdownSummaryCard
          isProtected={isVisible}
          walletData={cryptoWallet}
          isEmpty={isEmpty}
          financialProfile={financialProfile}
        />

        <MyCryptoCard
          ViewAll={() => {
            onClickMyCrypto();
          }}
          isProtected={isVisible}
          walletData={cryptoWallet}
          isEmpty={isEmpty}
        />

        <View style={styles.recentTransactionSection}>
          <View style={styles.recentTransactionWrapper}>
            <View style={styles.row}>
              <Text style={styles.tilteSection}>Recent Transactions</Text>
              <TouchableOpacity onPress={onViewAllTransactions}>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={cryptoTransactions?.slice(0, 4)}
            ItemSeparatorComponent={() => <SeperateLineIcon height={1} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyTransactionContainer}>
                <Text style={styles.emptyTransactionTitle}>
                  You have no transactions yet.
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <CryptoTransactionsCardComponent
                props={{
                  data: item,
                  isVisible: !isVisible,
                  onSelect: onSelectCryptoTransaction,
                }}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CryptoAccountComponent;
