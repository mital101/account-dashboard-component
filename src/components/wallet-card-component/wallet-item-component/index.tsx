import React, { ReactNode, useContext, useState } from 'react';
import { View, Text, StyleProp, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { ArrowRightIcon, images } from '../../../assets/images';
import { ThemeContext, Image, useCurrencyFormat, Button } from 'react-native-theme-component';
import useMergeStyles from './styles';
import { Wallet } from '../../../model';
import WalletDetailsModal from './components/wallet-details-modal';

export type WalletItemComponentProps = {
  wallet: Wallet;
  onAddMoney: () => void;
  onSendMoney: () => void;
  phoneNumber: string;
  arrowRightIcon?: ReactNode;
  style?: WalletItemComponentStyle;
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
};

const WalletItemComponent = (props: WalletItemComponentProps) => {
  const { wallet, style, onAddMoney, onSendMoney, arrowRightIcon, phoneNumber } = props;
  const { i18n } = useContext(ThemeContext);
  const [isShowDetail, setShowDetail] = useState(false);

  const styles: WalletItemComponentStyle = useMergeStyles(style);

  const maskedNumber = (visibleCount: number) => {
    const length = wallet.bankAccount.accountNumber.length;
    const visiblePart = wallet.bankAccount.accountNumber.substring(length - visibleCount, length);
    return `${Array.from({ length: length - visibleCount }, (_, __) => '*').join(
      ''
    )}${visiblePart}`;
  };

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
              {maskedNumber(4)}
            </Text>
            {arrowRightIcon ?? <ArrowRightIcon width={6} height={12} color={'#FF9800'} />}
          </View>
          <Text style={styles.amountTextStyle}>
            {useCurrencyFormat(wallet.currentBalance, wallet.currencyCode)}
          </Text>
          <View style={styles.bottomContainerStyle}>
            <Button
              label={i18n?.t('wallet_component.btn_add_money') ?? 'Add Money'}
              onPress={onAddMoney}
              style={{
                primaryContainerStyle: {
                  flex: 1,
                  marginRight: 5.5,
                },
              }}
            />
            <Button
              label={i18n?.t('wallet_component.btn_send_money') ?? 'Send Money'}
              onPress={onSendMoney}
              style={{
                primaryContainerStyle: {
                  flex: 1,
                  marginLeft: 5.5,
                },
              }}
            />
          </View>
        </View>
      </View>
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
