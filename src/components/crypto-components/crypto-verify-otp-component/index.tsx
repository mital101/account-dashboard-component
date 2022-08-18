import { CryptoVerifyOTPComponentProps } from './types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import useMergeStyles from './styles';
import { Button, OTPField } from 'react-native-theme-component';
import { OTPFieldRef } from 'react-native-theme-component/src/otp-field';
import CountdownTimer, {
  CountDownTimerRef,
} from 'react-native-theme-component/src/countdown-timer';
import { WalletService } from '../../../services/wallet-service';
import { WalletContext } from '../../../context/wallet-context';

const walletService = WalletService.instance();

const CryptoVerifyOTPComponent = ({
  props,
  style,
}: CryptoVerifyOTPComponentProps) => {
  const styles = useMergeStyles(style);
  const otpRef = useRef<OTPFieldRef>();
  const countdownRef = useRef<CountDownTimerRef>();
  const { onConfirmed } = props || {};
  const { paymentId, initMoneyin, initMoneyOut, currentTransfer } =
    useContext(WalletContext);
  const [isLoadingOtpVerification, setIsLoadingOtpVerification] =
    useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>();
  const isTransferIn = currentTransfer === 'moneyin';

  useEffect(() => {
    if (value && value.length === 6) {
      handleCompleteInputOTP();
    }
  }, [value]);

  const handleCompleteInputOTP = () => {
    onConfirm();
  };

  const onConfirm = async () => {
    setIsLoadingOtpVerification(true);
    const result = isTransferIn
      ? await walletService.moneyInConfirmation(paymentId || '', value)
      : await walletService.moneyOutConfirmation(paymentId || '', value);

    setIsLoadingOtpVerification(false);
    if (result.Data) {
      onConfirmed &&
        onConfirmed(
          result.Data.Initiation.InstructedAmount.Amount,
          `${result.Data.Initiation.InstructedAmount.Currency} ${
            isTransferIn ? 'transfer-in' : 'transfer-out'
          }`,
          result.Data.Status,
          result.Data.StatusUpdateDateTime,
          result.Data.Initiation.SupplementaryData.PaymentServiceProviderExt
            .PspReference
        );
    } else if (result.response?.data?.errors) {
      setError(
        `${result.response?.data?.errors[0].message}. Please try again.`
      );
      otpRef.current?.clearInput();
      otpRef.current?.focus();
    }
  };

  const onResendOTP = () => {
    countdownRef.current?.restart();
    isTransferIn ? initMoneyin() : initMoneyOut();
    otpRef.current?.clearInput();
    otpRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.pageTitle}>{'Please enter One-Time Password'}</Text>
        <View style={styles.pageSubTitleView}>
          <Text style={styles.pageSubTitle}>
            {
              'Enter the One-Time Password (OTP) sent on your registered mobile number.'
            }
          </Text>
        </View>
        <View style={styles.content}>
          <OTPField
            ref={otpRef}
            cellCount={6}
            onChanged={setValue}
            style={{
              focusCellContainerStyle: { borderBottomColor: '#1EBCE8' },
            }}
          />
          {error && (
            <View style={styles.errorWrapper}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <View style={styles.countdownWrapper}>
            <Text style={styles.notReceivedCodeLabel}>
              {"Didn't receive a code? "}
            </Text>
            <CountdownTimer
              ref={countdownRef}
              duration={60}
              formatTime={(sec: number) => `Send another (in ${sec} sec)`}
              endText={'Send another'}
              style={{
                endTextStyle: styles.sendAnotherLabel,
                runningTextStyle: styles.durationLabel,
              }}
              onResend={onResendOTP}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.actionWrapper}>
        <Button
          label="Continue"
          onPress={onConfirm}
          isLoading={isLoadingOtpVerification}
        />
      </View>
    </SafeAreaView>
  );
};

export default CryptoVerifyOTPComponent;
