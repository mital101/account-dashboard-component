import { CardVerifyOTPComponentProps } from './types';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import useMergeStyles from './styles';
import { Button, OTPField } from 'react-native-theme-component';
import { OTPFieldRef } from 'react-native-theme-component/src/otp-field';
import CountdownTimer, {
  CountDownTimerRef,
} from 'react-native-theme-component/src/countdown-timer';

const CardVerifyOTPComponent = ({
  props,
  style,
}: CardVerifyOTPComponentProps) => {
  const styles = useMergeStyles(style);
  const otpRef = useRef<OTPFieldRef>();
  const countdownRef = useRef<CountDownTimerRef>();
  const { error, generateOTP, verifyOTP, onVerifySuccess, onVerifyFailed, isLoading } = props || {};
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    generateOTP();
  }, []);

  useEffect(() => {
    if (value && value.length === 6) {
      onValidateOTP();
    }
  }, [value]);

  const onValidateOTP = async () => {
    const isSuccess = await verifyOTP(value);
    console.log('onValidateOTP', isSuccess);
    if(isSuccess) {
      onVerifySuccess && onVerifySuccess();
    } else {
      onVerifyFailed && onVerifyFailed();
    }
  };

  const onResendOTP = () => {
    countdownRef.current?.restart();
    generateOTP();
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
              <Text style={styles.errorText}>{`${error}. Please try again.`}</Text>
            </View>
          )}
          <View style={styles.countdownWrapper}>
            <Text style={styles.notReceivedCodeLabel}>
              {"Didn't receive a code? "}
            </Text>
            <CountdownTimer
              ref={countdownRef}
              duration={60  }
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
          onPress={onValidateOTP}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default CardVerifyOTPComponent;
