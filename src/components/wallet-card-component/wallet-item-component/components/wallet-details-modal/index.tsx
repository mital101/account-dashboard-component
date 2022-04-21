import { Wallet } from '../../../../../model';
import React, { useContext, useState } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BottomSheet, ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import useMergeStyles from './styles';
import { CopyIcon } from '../../../../../assets/copy.icon';
import Clipboard from '@react-native-clipboard/clipboard';

export type WalletDetailsModalProps = {
  isVisible: boolean;
  wallet: Wallet;
  onClose: () => void;
  phoneNumber: string;
  style?: WalletDetailsModalStyles;
};

export type WalletDetailsModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  closeTextStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  itemTitleStyle?: StyleProp<TextStyle>;
  itemValueStyle?: StyleProp<TextStyle>;
  copyContainerStyle?: StyleProp<ViewStyle>;
  copiedContainerStyle?: StyleProp<ViewStyle>;
  copiedTextStyle?: StyleProp<TextStyle>;
};

const WalletDetailsModal = ({
  style,
  isVisible,
  onClose,
  wallet,
  phoneNumber,
}: WalletDetailsModalProps) => {
  const styles: WalletDetailsModalStyles = useMergeStyles(style);
  const [isCopied, setCopied] = useState(false);
  const { colors, i18n } = useContext(ThemeContext);

  const copy = () => {
    setCopied(true);
    Clipboard.setString(wallet.bankAccount.accountNumber);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <View style={styles.headerContainerStyle}>
          <Text style={styles.modalTitleStyle}>{'UnionDigital Account Details'}</Text>
          <Text onPress={onClose} style={styles.closeTextStyle}>
            {'Close'}
          </Text>
        </View>
        <View style={styles.itemContainerStyle}>
          <Text style={styles.itemTitleStyle}>{'Account Name'}</Text>
          <Text style={styles.itemValueStyle}>{wallet.bankAccount.accountHolderName}</Text>
        </View>
        <View style={styles.itemContainerStyle}>
          <Text style={styles.itemTitleStyle}>{'Account Number'}</Text>
          <Text onPress={copy} style={styles.itemValueStyle}>
            {wallet.bankAccount.accountNumber}
          </Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.copyContainerStyle} onPress={copy}>
            <CopyIcon width={15} height={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainerStyle}>
          <Text style={styles.itemTitleStyle}>{'Mobile Number'}</Text>
          <Text style={styles.itemValueStyle}>
            {phoneNumber.startsWith('0') ? phoneNumber : `+${phoneNumber}`}
          </Text>
        </View>
        <View style={styles.itemContainerStyle}>
          <Text style={styles.itemTitleStyle}>{'Current Balance'}</Text>
          <Text style={styles.itemValueStyle}>
            {useCurrencyFormat(wallet.currentBalance, wallet.currencyCode)}
          </Text>
        </View>
      </View>
      {isCopied && (
        <View style={styles.copiedContainerStyle}>
          <Text style={styles.copiedTextStyle}>{'Text has been copied to your clipboard.'}</Text>
        </View>
      )}
    </BottomSheet>
  );
};

export default WalletDetailsModal;
