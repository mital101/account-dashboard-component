import React, { ReactNode, useContext, useRef } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import { ArrowBack } from '../../assets/images';
import { PaymentTerminalName, Transaction } from '../../model';
import useMergeStyles from './styles';
import ViewShot from 'react-native-view-shot';
import Share, { ShareOptions } from 'react-native-share';
import { isEmpty } from 'lodash';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';

export type TransactionDetailsComponentProps = {
  transaction: Transaction;
  onBack: () => void;
  appIcon?: ReactNode;
  shareOptions?: ShareOptions;
  transactionDateFormat?: string;
  style?: TransactionDetailsComponentStyles;
};

export type TransactionDetailsComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  screenshotContainerStyle?: ViewStyle;
  mainContainerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  leftButtonStyle?: StyleProp<ViewStyle>;
  rightButtonStyle?: StyleProp<ViewStyle>;
  rightButtonTitleStyle?: StyleProp<TextStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  valueTextStyle?: StyleProp<TextStyle>;
  rowItemContainerStyle?: StyleProp<ViewStyle>;
  blockSpaceContainerStyle?: StyleProp<ViewStyle>;
  totalAmountTextStyle?: StyleProp<TextStyle>;
  shareButtonContainerStyle?: StyleProp<ViewStyle>;
  shareButtonLabelStyle?: StyleProp<TextStyle>;
};

const TransactionDetailsComponent = ({
  style,
  transaction,
  onBack,
  transactionDateFormat,
  appIcon,
  shareOptions,
}: TransactionDetailsComponentProps) => {
  const styles: TransactionDetailsComponentStyles = useMergeStyles(style);
  const { colors, i18n } = useContext(ThemeContext);
  const viewShotRef = useRef<any>(null);
  const _dateFormat = transactionDateFormat ?? 'MMM D, YYYY / HH:mm A';

  const totalAmount = transaction.amount.amount + (transaction.totalFeeAmount?.amount ?? 0);

  const share = async () => {
    const res = await viewShotRef?.current?.capture();
    const urlString = `data:image/jpeg;base64,${res}`;
    const options = {
      ...shareOptions,
      url: urlString,
    };
    await Share.open(options);
  };

  const save = async () => {
    const res = await viewShotRef?.current?.capture();
    const name = `transaction-${transaction.txnId}.png`;
    const dirs =
      Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.LibraryDir : RNFetchBlob.fs.dirs.DownloadDir;
    const path = `${dirs}/${name}`;
    try {
      await RNFetchBlob.fs.writeFile(path, res.replace(/\r?\n|\r/g, ''), 'base64');
      if (Platform.OS === 'ios') {
        RNFetchBlob.ios.previewDocument(path);
      } else {
        RNFetchBlob.android.actionViewIntent(path, 'image/*');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _isShowPurposeTransfer =
    transaction.paymentTerminal.name !== PaymentTerminalName.ud &&
    !isEmpty(transaction.txnCategory);

  const _isDebit = transaction.txnType === 'Debit';

  return (
    <View style={styles.containerStyle}>
      <SafeAreaView style={styles.headerContainerStyle}>
        <TouchableOpacity activeOpacity={0.8} style={styles.leftButtonStyle} onPress={onBack}>
          <ArrowBack color={colors.primaryColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={save} activeOpacity={0.8} style={styles.rightButtonStyle}>
          <Text style={styles.rightButtonTitleStyle}>
            {i18n?.t('recent_transaction_component.btn_save_gallery') ?? 'Save to gallery'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ViewShot
          ref={viewShotRef}
          options={{
            quality: 1,
            result: 'base64',
          }}
          style={styles.screenshotContainerStyle}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.headerTitleStyle}>
              {i18n?.t('recent_transaction_component.lbl_transaction_details') ??
                'Transaction Details'}
            </Text>
            <View style={styles.mainContainerStyle}>
              <Text style={styles.labelTextStyle}>
                {i18n?.t('recent_transaction_component.lbl_type_transaction') ??
                  'Type of transaction'}
              </Text>
              <Text style={styles.valueTextStyle}>{transaction.txnType}</Text>
              {_isDebit && (
                <>
                  <View style={styles.blockSpaceContainerStyle} />
                  <Text style={styles.labelTextStyle}>
                    {i18n?.t('recent_transaction_component.lbl_send_money_from') ??
                      'Send money from'}
                  </Text>
                  {!isEmpty(transaction.sourceAccount.bankInfo.legalName) && (
                    <Text style={styles.valueTextStyle}>
                      {transaction.sourceAccount.bankInfo.legalName}
                    </Text>
                  )}
                  {!isEmpty(transaction.sourceAccount.accountName) && (
                    <Text style={styles.valueTextStyle}>
                      {transaction.sourceAccount.accountName}
                    </Text>
                  )}
                  {!isEmpty(transaction.sourceAccount.accountNumber) && (
                    <Text style={styles.valueTextStyle}>
                      {transaction.sourceAccount.accountNumber}
                    </Text>
                  )}
                </>
              )}
              <View style={styles.blockSpaceContainerStyle} />
              <Text style={styles.labelTextStyle}>
                {_isDebit
                  ? i18n?.t('recent_transaction_component.lbl_send_money_to') ?? 'Send money to'
                  : i18n?.t('recent_transaction_component.lbl_received_from') ?? 'Received from'}
              </Text>
              {!isEmpty(transaction.destinationAccount.bankInfo.legalName) && (
                <Text style={styles.valueTextStyle}>
                  {transaction.destinationAccount.bankInfo.legalName}
                </Text>
              )}
              {!isEmpty(transaction.destinationAccount.accountName) && (
                <Text style={styles.valueTextStyle}>
                  {transaction.destinationAccount.accountName}
                </Text>
              )}
              {!isEmpty(transaction.destinationAccount.accountNumber) && (
                <Text style={styles.valueTextStyle}>
                  {transaction.destinationAccount.accountNumber}
                </Text>
              )}
              {!isEmpty(transaction.recipientDescription) && (
                <>
                  <View style={styles.blockSpaceContainerStyle} />
                  <Text style={styles.labelTextStyle}>
                    {i18n?.t('recent_transaction_component.lbl_note_to_recipient') ??
                      'Note to recipient'}
                  </Text>
                  <Text style={styles.valueTextStyle}>{transaction.recipientDescription}</Text>
                </>
              )}
              {_isShowPurposeTransfer && (
                <>
                  <View style={styles.blockSpaceContainerStyle} />
                  <Text style={styles.labelTextStyle}>
                    {i18n?.t('recent_transaction_component.lbl_purpose_transfer') ??
                      'Purpose of transfer'}
                  </Text>
                  <Text style={styles.valueTextStyle}>{transaction.txnCategory}</Text>
                  {!isEmpty(transaction.description) && (
                    <Text style={styles.valueTextStyle}>{transaction.description}</Text>
                  )}
                </>
              )}
              {transaction.paymentTerminal.name === PaymentTerminalName.ud && (
                <>
                  <View style={styles.blockSpaceContainerStyle} />
                  <Text style={styles.labelTextStyle}>
                    {i18n?.t('recent_transaction_component.lbl_when') ?? 'When'}
                  </Text>
                  <Text style={styles.valueTextStyle}>{'Send instantly'}</Text>
                </>
              )}
              {transaction.paymentTerminal.name === PaymentTerminalName.instapay && (
                <>
                  <View style={styles.blockSpaceContainerStyle} />
                  <Text style={styles.labelTextStyle}>
                    {i18n?.t('recent_transaction_component.lbl_send_via') ?? 'Send via'}
                  </Text>
                  <Text style={styles.valueTextStyle}>{'Instapay'}</Text>
                </>
              )}
              {transaction.paymentTerminal.name === PaymentTerminalName.pesonet && (
                <>
                  <View style={styles.blockSpaceContainerStyle} />
                  <Text style={styles.labelTextStyle}>
                    {i18n?.t('recent_transaction_component.lbl_send_via') ?? 'Send via'}
                  </Text>
                  <Text style={styles.valueTextStyle}>{'Pesonet'}</Text>
                </>
              )}
              <View style={styles.blockSpaceContainerStyle} />
              <Text style={styles.labelTextStyle}>
                {i18n?.t('recent_transaction_component.lbl_amount') ?? 'Amount'}
              </Text>
              <Text style={styles.valueTextStyle}>
                {`${useCurrencyFormat(transaction.amount.amount, transaction.amount.currency)}`}
              </Text>
              {_isDebit && (
                <>
                  <View style={styles.blockSpaceContainerStyle} />
                  <Text style={styles.labelTextStyle}>
                    {i18n?.t('recent_transaction_component.lbl_transaction_fee') ??
                      'Transaction Fee'}
                  </Text>
                  <Text style={styles.valueTextStyle}>
                    {transaction.totalFeeAmount
                      ? `${useCurrencyFormat(
                          transaction.totalFeeAmount.amount,
                          transaction.totalFeeAmount.currency
                        )}`
                      : 'FREE'}
                  </Text>
                </>
              )}
              <View style={styles.blockSpaceContainerStyle} />
              <Text style={styles.labelTextStyle}>
                {i18n?.t('recent_transaction_component.lbl_total_amount') ?? 'Total amount'}
              </Text>
              <Text style={styles.totalAmountTextStyle}>
                {`${useCurrencyFormat(totalAmount, transaction.amount.currency)}`}
              </Text>
            </View>
            <View style={styles.rowItemContainerStyle}>
              <Text style={styles.labelTextStyle}>
                {i18n?.t('recent_transaction_component.lbl_transaction_date') ??
                  'Transaction Date / Time'}
              </Text>
              <Text style={styles.valueTextStyle}>
                {moment(transaction.txnDateTime).format(_dateFormat)}
              </Text>
            </View>
            <View style={styles.rowItemContainerStyle}>
              <Text style={styles.labelTextStyle}>
                {i18n?.t('recent_transaction_component.lbl_reference_no') ?? 'Reference No.'}
              </Text>
              <Text style={styles.valueTextStyle}>{transaction.txnCode}</Text>
            </View>
            {appIcon}
          </ScrollView>
        </ViewShot>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.shareButtonContainerStyle}
        onPress={share}
      >
        <Text style={styles.shareButtonLabelStyle}>
          {i18n?.t('recent_transaction_component.btn_share') ?? 'Share'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionDetailsComponent;
