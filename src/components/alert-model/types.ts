import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
    
export type AlertModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  iconWrapper?: StyleProp<ViewStyle>;
  buttonAction?: StyleProp<ViewStyle>;
  secondaryBtnAction?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  subtitle?: StyleProp<TextStyle>;
  secondaryBtnLabel?: StyleProp<TextStyle>;
};

export type AlertModalProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  icon?: ReactNode;
  iconColor?: string;
  btnLabel?: string;
  secondaryBtnLabel?: string;
  onConfirmed?: () => void;
  onCancel?: () => void;
  onBackdropPress?: () => void;
  isVisible?: boolean;
  style?: AlertModalStyles;
  backdropOpacity?: number
};
