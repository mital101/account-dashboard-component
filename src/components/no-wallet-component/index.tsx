import React, { ReactNode, useContext } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BNoWalletIcon, BPlusIcon } from '../../assets/images';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';

export type EmptyWalletThemeProps = {
  style?: EmptyWalletThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
  components?: {
    placeholderIcon?: ReactNode;
    leftIcon?: ReactNode;
  };
};

export type EmptyWalletThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type EmptyWalletComponentProps = {
  message?: string;
  buttonLabel?: string;
  placeholderIcon?: ReactNode;
  leftIcon?: ReactNode;
  onLinkAccountPressed?: () => void;
  style?: EmptyWalletThemeStyles;
};

const EmptyWalletComponent = (props: EmptyWalletComponentProps) => {
  const { message, placeholderIcon, leftIcon, style, onLinkAccountPressed, buttonLabel } = props;
  const { colors } = useContext(ThemeContext);

  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      {placeholderIcon ?? <BNoWalletIcon size={105} />}
      <Text style={styles.messageTextStyle}>{message ?? 'No Bank Account Linked'}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.buttonContainerStyle}
        onPress={onLinkAccountPressed}
      >
        {leftIcon ?? <BPlusIcon width={20} height={20} color={colors.primaryColor} />}
        <Text style={styles.buttonTextStyle}>{buttonLabel ?? 'Link Bank Account'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyWalletComponent;
