import React, { ReactNode, useContext } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BNoWalletIcon, BPlusIcon } from '../../../assets/images';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';
import { CryptoLinkIcon,CryptoLinkIcon2,CryptoLinkIcon3,TransferinIcon,TransferoutIcon,TradeIcon } from "../../../assets/images";

export type EmptyWalletThemeProps = {
  style?: EmptyWalletThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
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
  onLinkAccountPressed?: () => void;
  style?: EmptyWalletThemeStyles;
};

const EmptyWalletComponent = (props: EmptyWalletComponentProps) => {
  const { message, style, onLinkAccountPressed, buttonLabel } = props;
  const { colors } = useContext(ThemeContext);

  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.containerWrapperStyle}>
      <CryptoLinkIcon2 width={60} height={60} />
      <Text style={styles.messageTextStyle}>{message ?? 'Buy and sell crypto now!'}</Text>
      <View
        style={styles.messageContainerStyle}
      >
        <Text style={styles.subMessageTextStyle}>{'Buy and sell crypto assets by transferring in pesos or crypto to your account'}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8} style={styles.buttonStyle} onPress={()=>{onLinkAccountPressed()}}><Text style={styles.buttonLabelTextStyle}>{'Activate my crypto account'}</Text></TouchableOpacity>
      <View
        style={styles.lineSeperatorStyle}
      >
      </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TransferinIcon width={70} height={70} />
        <TransferoutIcon width={70} height={70} />
        <TradeIcon width={70} height={70} />
      </View>
    </View>
  );
};

export default EmptyWalletComponent;
