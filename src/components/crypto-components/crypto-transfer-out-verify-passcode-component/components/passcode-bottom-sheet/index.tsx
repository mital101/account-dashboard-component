import ProgressCircle from '../progress-circle';
import React, { useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, Button } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type PasscodeModalProps = {
  isVisible: boolean;
  onClose: () => void;
  passcode: string;
  countdownTime?: number;
  style?: PasscodeModalStyles;
};

export type PasscodeModalStyles = {
  container?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  closeTitle?: StyleProp<TextStyle>;
  titleRowSelect?: StyleProp<TextStyle>;
  header?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  passcode?: StyleProp<TextStyle>;
  actionsView?: StyleProp<ViewStyle>;
  btnCancel?: StyleProp<ViewStyle>;
  countdownCircleWrapper?: StyleProp<ViewStyle>;
  labelBtnCancel?: StyleProp<TextStyle>;
};

const PasscodeModal = ({
  style,
  isVisible,
  onClose,
  passcode,
  countdownTime = 60,
}: PasscodeModalProps) => {
  const styles: PasscodeModalStyles = useMergeStyles(style);
  const maxCountDownTime = 60;
  const [cdTime, setCDTime] = useState<number>(countdownTime);
  const progressPercent =
    ((maxCountDownTime - cdTime) / maxCountDownTime) * 100;

  useEffect(() => {
    if (cdTime > 0) {
      setTimeout(() => {
        setCDTime(cdTime - 1);
      }, 1000);
    }
  }, [cdTime]);

  const onContinue = () => {
    console.log('onContinue');
    onClose();
  };

  const onCancel = () => {
    console.log('onContinue');
    onClose();
  };

  return (
    <BottomSheet onBackButtonPress={onClose} isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{'6-digit in-app passcode'}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.passcode}>{passcode}</Text>
          <View style={styles.countdownCircleWrapper}>
            <ProgressCircle
              width={125}
              label={`${cdTime}`}
              percent={progressPercent}
              color={'#3E2D68'}
            />
          </View>
        </View>
        <View style={styles.actionsView}>
          <Button label={'Continue'} onPress={onContinue} />
          <Button
            label={'Cancel'}
            onPress={onCancel}
            bgColor={'#FFFFFF'}
            style={{
              primaryContainerStyle: styles.btnCancel,
              primaryLabelStyle: styles.labelBtnCancel,
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default PasscodeModal;
