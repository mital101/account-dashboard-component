import { EmptyTransactionIcon } from '../../../../assets/images';
import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';
import { Wallet } from '../../../../model';

export type EmptyTransactionComponentProps = {
  wallet: Wallet;
  onAddMoney: () => void;
  style?: EmptyTransactionComponentStyles;
};

export type EmptyTransactionComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  addMoneyTextStyle?: StyleProp<TextStyle>;
};

const EmptyTransactionComponent = ({
  style,
  onAddMoney,
  wallet,
}: EmptyTransactionComponentProps) => {
  const styles: EmptyTransactionComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <EmptyTransactionIcon width={153} height={141} />
      <Text style={styles.titleTextStyle}>
        {i18n?.t('recent_transaction_component.lbl_no_transactions') ??
          'You have no transactions yet.'}
      </Text>
      <Text style={styles.messageTextStyle}>
        {(
          i18n?.t('recent_transaction_component.msg_no_transactions') ??
          'Try adding money to your %s and enjoy the rest of the app features.'
        ).replace('%s', wallet.walletName)}
      </Text>
      <Text onPress={onAddMoney} style={styles.addMoneyTextStyle}>
        {i18n?.t('recent_transaction_component.btn_add_money_now') ?? 'Add money now'}
      </Text>
    </View>
  );
};

export default EmptyTransactionComponent;
