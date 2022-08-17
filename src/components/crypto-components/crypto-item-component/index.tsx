import React, { ReactNode, useContext, useState,useEffect } from "react";
import {
  View,
  Text,
  StyleProp,
  ImageStyle,
  TextStyle,
  ViewStyle,
  TouchableOpacity
} from "react-native";
import { ArrowRightIcon, images,CryptoLinkIcon } from "../../../assets/images";
import {
  ThemeContext,
  Image,
  useCurrencyFormat,
  Button
} from "react-native-theme-component";
import useMergeStyles from "./styles";
// import { Wallet } from "../../../model";
import CryptoDetailsModal from "./components/crypto-details-modal";
import LinearGradient from 'react-native-linear-gradient';
import {WalletContext} from '@banking-component/wallet-component';
export type CryptoItemComponentProps = {
  wallet?: any;
  onLinkAccount: (isActivated) => void;
  phoneNumber: string;
  title?:string;
  message?:string;
  buttonText?:string;
  leftIcon?:ReactNode;
  isWithMask?: boolean;
  style?: CryptoItemComponentStyle;
};

export type CryptoItemComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  cardBackgroundStyle?: StyleProp<ImageStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
  walletNameStyle?: StyleProp<TextStyle>;
  accountNumberStyle?: StyleProp<TextStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  bottomContainerStyle?: StyleProp<ViewStyle>;
};

const CryptoItemComponent = (props: CryptoItemComponentProps) => {
  const {
    wallet,
    style,
    onLinkAccount,
    phoneNumber,
    isWithMask,
    title,
    message,
    buttonText,
    leftIcon
  } = props;
  const { i18n } = useContext(ThemeContext);
  const [isShowDetail, setShowDetail] = useState(false);
  const [isActivated, setIsActivated] = useState<any>();

  const styles: CryptoItemComponentStyle = useMergeStyles(style);
  const { getWalletsById } = useContext(WalletContext);


  useEffect(() => {
    if (wallet.length > 0) {
      let filteredArray = wallet.find(item => item.bankAccount.bankCode === 'PDAX');
      
      if (filteredArray) {
        getWalletsById('PDAX')
        setIsActivated(filteredArray)
      }else{
        setIsActivated(undefined)
      }
      // setInitialWallet(wallets[0]);
      // changeToIndex(0);
    }
  }, [wallet]);

  if (isActivated) {
    const maskedNumber = (visibleCount: number) => {
      if (isActivated?.bankAccount?.accountNumber) {
        const length = isActivated.bankAccount.accountNumber.length;
        const visiblePart = isActivated.bankAccount.accountNumber.substring(
          length - visibleCount,
          length
        );
        return `${Array.from(
          { length: length - visibleCount },
          (_, __) => "*"
        ).join("")}${visiblePart}`;
      }
    };

    return (
      <TouchableOpacity
        onPress={()=>{
          onLinkAccount(true)
        }}
      >
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#000', '#3E2D68', '#3E2D68']} style={styles.containerStyle}>
          <View style={styles.walletContentContainerStyle}>
            <View style={styles.walletHeaderContainerStyle}>
              <Text style={styles.walletNameStyle}>{'My Crypto Pitaka'}</Text>
              <Text
                style={styles.accountNumberStyle}
              >
                {maskedNumber(isWithMask ? 100 : 4)}
              </Text>
              <ArrowRightIcon width={6} height={12} color={"#FF9800"} />
            </View>
            <Text style={styles.amountTextStyle}>
              {useCurrencyFormat(isActivated.currentBalance, isActivated.currencyCode)}
            </Text>
            <View style={styles.subRowCurrency}>
              <Text style={styles.currencyLink}>{'₱ 00.00 (0.0%)' }</Text>
              <Text style={styles.currencySubLink}> Yesterday's Gain/Loss</Text>
            </View>
          </View>
        </LinearGradient>

      </TouchableOpacity>
    );
  }else{
    return (
      <TouchableOpacity
        onPress={()=>{
          onLinkAccount(false)
        }}
      >
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}  colors={['#000', '#3E2D68', '#3E2D68']} style={styles.containerStyle}>

        <View style={styles.cardContainerStyle}>
          {leftIcon}
          <View style={styles.contentContainerStyle}>
            <View style={styles.headerContainerStyle}>
              <Text style={styles.cryptoWalletTitleStyle}>{title??'Buy and sell crypto now!'}</Text>
              <Text style={styles.cryptoNameStyle}>{message??'Buy for as low as ₱50.'}</Text>
            </View>

            <Text style={styles.accountLinkTextStyle}>
              {buttonText??'Activate my crypto account'}
              <View style={styles.accountLinkIconStyle}><ArrowRightIcon width={6} height={12} color={"#FF9800"} /></View>
            </Text>
          </View>
        </View>

        </LinearGradient>
      </TouchableOpacity>
    );
  }




};

export default React.memo(CryptoItemComponent);
