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
  ScrollView,
  Text,
  Platform,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { ThemeContext } from "react-native-theme-component";

import EmptyWalletComponent from "../no-crypto-wallet-component";
import useMergeStyles from "./styles";
import { CryptoHelpLinkIcon } from "../../../assets/images";


import  {  CryptoItemComponent,OnboardingComponent } from "../../crypto-components";

// import {OnboardingComponent} from "../crypto-components/onboarding-component";

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
  onLinkAccount: () => void;
  children?: ReactNode;
};

export type WalletCardComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  carouselContainerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  walletItemComponentStyle?: WalletItemComponentStyle;
  transactionCardComponentStyle?: TransactionCardComponentStyles;
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
  const styles: WalletCardComponentStyles = useMergeStyles(style);


    return (
      <View style={styles.containerStyle}>
        {<ScrollView   style={styles.containerWrapper}    >
        <EmptyWalletComponent  onLinkAccountPressed={()=>{
          onLinkAccount()
        }} />
        <View  style={styles.emptyCarouselContainerStyle}>
          <CryptoItemComponent
            wallet={[]}
            style={styles.walletItemComponentStyle}
            title={"Have questions?"}
            message={"Let us know how we can help!"}
            buttonText={"Visit Help Center"}
            leftIcon={<CryptoHelpLinkIcon width={100} height={82} />}
            onLinkAccount={()=>{
              onLinkAccount() 
            }}
          />
        </View>
        {children && <View>{children}</View>}
        </ScrollView>}

      </View>
    );




};

export default CryptoCardComponent;
