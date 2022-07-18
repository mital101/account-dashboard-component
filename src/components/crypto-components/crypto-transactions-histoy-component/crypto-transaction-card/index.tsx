import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import useMergeStyles from './styles';

export type CryptoTransactionsCardComponentProps = {
  style?: CryptoTransactionHistoryCardStyles;
  props?: {
    data: any;
    isLastItem?: boolean;
    isFirstItem?: boolean;
    onSelect?: (idTransaction: string) => void;
  };
};

export type CryptoTransactionHistoryCardStyles = {
  container?: StyleProp<ViewStyle>;
  row?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  subTitle: StyleProp<TextStyle>;
  verticalMargin?: StyleProp<ViewStyle>;
  borderRadiusTop?: StyleProp<ViewStyle>;
  borderRadiusBottom?: StyleProp<ViewStyle>;
};

const CryptoTransactionsCardComponent = ({
  style,
  props,
}: CryptoTransactionsCardComponentProps) => {
  const { data, isLastItem, isFirstItem, onSelect } = props || {};
  const styles = useMergeStyles(style);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isFirstItem && styles.borderRadiusTop,
        isLastItem && styles.borderRadiusBottom,
      ]}
      onPress={() => (onSelect ? onSelect(data.id) : true)}
    >
      <View style={styles.row}>
        <Text style={styles.title}>Transfer-out (BTC) </Text>
        <Text style={styles.title}>- 0.00038167 BTC</Text>
      </View>
      <View style={styles.verticalMargin} />
      <View style={styles.row}>
        <Text style={styles.subTitle}>Nov 17, 2021 02:56 PM </Text>
        <Text style={styles.subTitle}>Pending</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoTransactionsCardComponent;
