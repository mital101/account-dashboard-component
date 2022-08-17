import { CryptoReviewSummaryComponentProps } from './types';
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

export type CryptoReviewSummaryRef = {
  onCancel: () => void;
};

const CryptoReviewSummaryComponent = forwardRef(
  ({ props, style }: CryptoReviewSummaryComponentProps, ref) => {
    const { onGoBack, onSuccess } = props || {};
    const [isShowCancelAlert, setIsShowCancelAlert] = useState<boolean>();
    const [isShowErrorAlert, setIsShowErrorAlert] = useState<boolean>();
    const { fonts } = useContext(ThemeContext);
    const { initMoneyin, initMoneyOut, isLoadingInitMoneyOut, amount = 0, isLoadingInitMoneyIn, unionWallet, cryptoWallet, currentTransfer } = useContext(WalletContext);
    const isTransferIn = currentTransfer === 'moneyin';
    const styles = useMergeStyles(style);
    const formatedAmount = useCurrencyFormat(amount, 'PHP');
    const formatedAmountDeposite = useCurrencyFormat(amount, 'PHP');
    const from = isTransferIn ? unionWallet : cryptoWallet;
    const to = isTransferIn ? cryptoWallet : unionWallet;
    const fromString = `${from?.bankAccount.bankCode} \n${from?.bankAccount.accountHolderName}`;
    const toString = `${to?.bankAccount.bankCode} \n${to?.bankAccount.accountHolderName} \n${to?.bankAccount.accountNumber}`;

    useImperativeHandle(
      ref,
      (): CryptoReviewSummaryRef => ({
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
      setIsShowCancelAlert(false);
      onGoBack && onGoBack();
    }

    const onConfirmAlertAccept = () => {
      setIsShowCancelAlert(false);
    }

    const onConfirm = async () => {
      isTransferIn ? await initMoneyin() : await initMoneyOut();
      onSuccess && onSuccess();
    }

    const onReload = async () => {
      isTransferIn ? await initMoneyin() : await initMoneyOut();
      onSuccess && onSuccess();
    }
    
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.pageTitle}>{'Review summary'}</Text>
            <View style={styles.pageSubTitleView}>
              <Text style={styles.pageSubTitle}>
                {'Please make sure all account details are correct. Your account will be debited and this transaction will be irreversible once confirmed.'}
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.infoView}>
                <RowInfo
                  props={{
                    title: 'Amount in PHP',
                    value: `${formatedAmount}`,
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
                <RowInfo
                  props={{
                    title: 'When',
                    value: `Send instantly`,
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Transaction Fee',
                    value: 'FREE',
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Total amount to be deposited into Crypto Account',
                    value: `${formatedAmountDeposite}`,
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
          <Button label="Confirm" onPress={onConfirm} isLoading={isTransferIn ? isLoadingInitMoneyIn : isLoadingInitMoneyOut} />
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

export default CryptoReviewSummaryComponent;
