import { CryptoTransactionPostingComponentProps } from './types';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import useMergeStyles from './styles';
import RowInfo from '../../row-info';
import { Button, useCurrencyFormat } from 'react-native-theme-component';
import { InfoIcon, UnionDigitalBankIcon } from '../../../assets/images';
import LoadingSpinner from '../../loading-spinner';
import moment from 'moment';
import { WalletContext } from '../../../context/wallet-context';

const CryptoTransactionPostingComponent = ({
  props,
  style,
}: CryptoTransactionPostingComponentProps) => {
  const styles = useMergeStyles(style);
  const { onBackToDashboard, onBackToTransfer, onGoToHelpCenter, amount, type,
    status,
    date,
    refNumber 
  } =
    props || {};

  const {isRefreshingWallets, currentTransfer, unionWallet, cryptoWallet} = useContext(WalletContext);
  const isTransferIn = currentTransfer === 'moneyin';
  const from = isTransferIn ? unionWallet : cryptoWallet;
  const to = isTransferIn ? cryptoWallet : unionWallet;
  const fromString = `${from?.bankAccount.bankCode} \n${from?.bankAccount.accountHolderName}`;
  const toString = `${to?.bankAccount.bankCode} \n${to?.bankAccount.accountHolderName} \n${to?.bankAccount.accountNumber}`;

  const isPending = status === 'Initialized' ||
  status === 'AcceptedCreditSettlementCompleted' ||
  status === 'AcceptedSettlementCompleted' ||
  status === 'AcceptedSettlementInProcess' ||
  status === 'AcceptedWithoutPosting' ||
  status === 'Pending';

  const isSuccess = !isPending && status === 'Complete';


  const formatedAmount = useCurrencyFormat(amount || 0, 'PHP');
  const formatedDate = moment(`${date}Z`).format(
    'ddd DD, YYYY HH:ss A'
  );

  const pendingTitleColor = '#3E2D68';
  const pendingStatusColor = '#F8981D';

  if (isRefreshingWallets) {
    return (
      <View style={styles.containerCenter}>
        <View style={styles.content}>
          <Text style={styles.title}>Hang on for a moment</Text>
          <View style={styles.subTitleWrapper}>
            <Text style={styles.subTitle}>
              We’re currently setting up your transaction.
            </Text>
          </View>
          <View style={styles.circleProgressWrapper}>
            <LoadingSpinner />
          </View>
        </View>
      </View>
    );
  }


  if (!isSuccess && !isPending) {
    return (
      <View style={styles.containerFailed}>
        <View style={styles.errorContentWrapper}>
          <View style={styles.columnBetween}>
            <View>
              <View style={styles.errorTitleWrapper}>
                <View style={styles.iconErrorWrapper}>
                  <InfoIcon width={80} height={80} color={'#E06D6D'} />
                </View>
                <Text style={styles.statusLabel}>Transfer Unsuccessful</Text>
                <View style={styles.errorMessageWrapper}>
                  <Text style={styles.errorMessageLabel}>
                    We’ve encountered a problem with your transaction. Your
                    crypto has been returned to your crypto pitaka. Please try
                    again later.
                  </Text>
                </View>
              </View>
              <View style={styles.rowErrorBetween}>
                <Text style={[styles.infoTitle, styles.errorInfoTitleColor]}>
                  Reference No.
                </Text>
                <Text style={[styles.infoSubTitle, styles.errorInfoTitleColor]}>
                  {refNumber}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Button
            label={'Back to Crypto Dashboard'}
            onPress={onBackToDashboard}
          />
          <Button
            label={'Have issues? Visit our Help Center!'}
            onPress={onGoToHelpCenter}
            bgColor={'transparent'}
            style={{
              primaryContainerStyle: styles.btnTransparent,
              primaryLabelStyle: styles.labelBtnTransaprent,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.titleSuccess, isPending && {color: pendingTitleColor}]}>{isPending ? 'Transaction Submitted' : 'Transaction Successful!'}</Text>
        <View style={styles.subTitleSuccessWrapper}>
          <Text style={styles.subTitleSuccess}>
            {isPending ? 'Your transfer-out is expected to arrive in 30 minutes.' : `#UDidIt! You have successfully transferred money from your ${isTransferIn ? 'Pitaka' : 'Crypto Pitaka'} to your ${!isTransferIn ? 'Pitaka' : 'Crypto Pitaka'}. See transaction details below:`}
          </Text>
        </View>
        <View style={styles.contentSuccess}>
          <RowInfo
            props={{
              title: 'Transaction Type',
              value: `${type}`,
            }}
          />
          <RowInfo
            props={{
              title: 'Amount to Send',
              value: `${formatedAmount}`,
            }}
          />
          <RowInfo
            props={{
              title: 'Transaction Status ',
              value: isPending ? `Pending` : `Completed`,
            }}
            style={{
              value: [styles.completedTextColor, , isPending && {color: pendingStatusColor}],
            }}
          />
          <RowInfo
            props={{
              title: 'Send Money From',
              value: fromString,
            }}
          />
          <RowInfo
            props={{
              title: 'Send Money To',
              value: toString,
            }}
          />
        </View>
        <View>
          <View style={styles.rowBetween}>
            <Text style={styles.infoTitle}>Transaction Date / Time</Text>
            <Text style={styles.infoSubTitle}>{formatedDate}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.infoTitle}>Reference No.</Text>
            <Text style={styles.infoSubTitle}>{refNumber}</Text>
          </View>
        </View>

        <View style={styles.logoContainer}>
          <UnionDigitalBankIcon height={40} width={150} />
        </View>
        <View style={styles.btnActionsWrapper}>
          <Button
            label={'Make Another Transaction'}
            onPress={onBackToTransfer}
          />
          <Button
            label={'Back to Crypto Dashboard'}
            onPress={onBackToDashboard}
            bgColor={'transparent'}
            style={{
              primaryContainerStyle: styles.btnTransparent,
              primaryLabelStyle: styles.labelBtnTransaprent,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CryptoTransactionPostingComponent;
