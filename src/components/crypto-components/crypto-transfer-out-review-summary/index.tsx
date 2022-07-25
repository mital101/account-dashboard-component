import { CryptoTransferOutReviewSummaryComponentProps } from './types';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from 'react-native';
import useMergeStyles from './styles';
import { Button } from 'react-native-theme-component';
import AlertModal from '../../alert-model';
import RowInfo from '../../row-info';

export type CryptoTransferOutReviewSummaryRef = {
  onCancel: () => void;
};

const CryptoTransferOutReviewSummaryComponent = forwardRef(
  ({ props, style }: CryptoTransferOutReviewSummaryComponentProps, ref) => {
    const { onGoBack, onSuccess } = props || {};
    const [isShowCancelAlert, setIsShowCancelAlert] = useState<boolean>();
    const [isShowErrorAlert, setIsShowErrorAlert] = useState<boolean>();
    const styles = useMergeStyles(style);

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
      onGoBack && onGoBack();
      setIsShowCancelAlert(false);
    }

    const onConfirmAlertAccept = () => {
      setIsShowCancelAlert(false);
    }

    const onConfirm = () => {
      console.log('confirm');
      onSuccess && onSuccess();
    }

    const onReload = () => {
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.pageTitle}>{'Review summary'}</Text>
            <View style={styles.pageSubTitleView}>
              <Text style={styles.pageSubTitle}>
                {'Please make sure all details are correct. Your exchange account will be debited and this transaction will be irreversible once confirmed.'}
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.infoView}>
                <RowInfo
                  props={{
                    title: 'Amount in Crypto',
                    value: '0.00038167 BTC',
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Send Crypto From',
                    value: `My Crypto Pitaka\nBen Santos`,
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Send Crypto To',
                    value: '15Jk6oy1yg5mvSFrKgEjgJ3ms7NkY28c9S',
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Network',
                    value: 'Bitcoin',
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Transaction Fee',
                    value: '0.00 BTC',
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Total amount to be deposited into address',
                    value: '0.00038167 BTC',
                  }}
                />
              </View>
            </View>
        </ScrollView>
        <View style={styles.actionWrapper}>
          <Button label="Confirm" onPress={onConfirm} />
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
