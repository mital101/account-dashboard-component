import React from 'react';
import { ViewCashflowComponentStyle } from '../../types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CashflowIcon, ArrowRightIcon } from '../../assets/images';
import mergeStyles from './styles';

export type ViewCashflowComponentProps = {
  i18n?: any;
  label?: string;
  message?: string;
  style?: ViewCashflowComponentStyle;
  onViewCashFlow?: () => void;
};

const ViewCashflowComponent = (props: ViewCashflowComponentProps) => {
  const { i18n, label, message, style, onViewCashFlow } = props;
  const styles: ViewCashflowComponentStyle = mergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelTextStyle}>
        {label ?? i18n?.t('wallet_component.lbl_cashflow') ?? 'Cashflow'}
      </Text>
      <View style={styles.messageContainerStyle}>
        <View style={innerStyles.messageWrap}>
          <Text style={styles.messageTextStyle}>
            {message ??
              i18n?.t('wallet_component.msg_cashflow') ??
              'View cashflow chart for your money in & money out to analyse your spending.'}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onViewCashFlow}
          style={styles.viewButtonContainerStyle}
        >
          <CashflowIcon size={15} color={'#fff'} />
          <Text style={styles.viewTitleTextStyle}>
            {i18n?.t('wallet_component.btn_view') ?? 'View'}
          </Text>
          <ArrowRightIcon size={9} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const innerStyles = StyleSheet.create({
  messageWrap: {
    flex: 1,
    paddingHorizontal: 13,
  },
});

export default ViewCashflowComponent;
