import { isEmpty } from "lodash";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleProp,
  View,
  ViewStyle,
  Text
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { ThemeContext } from "react-native-theme-component";
import { WalletContext } from "../../context/wallet-context";
import { Transaction, Wallet } from "../../model";
import EmptyWalletComponent from "../no-wallet-component";
import useMergeStyles from "./styles";
import TransactionCardComponent, {
  TransactionCardComponentStyles
} from "./transaction-card-component";
import WalletItemComponent, {
  WalletItemComponentStyle
} from "./wallet-item-component";
const { width } = Dimensions.get("window");

export type WalletCardComponentProps = {
  style?: WalletCardComponentStyles;
  dateFormat?: string;
  carouselWidth?: number;
  phoneNumber: string;
  carouselItemWidth?: number;
  loadingIndicator?: ReactNode;
  onAddMoney: (wallet: Wallet) => void;
  onSendMoney: (wallet: Wallet) => void;
  onViewAllTransactions: (wallet: Wallet) => void;
  onTransactionDetails: (transaction: Transaction) => void;
  children?: ReactNode;
};

export type WalletCardComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  carouselContainerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  walletItemComponentStyle?: WalletItemComponentStyle;
  transactionCardComponentStyle?: TransactionCardComponentStyles;
};

const WalletCardComponent = ({
  style,
  carouselItemWidth,
  carouselWidth,
  loadingIndicator,
  onAddMoney,
  onSendMoney,
  phoneNumber,
  onViewAllTransactions,
  dateFormat,
  onTransactionDetails,
  children
}: WalletCardComponentProps) => {
  const { colors, i18n } = useContext(ThemeContext);
  const styles: WalletCardComponentStyles = useMergeStyles(style);
  const {
    transactions,
    fetchTransactions,
    wallets,
    isLoadingWallets
  } = useContext(WalletContext);

  // state
  const carouselRef: any = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWallet, setCurrentWallet] = useState<Wallet | undefined>(
    undefined
  );
  const [_initialWallet, setInitialWallet] = useState<Wallet | undefined>(
    undefined
  );
  const [_initIndex, setInitIndex] = useState<number | undefined>(undefined);
  const _carouselWidth = carouselWidth ?? width;
  const _carouselItemWidth = carouselItemWidth ?? width - 32;

  useEffect(() => {
    if (!_initialWallet && wallets.length > 0) {
      setInitialWallet(wallets[0]);
      changeToIndex(0);
    }
  }, [wallets]);

  useEffect(() => {
    if (_initialWallet) {
      const initIndex =
        wallets.findIndex(
          wallet => wallet.walletId === _initialWallet.walletId
        ) || 0;
      if (!_initIndex) {
        setTimeout(() => {
          changeToIndex(initIndex);
        }, 500);
        setInitIndex(initIndex);
      }
    }
  }, [_initialWallet]);

  const changeToIndex = (index: number) => {
    setCurrentIndex(index);
    carouselRef?.current?.snapToItem(index);
  };

  useEffect(() => {
    if (!isEmpty(wallets)) {
      let focusWallet = wallets[currentIndex];
      const transactionIndex = transactions.findIndex(
        ts => ts.walletId === focusWallet?.walletId
      );
      if (focusWallet && transactionIndex === -1) {
        fetchTransactions(focusWallet.walletId, 1);
      }
      setCurrentWallet(focusWallet);
    }
  }, [currentIndex, wallets]);

  if (!isEmpty(wallets)) {
    if (isLoadingWallets) {
      return (
        <View style={styles.loadingContainerStyle}>
          {loadingIndicator ?? (
            <ActivityIndicator color={colors.primaryColor} />
          )}
        </View>
      );
    }

    if (!children) {
      return <EmptyWalletComponent />;
    } else {
      let item = {
        availableBalance: 0,
        currentBalance: 0,
        bankAccount: {
          accountId: "string1",
          accountSubType: "string2",
          accountHolderName: "string3",
          accountNumber: "Ongoing verification",
          bankCode: "string5",
          countryCode: "PHP",
          internalProductCategory: "string7",
          productId: "string8"
        },
        currencyCode: "PHP",
        walletName: "My Pitaka",
        type: "string11",
        walletId: "string12",
        isDefaultWallet: true
      };
      return (
        <View style={styles.containerStyle}>
          <View style={styles.emptyCarouselContainerStyle}>
            <WalletItemComponent
              wallet={item}
              onAddMoney={() => onAddMoney(item)}
              onSendMoney={() => onSendMoney(item)}
              phoneNumber={phoneNumber}
              style={styles.emptyWalletItemComponentStyle}
              arrowRightIcon={false}
              isWithMask={true}
            />
          </View>
          <View style={styles.containerStyleMessage}>
            <Text style={styles.labelTextStyle}>
              {i18n?.t("wallet_item_component.lbl_kyc_message1") ??
                "NOTE: We are currently verifying your account opening request. We will process your request and notify you within 24 hours."}
            </Text>
            <Text style={styles.label2TextStyle}>
              {i18n?.t("wallet_item_component.lbl_kyc_message2") ??
                "While waiting, you can browse our Financial Literacy content below."}
            </Text>
          </View>
          {children && (
            <>
              <Text style={styles.labelTitlStyle}>{"Learn & Grow  🌱"}</Text>
              <View>{children}</View>
            </>
          )}
        </View>
      );
    }
    // return <EmptyWalletComponent />;
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.carouselContainerStyle}>
        <Carousel
          scrollEnabled={wallets.length > 1}
          removeClippedSubviews={false}
          ref={carouselRef}
          data={wallets}
          keyExtractor={(item: Wallet) => item.walletId}
          extraData={wallets}
          renderItem={({ item }: any) => {
            return (
              <WalletItemComponent
                wallet={item}
                onAddMoney={() => onAddMoney(item)}
                onSendMoney={() => onSendMoney(item)}
                phoneNumber={phoneNumber}
                style={styles.walletItemComponentStyle}
              />
            );
          }}
          sliderWidth={_carouselWidth}
          itemWidth={_carouselItemWidth}
          inactiveSlideScale={1}
          loop={false}
          activeSlideAlignment="center"
          layout="default"
          onSnapToItem={(index: number) => {
            if (_initialWallet) {
              setInitialWallet(undefined);
            }
            setCurrentIndex(index);
          }}
        />
      </View>
      {currentWallet && (
        <TransactionCardComponent
          wallet={currentWallet}
          dateFormat={dateFormat}
          onViewAllTransactions={() => {
            onViewAllTransactions(currentWallet);
          }}
          onTransactionDetails={onTransactionDetails}
          style={styles.transactionCardComponentStyle}
        />
      )}
      {children && <View>{children}</View>}
    </View>
  );
};

export default WalletCardComponent;
