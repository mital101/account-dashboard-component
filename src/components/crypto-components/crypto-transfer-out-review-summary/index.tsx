import { CryptoTransferOutReviewSummaryComponentProps } from './types';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from 'react-native';
import useMergeStyles from './styles';
import { Button, ThemeContext, useCurrencyFormat } from 'react-native-theme-component';
import AlertModal from '../../alert-model';
import RowInfo from '../../row-info';
import { WalletContext } from '../../../context/wallet-context';
import { WalletService } from '../../../services/wallet-service';
const walletService = WalletService.instance();
export type CryptoTransferOutReviewSummaryRef = {
  onCancel: () => void;
};

const CryptoTransferOutReviewSummaryComponent = forwardRef(
  ({ props, style }: CryptoTransferOutReviewSummaryComponentProps, ref) => {
    const { onGoBack, onSuccess,defaultData } = props || {};
    const [isShowCancelAlert, setIsShowCancelAlert] = useState<boolean>();
    const [isShowErrorAlert, setIsShowErrorAlert] = useState<boolean>();
    const styles = useMergeStyles(style);
    const { fonts } = useContext(ThemeContext);
    const { initMoneyOut, amount = 0, isLoadingInitMoneyOut, unionWallet, cryptoWallet } = useContext(WalletContext);
    const formatedAmount = useCurrencyFormat(amount, 'PHP');
    const formatedAmountDeposite = useCurrencyFormat(amount, 'PHP');

    useImperativeHandle(
      ref,
      (): CryptoTransferOutReviewSummaryRef => ({
        onCancel: async () => {
          setIsShowCancelAlert(true);
        },
      })
    );

    useEffect(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBack);
      return () => backHandler.remove();
    }, []);

    const handleBack = () => {
      setIsShowCancelAlert(true);
      return true;
    };

    const onConfirmAlertCancel = () => {
      onGoBack && onGoBack();
      setIsShowCancelAlert(false);
    }

    const onConfirmAlertAccept = () => {
      setIsShowCancelAlert(false);
    }

    const onConfirm = async () => {
      if (!defaultData) {
        await initMoneyOut();
        onSuccess && onSuccess();
      }else{
        const result = await walletService.cryptoOutInitital(
          defaultData.amountToSend,
          defaultData.currency,
          defaultData.receiverAccountNumber,
          defaultData.sendTo ,
          defaultData.firstName,
          defaultData.lastName,
          defaultData.exchangeName
        );
        onSuccess && onSuccess(result.Data.DomesticPaymentId);
      }
    }

    const onReload = async () => {
      await initMoneyOut();
      onSuccess && onSuccess();
    }
    
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.pageTitle}>{'Review summary'}</Text>
            <View style={styles.pageSubTitleView}>
              <Text style={styles.pageSubTitle}>
                {!defaultData?
                  'Please make sure all details are correct. Your exchange account will be debited and this transaction will be irreversible once confirmed.' :
                  'Please ensure all details are correct. Your crypto account will be debited and this transaction will be irreversible once confirmed.'
                }
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.infoView}>
                <RowInfo
                  props={{
                    title: defaultData ? 'Amount in Crypto' :'Amount in PHP',
                    value: defaultData ? `${defaultData.amountToSend} ${defaultData.currency}`:`${formatedAmount}`,
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Send Crypto From',
                    value: `My Crypto Pitaka\n${cryptoWallet?.bankAccount.accountHolderName}`,
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Send Crypto To',
                    value: defaultData ? defaultData.sendTo:`My Pitaka\n${unionWallet?.bankAccount.accountHolderName}\n${unionWallet?.bankAccount.accountNumber}`,
                  }}
                />
                <RowInfo
                  props={{
                    title: defaultData?'Network':'When',
                    value: defaultData?defaultData.network:`Send instantly`,
                  }}
                />
                {defaultData && <>
                  <RowInfo
                    props={{
                      title: 'First Name of Recipient',
                      value: defaultData.firstName,
                    }}
                  />
                  <RowInfo
                    props={{
                      title: 'Last Name of Recipient',
                      value: defaultData.lastName,
                    }}
                  />
                  <RowInfo
                    props={{
                      title: 'Receiving Exchange Name',
                      value: defaultData.exchangeName,
                    }}
                  />
                  <RowInfo
                    props={{
                      title: 'Transaction ID',
                      value: defaultData?.transactionId,
                    }}
                  />
                </>}
                <RowInfo
                  props={{
                    title: 'Transaction Fee',
                    value: defaultData?defaultData.transactionfee:'FREE',
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Total amount to be deposited into address',
                    value: defaultData?`${defaultData.totalAmount} ${defaultData.currency}`:`${formatedAmountDeposite}`,
                  }}
                  style={{
                    value: {
                      color: '#3E2D68',
                      fontFamily: fonts.semiBold
                    }
                  }}
                />
              </View>
            </View>
        </ScrollView>
        <View style={styles.actionWrapper}>
          <Button label="Confirm" onPress={onConfirm} isLoading={isLoadingInitMoneyOut} />
        </View>
        <AlertModal
          isVisible={isShowCancelAlert}
          title={'Cancel Transfer'}
          onConfirmed={onConfirmAlertCancel}
          onCancel={onConfirmAlertAccept}
          iconColor={'#FBC02D'}
          subtitle={'Do you wish to cancel this transfer? All details will be discarded once cancelled.'}
          btnLabel={'Yes, cancel transfer'}
          secondaryBtnLabel={'No, continue the transfer.'}
        />
        <AlertModal
          isVisible={isShowErrorAlert}
          title={'Something Went Wrong'}
          onConfirmed={onReload}
          iconColor={'#FF9800'}
          subtitle={'We’re having difficulty connecting to our server. Please try again.'}
          btnLabel={'Reload'}
        />
      </SafeAreaView>
    );
  }
);

export default CryptoTransferOutReviewSummaryComponent;
