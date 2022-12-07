import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface ADBCardComponentStyleType {
  containerStyle?: StyleProp<ViewStyle>;
}
export interface ADBCardComponentPropType {
  style?: ADBCardComponentStyleType;
  balanceCardStyle?: BalanceStyle;
  activateVirtualCardStyle?: ActivateVirtualCardStyle;
  walletItemStyle?:WalletItemStyle
}

export interface BalanceStyle {
  containerStyle?: StyleProp<ViewStyle>;
  accountBalanceText?: StyleProp<TextStyle>;
  accountBalance?: StyleProp<TextStyle>;
}

export interface ActivateVirtualCardStyle {
  containerStyle?: StyleProp<ViewStyle>;
  virtualCardTextStyle?: StyleProp<TextStyle>;
  virtualCardIconContainerStyle?:StyleProp<ViewStyle>
}

export interface WalletItemStyle {
  containerStyle?:StyleProp<ViewStyle>;
  rightContainerStyle?:StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
}
