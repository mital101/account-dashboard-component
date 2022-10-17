import React, { ReactNode, useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleProp,
  ImageStyle,
  TextStyle,
  ViewStyle,
  TouchableOpacity
} from "react-native";
import { ArrowRightIcon, images } from "../../../assets/images";
import {
  ThemeContext,
  useCurrencyFormat,
  Button
} from "react-native-theme-component";
import useMergeStyles from "./styles";
import { CardWallet, Wallet } from "../../../model";
import WalletDetailsModal from "./components/wallet-details-modal";

export type WalletItemComponentProps = {
  wallet: Wallet;
  onAddMoney: () => void;
  onSendMoney: () => void;
  onSelectMyCard?: () => void;
  onNavigateMyCard?: () => void;
  phoneNumber: string;
  arrowRightIcon?: ReactNode;
  isWithMask?: boolean;
  style?: WalletItemComponentStyle;
  isShowVCCard?: boolean;
  vcCardInfo?: CardWallet;
};

export type WalletItemComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  cardBackgroundStyle?: StyleProp<ImageStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
  walletNameStyle?: StyleProp<TextStyle>;
  accountNumberStyle?: StyleProp<TextStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  bottomContainerStyle?: StyleProp<ViewStyle>;
  myCardContainer?: StyleProp<ViewStyle>;
  myCardBtn?: StyleProp<ViewStyle>;
  myCardRow?: StyleProp<ViewStyle>;
  myCardTitle?: StyleProp<TextStyle>;
  learnMoreLabel?: StyleProp<TextStyle>;
  lastFourDigitLabel? : StyleProp<TextStyle>;
};

const WalletItemComponent = (props: WalletItemComponentProps) => {
  const {
    wallet,
    style,
    onAddMoney,
    onSendMoney,
    onSelectMyCard,
    arrowRightIcon,
    phoneNumber,
    isWithMask,
    isShowVCCard,
    vcCardInfo,
    onNavigateMyCard
  } = props;
  const { i18n } = useContext(ThemeContext);
  const [isShowDetail, setShowDetail] = useState(false);

  const styles: WalletItemComponentStyle = useMergeStyles(style);

  const maskedNumber = (visibleCount: number) => {
    if (wallet?.bankAccount?.accountNumber) {
      const length = wallet.bankAccount.accountNumber.length;
      const visiblePart = wallet.bankAccount.accountNumber.substring(
        length - visibleCount,
        length
      );
      return `${Array.from(
        { length: length - visibleCount },
        (_, __) => "*"
      ).join("")}${visiblePart}`;
    }
  };

  const renderVC = () => {
    return vcCardInfo ? <View style={styles.myCardContainer}>
      <TouchableOpacity style={styles.myCardBtn} onPress={onNavigateMyCard}>
        <View style={styles.myCardRow}>
          <Text style={styles.myCardTitle}>My Card</Text>
          <Text style={styles.lastFourDigitLabel}>{`*${vcCardInfo.cardData?.cardLastFourDigitNumber}`}</Text>
        </View>
        <Image source={images.vcCardPreview}  />
      </TouchableOpacity>
    </View> : <View style={styles.myCardContainer}>
    <TouchableOpacity style={styles.myCardBtn} onPress={onSelectMyCard}>
        <Text style={styles.myCardTitle}>My Card</Text>
        <View style={styles.myCardRow}>
          <Text style={styles.learnMoreLabel}>Learn more</Text>
          <ArrowRightIcon width={10} height={10} color={'#FF9800'} />
        </View>
    </TouchableOpacity>
  </View>
  }



  return (
    <>
      <View style={styles.containerStyle}>
        <Image
          source={images.maskCard}
          style={styles.cardBackgroundStyle}
          fallbackImage={images.maskCard}
        />
        <View style={styles.contentContainerStyle}>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.walletNameStyle}>{wallet.walletName}</Text>
            <Text
              onPress={() => {
                setShowDetail(true);
              }}
              style={styles.accountNumberStyle}
            >
              {maskedNumber(isWithMask ? 100 : 4)}
            </Text>
            {arrowRightIcon ?? (
              <ArrowRightIcon width={6} height={12} color={"#FF9800"} />
            )}
          </View>
          <Text style={styles.amountTextStyle}>
            {useCurrencyFormat(wallet.currentBalance, wallet.currencyCode)}
          </Text>
          <View style={styles.bottomContainerStyle}>
            <Button
              label={
                i18n?.t("wallet_card_component.btn_add_money") ?? "Add Money"
              }
              onPress={onAddMoney}
              style={{
                primaryContainerStyle: {
                  flex: 1,
                  marginRight: 5.5
                }
              }}
            />
            <Button
              label={
                i18n?.t("wallet_card_component.btn_send_money") ?? "Send Money"
              }
              onPress={onSendMoney}
              style={{
                primaryContainerStyle: {
                  flex: 1,
                  marginLeft: 5.5
                }
              }}
            />
          </View>
        </View>
      </View>
      {isShowVCCard && renderVC()}
      <WalletDetailsModal
        isVisible={isShowDetail}
        onClose={() => {
          setShowDetail(false);
        }}
        wallet={wallet}
        phoneNumber={phoneNumber}
      />
    </>
  );
};

export default React.memo(WalletItemComponent);
