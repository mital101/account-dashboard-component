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
import AccountInfoCard from '../../crypto-components/crypto-account-info-card';
import MarketPricesComponent from '../../market-price-component';
import { Wallet, Currency } from '../../../model';
import { WalletItemComponentStyle } from '../../wallet-card-component/wallet-item-component';
import { TransactionCardComponentStyles } from '../../wallet-card-component/transaction-card-component';
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
  onTransferIn: () => void;
  onTransferOut: () => void;
  onSearchingCrypto: () => void;
  onSelectItemCurrency: (currency: Currency) => void;
  children?: ReactNode;
  isActive?: boolean;
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
  onTransferIn,
  onTransferOut,
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
  const { getAccountStatus } = useContext(WalletContext);

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

  useEffect(() => {
    getAccountStatus();
    if (isActive) {
      setTooltipVisible(true);
    }
  }, [isActive]);

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
                    onTransferIn={onTransferIn}
                    onTransferOut={onTransferOut}
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
