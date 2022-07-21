import { CryptoReviewSummaryComponentProps } from './types';
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

export type CryptoReviewSummaryRef = {
  onCancel: () => void;
};

const CryptoReviewSummaryComponent = forwardRef(
  ({ props, style }: CryptoReviewSummaryComponentProps, ref) => {
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
                {'Please make sure all account details are correct. Your account will be debited and this transaction will be irreversible once confirmed.'}
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.infoView}>
                <RowInfo
                  props={{
                    title: 'Amount in PHP',
                    value: '₱ 1,000.00',
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Send Money From',
                    value: `My Pitaka\nBen Santos\n1234567890`,
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Send Money To',
                    value: 'My Crypto Pitaka\nBen Santos',
                  }}
                />
                <RowInfo
                  props={{
                    title: 'When',
                    value: 'Send instantly',
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
                    value: '₱ 1,000.00',
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

export default CryptoReviewSummaryComponent;
