import React, { useContext } from 'react';
import { ViewCashflowComponentStyle } from '../../../types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CashflowIcon, ArrowRightIcon } from '../../../assets/images';
import mergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';

export type ViewCashflowComponentProps = {
  style?: ViewCashflowComponentStyle;
  onViewCashFlow?: () => void;
};

const ViewCashflowComponent = (props: ViewCashflowComponentProps) => {
  const { style, onViewCashFlow } = props;
  const styles: ViewCashflowComponentStyle = mergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelTextStyle}>
        {i18n?.t('wallets_list_component.lbl_cashflow') ?? 'Cashflow'}
      </Text>
      <View style={styles.messageContainerStyle}>
        <View style={innerStyles.messageWrap}>
          <Text style={styles.messageTextStyle}>
            {i18n?.t('wallets_list_component.msg_cashflow') ??
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
            {i18n?.t('wallets_list_component.btn_view') ?? 'View'}
          </Text>
          <ArrowRightIcon width={9} color={'#fff'} />
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
