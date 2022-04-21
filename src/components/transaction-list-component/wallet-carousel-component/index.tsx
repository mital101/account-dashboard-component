import React, { ReactNode, useContext } from 'react';
import { View, Text } from 'react-native';
import { BCheckedIcon, BDownIcon, BUpIcon, images } from '../../../assets/images';
import { ThemeContext, Image, useCurrencyFormat } from 'react-native-theme-component';
import { WalletContext } from '../../../context/wallet-context';
import { CarouselItemStyle } from '../../../types';
import useMergeStyles from './styles';
import { TransactionSummary, Wallet } from '../../../model';

export type WalletCarouselItemProps = {
  wallet: Wallet;
  style?: CarouselItemStyle;
  tickIcon?: ReactNode;
  moneyInIcon?: ReactNode;
  moneyOutIcon?: ReactNode;
  renderSummary?: (summary?: TransactionSummary) => React.ReactElement | null;
};

const WalletCarouselComponent = (props: WalletCarouselItemProps) => {
  const { wallet, style, tickIcon, moneyInIcon, moneyOutIcon, renderSummary } = props;
  const { getTransactionSummary } = useContext(WalletContext);
  const { colors, i18n } = useContext(ThemeContext);
  const summary = getTransactionSummary(wallet.walletId);

  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.headerStyle}>
        {!wallet.isAggregated && (
          <View style={styles.imageWrapStyle}>
            <Image
              resizeMode='contain'
              style={styles.imageStyle}
              fallbackImage={images.bank}
              source={{ uri: wallet.bankAccount.bankLogo }}
            />
          </View>
        )}
        <View style={styles.walletWrapStyle}>
          <View style={styles.walletNameContainer}>
            <View style={styles.walletNameWrapper}>
              <Text style={styles.walletNameTextStyle} numberOfLines={1}>
                {wallet.walletName}
              </Text>
            </View>
            {!wallet.isAggregated && (
              <Text style={styles.walletNumberTextStyle}>
                {`(${wallet.bankAccount?.bankBranchId ?? ''} ${
                  wallet.bankAccount.accountNumber
                })`.trim()}
              </Text>
            )}
          </View>
          <View style={styles.balanceWrapStyle}>
            <Text style={styles.balanceTextStyle}>
              {useCurrencyFormat(wallet.currentBalance, wallet.currencyCode)}
            </Text>
            {wallet.isDefaultWallet && (
              <View style={styles.primaryWrap}>
                {tickIcon ?? <BCheckedIcon size={12} color={colors.primaryColor} />}
                <Text style={styles.primaryTextStyle}>
                  {i18n?.t('transaction_list_component.lbl_primary') ?? 'Primary'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {renderSummary?.(summary) ?? (
        <>
          <Text style={styles.summaryTextStyle}>
            {i18n?.t('transaction_list_component.lbl_summary') ?? 'Summary'}
          </Text>
          <View style={styles.summaryWrapper}>
            <View style={styles.moneyBoxWrapper}>
              <View style={styles.moneyInWrapStyle}>
                {moneyInIcon ?? <BUpIcon width={18} height={40} color='#1DBF68' />}
              </View>
              <View style={styles.moneyWrapper}>
                <Text style={styles.moneyLabelTextStyle}>
                  {i18n?.t('transaction_list_component.lbl_money_in') ?? 'Money In'}
                </Text>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.1}
                  numberOfLines={1}
                  style={styles.moneyValueTextStyle}
                >
                  {summary ? useCurrencyFormat(summary.totalMoneyIn, wallet.currencyCode) : '-'}
                </Text>
              </View>
            </View>
            <View style={styles.horizontalDivider} />
            <View style={styles.moneyBoxWrapper}>
              <View style={styles.moneyOutWrapStyle}>
                {moneyOutIcon ?? <BDownIcon width={18} height={40} color='#F03E46' />}
              </View>
              <View style={styles.moneyWrapper}>
                <Text style={styles.moneyLabelTextStyle}>
                  {i18n?.t('transaction_list_component.lbl_money_out') ?? 'Money Out'}
                </Text>
                <Text
                  adjustsFontSizeToFit
                  minimumFontScale={0.1}
                  numberOfLines={1}
                  style={styles.moneyValueTextStyle}
                >
                  {summary ? useCurrencyFormat(summary.totalMoneyOut, wallet.currencyCode) : '-'}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default React.memo(WalletCarouselComponent);
