import React, { ReactNode, useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { BNoTransactionIcon } from '../../../assets/images';
import { EmptyTransactionStyle } from '../../../types';
import useMergeStyles from './styles';

export type EmptyTransactionProps = {
  emptyIcon?: ReactNode;
  style?: EmptyTransactionStyle;
};

const EmptyTransactionComponent = (props: EmptyTransactionProps) => {
  const { emptyIcon, style } = props;
  const { i18n } = useContext(ThemeContext);

  const styles: EmptyTransactionStyle = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.iconStyle}>{emptyIcon ?? <BNoTransactionIcon />}</View>
      <Text style={styles.messageStyle}>
        {i18n?.t('transaction_list_component.msg_no_transaction') ?? 'No Transactions Found'}
      </Text>
    </View>
  );
};

export default EmptyTransactionComponent;
