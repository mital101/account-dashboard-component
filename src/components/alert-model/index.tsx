import { InfoIcon } from '../../assets/info.icon';
import { AlertModalProps } from './types';
import useMergeStyles from './styles';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button, ThemeContext } from 'react-native-theme-component';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');


const AlertModal = (props: AlertModalProps) => {
  const {
    title,
    subtitle,
    children,
    btnLabel,
    isVisible,
    secondaryBtnLabel,
    onConfirmed,
    onCancel,
    icon,
    style,
    iconColor,
    backdropOpacity,
    onBackdropPress,
    ...restProps
  } = props;
  const { colors } = useContext(ThemeContext);
  const [_isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
        setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isVisible]);

  const styles = useMergeStyles(style);
  
  const Icon = icon ?? (
    <InfoIcon width={60} height={60} color={iconColor ? iconColor : colors.primaryColor} />
  );

  return (
    <Modal
      isVisible={_isVisible}
      deviceHeight={deviceHeight}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      backdropOpacity={backdropOpacity}
      onBackButtonPress={onBackdropPress}
      statusBarTranslucent
      {...restProps}
    >
      <View style={styles.containerStyle}>
        <View style={styles.iconWrapper}>
          <>
          {Icon}
          </>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {btnLabel && <View style={styles.buttonAction}>
         <Button label={btnLabel} onPress={onConfirmed} />
        </View>}
        {secondaryBtnLabel && <TouchableOpacity onPress={onCancel} style={styles.secondaryBtnAction}>
          <Text style={styles.secondaryBtnLabel}>{secondaryBtnLabel}</Text>
        </TouchableOpacity>}
      </View>
    </Modal>
  );
};

export default React.memo(AlertModal);
