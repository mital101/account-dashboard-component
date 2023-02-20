import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface ADBCardComponentStyleType {
  containerStyle?: StyleProp<ViewStyle>;
}
export interface ADBCardComponentPropType {
  style?: ADBCardComponentStyleType;
  balanceCardStyle?: BalanceStyle;
  activateVirtualCardStyle?: ActivateVirtualCardStyle;
  walletItemStyle?: WalletItemStyle;
  onActivateVirtualCardPress: () => void;
  onBarcodePress?: () => void;
  onSettingsPress?: () => void;
}

export interface BalanceStyle {
  containerStyle?: StyleProp<ViewStyle>;
  accountBalanceText?: StyleProp<TextStyle>;
  accountBalance?: StyleProp<TextStyle>;
}

export interface ActivateVirtualCardStyle {
  containerStyle?: StyleProp<ViewStyle>;
  virtualCardTextStyle?: StyleProp<TextStyle>;
  virtualCardIconContainerStyle?: StyleProp<ViewStyle>;
}

export interface WalletItemStyle {
  containerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
}
export interface VirtualCardInfoProps {
  style?: VirtualCardInfoStyle;
  onActivateNowPress: () => void;
}

export interface VirtualCardInfoStyle {
  containerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
}

export interface AppPasscodeCompStyle {
  containerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  appCodeContainerStyle?: StyleProp<TextStyle>;
}
