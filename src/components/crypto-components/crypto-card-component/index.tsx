import React, {
  ReactNode,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleProp,
  View,
  ViewStyle,
  ScrollView,
  Text,
  TextStyle,
  RefreshControl,
} from 'react-native';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';
import { AuthContext } from 'react-native-auth-component';
import { useFocusEffect } from '@react-navigation/native';
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
import AccountInfoCard from '../../crypto-components/crypto-account-info-card';
import MarketPricesComponent from '../../market-price-component';
import { Wallet, Transaction } from '../../../model';
import { WalletItemComponentStyle } from '../../wallet-card-component/wallet-item-component';
import { TransactionCardComponentStyles } from '../../wallet-card-component/transaction-card-component';

import { AccountOriginationContext } from 'account-origination-component';
import { CustomerInvokeContext } from 'customer-invoke-component';
import { WalletContext } from '../../../context/wallet-context';

export type CryptoCardComponentProps = {
  style?: CryptoCardComponentStyles;
  dateFormat?: string;
  carouselWidth?: number;
  phoneNumber: string;
  carouselItemWidth?: number;
  loadingIndicator?: ReactNode;
  onAddMoney: (wallet: Wallet) => void;
  onSendMoney: (wallet: Wallet) => void;
  onViewAllTransactions: (wallet: Wallet) => void;
  onViewAllCrypto: () => void;
  onTrade: () => void;
  onLinkAccount: () => void;
  onViewAccount: () => void;
  onTransfer: () => void;
  onSearchingCrypto: () => void;
  onSelectItemCurrency: (currency: Currency) => void;
  children?: ReactNode;
  isActive?: boolean;
  isWithToolTip?: boolean;
};

export type CryptoCardComponentStyles = {
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

const CryptoCardComponent = ({
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
  onTrade,
  onViewAccount,
  children,
  isActive,
  isWithToolTip,
  onTransfer,
  onViewAllCrypto,
  onSearchingCrypto,
  onSelectItemCurrency,
}: CryptoCardComponentProps) => {
  const { colors, i18n } = useContext(ThemeContext);

  const styles: CryptoCardComponentStyles = useMergeStyles(style);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [showTransferTips, setTransferTips] = useState<boolean>(false);
  const [showHelpTips, setHelpTips] = useState<boolean>(false);
  const [showSliderTips, setSliderTips] = useState<boolean>(false);
  const [ref, setRef] = useState(null);
  const { profile } = useContext(AuthContext);
  const { refreshWallets, cryptoWallet, setCurrentTransfer } = useContext(WalletContext);

  useFocusEffect(
    React.useCallback(() => {
      refreshWallets();
    }, [])
  );

  useEffect(() => {
    if (isWithToolTip) {
      setTooltipVisible(true);
    }
  }, [isWithToolTip]);

  const handleTransferIn = () => {
    setCurrentTransfer('moneyin');
    onTransfer && onTransfer();
  }

  const handleTransferOut = () => {
    setCurrentTransfer('moneyout');
    onTransfer && onTransfer();
  }

  const firstName = `${profile?.firstName}`.trim();

  return (
    <View style={styles.containerStyle}>
      {
        <ScrollView
          style={styles.containerWrapper}
          showsVerticalScrollIndicator={false}
          ref={(ref) => {
            setRef(ref);
          }}
          refreshControl={
            <RefreshControl 
              refreshing={false}
              onRefresh={refreshWallets}
            />
          }
        >
          <Text style={styles.userName}>{`${firstName}’s Crypto`}</Text>
          {!isActive && (
            <EmptyWalletComponent
              onLinkAccountPressed={() => {
                onLinkAccount();
              }}
              onLayout={() => {
                //onLayout()
              }}
            />
          )}

          {isActive && (
            <Tooltip
              isVisible={tooltipVisible}
              allowChildInteraction={false}
              showChildInTooltip={true}
              useInteractionManager={true}
              displayInsets={{ top: 20, bottom: 20, left: 10, right: 10 }}
              placement="bottom"
              tooltipStyle={{ alignItems: 'center' }}
              arrowSize={{ width: 40, height: 15 }}
              content={
                <View style={styles.viewTooltip}>
                  <View style={styles.viewTooltipHeader}>
                    <InfoIcon width={20} height={20} color={'#3E2D68'} />
                    <Text style={styles.titleTooltip}>Main Actions</Text>
                  </View>
                  <Text style={styles.messageTooltip}>
                    Transfer pesos or crypto in and out of your account, to
                    start trading
                  </Text>
                </View>
              }
              extraView={
                <>
                  <View style={styles.pointerView}>
                    <TouchableOpacity
                      onPress={() => {
                        setTooltipVisible(false);
                        setTransferTips(true);
                      }}
                      style={styles.column}
                    >
                      <PointerIcon width={40} height={40} />
                      <Text style={styles.pointerText}>Tap to Continue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.skipView}>
                    <TouchableOpacity
                      onPress={() => {
                        setTooltipVisible(false);
                      }}
                      style={styles.skipBtn}
                    >
                      <Text style={styles.skipText}>Skip Walkthrough</Text>
                    </TouchableOpacity>
                  </View>
                </>
              }
            >
              <TooltipChildrenContext.Consumer>
                {({ tooltipDuplicate }) => (
                  <AccountInfoCard
                    onTipsCompleted={() => {
                      setTransferTips(false);
                      ref.scrollTo({
                        x: 0,
                        y: 400,
                        animated: true,
                      });
                      setTimeout(() => setHelpTips(true), 1000);
                    }}
                    onTipsTerminated={() => {
                      setTransferTips(false);
                    }}
                    onClickTrade={() => {
                      onTrade();
                    }}
                    onViewAccount={() => {
                      onViewAccount();
                    }}
                    isShowTips={showTransferTips}
                    onTransferIn={handleTransferIn}
                    onTransferOut={handleTransferOut}
                    walletData={cryptoWallet}
                  />
                )}
              </TooltipChildrenContext.Consumer>
            </Tooltip>
          )}
          <View style={styles.emptyCarouselContainerStyle}>
            <View style={{ marginHorizontal: 15 }}>
              <MarketPricesComponent
                Root={{
                  props: {
                    onViewAllCrypto,
                    onSearchingCrypto,
                    onSelectItemCurrency,
                  },
                }}
              />
            </View>
            <Tooltip
              isVisible={showHelpTips}
              allowChildInteraction={false}
              showChildInTooltip={true}
              useInteractionManager={true}
              displayInsets={{ top: 20, bottom: 15, left: 10, right: 15 }}
              placement="top"
              tooltipStyle={{ alignItems: 'center' }}
              arrowSize={{ width: 40, height: 15 }}
              content={
                <View style={styles.viewTooltip}>
                  <View style={styles.viewTooltipHeader}>
                    <InfoIcon width={20} height={20} color={'#3E2D68'} />
                    <Text style={styles.titleTooltip}>Help Center</Text>
                  </View>
                  <Text style={styles.messageTooltip}>
                    For questions, please read through our Frequently Asked
                    Questions (FAQs) or submit a ticket to contact our customer
                    support champion directly.
                  </Text>
                </View>
              }
              extraView={
                <>
                  <View style={styles.pointerView}>
                    <TouchableOpacity
                      onPress={() => {
                        setHelpTips(false);
                        setSliderTips(true);
                      }}
                      style={styles.column}
                    >
                      <PointerIcon width={40} height={40} />
                      <Text style={styles.pointerText}>Tap to Continue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.skipView}>
                    <TouchableOpacity
                      onPress={() => {
                        setHelpTips(false);
                      }}
                      style={styles.skipBtn}
                    >
                      <Text style={styles.skipText}>Skip Walkthrough</Text>
                    </TouchableOpacity>
                  </View>
                </>
              }
            >
              <TooltipChildrenContext.Consumer>
                {({ tooltipDuplicate }) => (
                  <CryptoItemComponent
                    wallet={[]}
                    style={styles.walletItemComponentStyle}
                    title={'Have questions?'}
                    message={'Let us know how we can help!'}
                    buttonText={'Visit Help Center'}
                    leftIcon={<CryptoHelpLinkIcon width={100} height={82} />}
                    onLinkAccount={() => {
                      onLinkAccount();
                    }}
                  />
                )}
              </TooltipChildrenContext.Consumer>
            </Tooltip>
          </View>
          {children && (
            <>
              <Tooltip
                isVisible={showSliderTips}
                allowChildInteraction={false}
                showChildInTooltip={true}
                useInteractionManager={true}
                // isShowPointer={true}
                // pointerPosition={{ marginTop: 140 }}
                displayInsets={{ top: 20, bottom: 15, left: 10, right: 15 }}
                placement="top"
                tooltipStyle={{ alignItems: 'center' }}
                arrowSize={{ width: 40, height: 15 }}
                content={
                  <View style={styles.viewTooltip}>
                    <View style={styles.viewTooltipHeader}>
                      <InfoIcon width={20} height={20} color={'#3E2D68'} />
                      <Text style={styles.titleTooltip}>
                        Learn more about cryptocurrencies
                      </Text>
                    </View>
                    <Text style={styles.messageTooltip}>
                      Check out our articles to understand crypto more and how
                      to how you can manage your risk properly.
                    </Text>
                  </View>
                }
                extraView={
                  <>
                    <View style={styles.TopPointerView}>
                      <TouchableOpacity style={styles.column}>
                        <PointerIcon width={40} height={40} />
                        <Text style={styles.pointerText}>Tap to Continue</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.skipView}>
                      <TouchableOpacity style={styles.skipBtn}>
                        <Text style={styles.skipText}>Skip Walkthrough</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                }
                // pointerPosition={{}}
                onClose={() => {
                  setSliderTips(false);
                }}
              >
                <TooltipChildrenContext.Consumer>
                  {({ tooltipDuplicate }) => <View>{children}</View>}
                </TooltipChildrenContext.Consumer>
              </Tooltip>
            </>
          )}
        </ScrollView>
      }
    </View>
  );
};

export default CryptoCardComponent;
