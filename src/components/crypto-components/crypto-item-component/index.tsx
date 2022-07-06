import React, { ReactNode, useContext, useState } from "react";
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

export type CryptoItemComponentProps = {
  // wallet: Wallet;
  onLinkAccount: () => void;
  phoneNumber: string;
  title?:string;
  message?:string;
  buttonText?:string;
  leftIcon?:ReactNode;
  arrowRightIcon?: ReactNode;
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
    // wallet,
    style,
    onLinkAccount,
    arrowRightIcon,
    phoneNumber,
    isWithMask,
    title,
    message,
    buttonText,
    leftIcon
  } = props;
  const { i18n } = useContext(ThemeContext);
  const [isShowDetail, setShowDetail] = useState(false);

  const styles: CryptoItemComponentStyle = useMergeStyles(style);



  return (
    <TouchableOpacity
      onPress={()=>{
        onLinkAccount()
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
};

export default React.memo(CryptoItemComponent);
