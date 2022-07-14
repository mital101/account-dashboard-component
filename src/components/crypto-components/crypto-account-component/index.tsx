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
} from 'react-native';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';
import { AuthContext } from 'react-native-auth-component';

import {
  CryptoHelpLinkIcon,
  InfoIcon,
  PointerIcon,
} from '../../../assets/images';
import Tooltip, {
  TooltipChildrenContext,
} from 'react-native-walkthrough-tooltip';

import EmptyWalletComponent from '../no-crypto-wallet-component';
import CryptoItemComponent from '../crypto-item-component/index';
import AccountSummaryCard from '../../crypto-components/crypto-account-summary-card';
import BreakdownSummaryCard from '../../crypto-components/crypto-breakdown-card';
import MyCryptoCard from '../../crypto-components/my-crypto-card';
import CryptoTransactionsCard from '../../crypto-components/crypto-transactions-card';

import MarketPricesComponent from '../../market-price-component';
import { Wallet, Transaction } from '../../../model';
import { WalletItemComponentStyle } from '../../wallet-card-component/wallet-item-component';
import { TransactionCardComponentStyles } from '../../wallet-card-component/transaction-card-component';

export type CryptoAccountComponentProps = {
  style?: CryptoAccountComponentStyles;
  dateFormat?: string;
  carouselWidth?: number;
  phoneNumber: string;
  carouselItemWidth?: number;
  loadingIndicator?: ReactNode;
  onAddMoney: (wallet: Wallet) => void;
  onSendMoney: (wallet: Wallet) => void;
  onViewAllTransactions: (wallet: Wallet) => void;
  onTransactionDetails: (transaction: Transaction) => void;
  onLinkAccount: () => void;
  onViewAccount: () => void;
  children?: ReactNode;
  isActive?: boolean;
  onClickMyCrypto: () => void;
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
  onClickMyCrypto
}: CryptoAccountComponentProps) => {
  const { colors, i18n } = useContext(ThemeContext);

  const styles: CryptoAccountComponentStyles = useMergeStyles(style);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [showTransferTips, setTransferTips] = useState<boolean>(false);
  const [showHelpTips, setHelpTips] = useState<boolean>(false);
  const [showSliderTips, setSliderTips] = useState<boolean>(false);

  const [ref, setRef] = useState(null);

  const { profile } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);


  // useEffect(() => {
  //   if (ref) {
  //     ref.scrollTo({
  //       x: 0,
  //       y: 400,
  //       animated: true,
  //     });
  //   }
  //
  // },[ref]);

  // useEffect(() => {
  //   if (isActive) {
  //     setIsVisible(!isVisible);
  //   }
  // }, [isActive]);


  return (
    <View style={styles.containerStyle}>
      <ScrollView
        style={styles.containerWrapper}
        showsVerticalScrollIndicator={false}
        ref={(ref) => {
          setRef(ref);
        }}
      >

          <Text onPress={()=>{setIsEmpty(!isEmpty)}} style={styles.userName}>{`My Crypto Pitaka`}</Text>
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
            onClickHide={()=>{setIsVisible(!isVisible)}}
            isProtected={isVisible}
            isEmpty={isEmpty} />

          <BreakdownSummaryCard
            isProtected={isVisible}
            isEmpty={isEmpty}
          />

          <MyCryptoCard
            ViewAll={()=>{onClickMyCrypto()}}
            isProtected={isVisible}
            isEmpty={isEmpty}
          />

          <CryptoTransactionsCard
            isProtected={isVisible}
            isEmpty={isEmpty}
          />


      </ScrollView>
    </View>
  );
};

export default CryptoAccountComponent;
