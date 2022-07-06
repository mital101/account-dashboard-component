import React, { ReactNode, useContext, useState } from 'react';
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
import {
  CryptoHelpLinkIcon,
  InfoIcon,
  PointerIcon,
} from '../../../assets/images';
import Tooltip from 'react-native-walkthrough-tooltip';
import EmptyWalletComponent from '../no-crypto-wallet-component';
import CryptoItemComponent from '../crypto-item-component/index';
import AccountInfoCard from '../../crypto-components/crypto-account-info-card';
import MarketPricesComponent from '../../market-price-component';
import { Wallet, Transaction } from '../../../model';
import { WalletItemComponentStyle } from '../../wallet-card-component/wallet-item-component';
import { TransactionCardComponentStyles } from '../../wallet-card-component/transaction-card-component';

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
  onTransactionDetails: (transaction: Transaction) => void;
  onLinkAccount: () => void;
  children?: ReactNode;
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
  onTransactionDetails,
  children,
}: CryptoCardComponentProps) => {
  const { colors, i18n } = useContext(ThemeContext);

  const styles: CryptoCardComponentStyles = useMergeStyles(style);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(true);

  return (
    <View style={styles.containerStyle}>
      {
        <ScrollView
          style={styles.containerWrapper}
          showsVerticalScrollIndicator={false}
        >
          <Tooltip
            isVisible={tooltipVisible}
            arrowSize={{ width: 40, height: 15 }}
            content={
              <View style={styles.viewTooltip}>
                <View style={styles.viewTooltipHeader}>
                  <InfoIcon width={20} height={20} color={'#3E2D68'} />
                  <View style={styles.marginHorizontalView} />
                  <Text style={styles.titleTooltip}>Main Actions</Text>
                </View>
                <Text>
                  Transfer pesos or crypto in and out of your account, to start
                  trading
                </Text>
              </View>
            }
            placement="bottom"
            extraView={
              <>
                <View style={styles.pointerView}>
                  <View style={styles.column}>
                    <PointerIcon width={40} height={40} />
                    <Text style={styles.pointerText}>Tap to Continue</Text>
                  </View>
                </View>
                <View style={styles.skipView}>
                  <TouchableOpacity style={styles.skipBtn}>
                    <Text style={styles.skipText}>Skip Walkthrough</Text>
                  </TouchableOpacity>
                </View>
              </>
            }
            pointerPosition={{}}
            onClose={() => setTooltipVisible(false)}
          >
            {/* <EmptyWalletComponent
            onLinkAccountPressed={()=>{
              onLinkAccount()
            }} 
            onLayout={onLayout}
          /> */}
            <AccountInfoCard />
          </Tooltip>
          <View style={styles.emptyCarouselContainerStyle}>
            <MarketPricesComponent />
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
          </View>
          {children && <View>{children}</View>}
        </ScrollView>
      }
    </View>
  );
};

export default CryptoCardComponent;
