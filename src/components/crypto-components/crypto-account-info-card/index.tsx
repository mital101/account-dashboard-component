import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import {
  ArrowRightIcon,
  EyesIcon,
  PytakaCurrencyIcon,
  TooltipIcon,
  TradeActiveIcon,
  TransferinActiveIcon,
  TransferoutActiveIcon,
} from '../../../assets/images';
import useMergeStyles from './styles';

export type AccountInfoCardThemeProps = {
  style?: AccountInfoCardThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type AccountInfoCardThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type AccountInfoCardProps = {
  message?: string;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: AccountInfoCardThemeStyles;
};

const AccountInfoCard = (props: AccountInfoCardProps) => {
  const { style } = props;
  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.rowSpaceBetween}>
        <View style={styles.row}>
          <Text style={styles.text}>My Balance</Text>
          <View style={styles.marginHorizontalView} />
          <TooltipIcon width={12} height={12} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: '#F8981D',
              fontWeight: '700',
              textDecorationLine: 'underline',
            }}
          >
            My Portfolio
          </Text>
          <View style={styles.marginHorizontalView} />
          <ArrowRightIcon width={15} height={15} color={'#F8981D'} />
        </View>
      </View>
      <View style={styles.rowSpaceBetween}>
        <View style={styles.rowCurrency}>
          <PytakaCurrencyIcon width={16} height={18} />
          <View style={styles.marginHorizontalView} />
          <Text style={styles.currency}>12,598.72</Text>
        </View>
        <EyesIcon width={18} height={18} />
      </View>
      <View style={styles.buttonWrapper}>
        <TransferinActiveIcon width={70} height={70} />
        <TransferoutActiveIcon width={70} height={70} />
        <TradeActiveIcon width={70} height={70} />
      </View>
    </View>
  );
};

export default AccountInfoCard;
