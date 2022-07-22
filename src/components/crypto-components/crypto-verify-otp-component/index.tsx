import { CryptoVerifyOTPComponentProps } from './types';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import useMergeStyles from './styles';
import { Button, OTPField } from 'react-native-theme-component';
import { OTPFieldRef } from 'react-native-theme-component/src/otp-field';
import CountdownTimer, {
  CountDownTimerRef,
} from 'react-native-theme-component/src/countdown-timer';

const CryptoVerifyOTPComponent = ({
  props,
  style,
}: CryptoVerifyOTPComponentProps) => {
  const styles = useMergeStyles(style);
  const otpRef = useRef<OTPFieldRef>();
  const countdownRef = useRef<CountDownTimerRef>();
  const { onConfirmed } = props || {};
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (value && value.length === 6) {
      handleCompleteInputOTP();
    }
  }, [value]);

  const handleCompleteInputOTP = () => {
    console.log('on complete input otp');
  };

  const onConfirm = () => {
    console.log('on confirm verify otp');
    onConfirmed && onConfirmed();
  };

  const onResendOTP = () => {
    console.log('onResendOTP');
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
        <Button label="Continue" onPress={onConfirm} />
      </View>
    </SafeAreaView>
  );
};

export default CryptoVerifyOTPComponent;
