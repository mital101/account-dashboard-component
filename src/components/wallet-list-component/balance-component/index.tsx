import React, { ReactNode, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BalanceStyle } from '../../../types';
import mergeStyles from './styles';
import { CashflowIcon, ArrowRightIcon } from '../../../assets/images';
import { ThemeContext } from 'react-native-theme-component';

export type BalanceComponentProps = {
  balance: string;
  style?: BalanceStyle;
  rightIcon?: ReactNode;
  cashflowIconColor?: string;
  onViewCashFlow?: () => void;
};

const BalanceComponent = (props: BalanceComponentProps) => {
  const { style, balance, rightIcon, onViewCashFlow, cashflowIconColor } = props;
  const { colors, i18n } = useContext(ThemeContext);

  const styles: BalanceStyle = mergeStyles(style);

  return (
    <View style={styles.wrapperStyle}>
      <View style={styles.containerStyle}>
        <View style={innerStyles.topWrap}>
          <Text style={styles.titleTextStyle}>
            {i18n?.t('wallets_list_component.lbl_total_balance') ?? 'Total Available Balance'}
          </Text>
          {onViewCashFlow && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onViewCashFlow}
              style={styles.viewCashflowContainer}
            >
              <CashflowIcon size={15} color={cashflowIconColor ?? colors.primaryColor} />
              <Text style={styles.viewCashflowTextStyle}>
                {i18n?.t('wallets_list_component.btn_view_cashflow') ?? 'View Cashflow'}
              </Text>
              <ArrowRightIcon width={9} color={cashflowIconColor ?? colors.primaryColor} />
            </TouchableOpacity>
          )}
        </View>
        <View style={innerStyles.leftWrap}>
          <Text style={styles.amountTextStyle}>{balance}</Text>
          {rightIcon}
        </View>
      </View>
    </View>
  );
};

const innerStyles = StyleSheet.create({
  leftWrap: {
    flex: 1,
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default React.memo(BalanceComponent);
