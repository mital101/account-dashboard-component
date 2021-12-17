import { BCheckedIcon, images } from '../../assets/images';
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { WalletItemStyle } from '../../types';
import useMergeStyles from './styles';
import { Wallet } from '@banking-component/core';
import { ThemeContext, Image } from 'react-native-theme-component';

export type WalletItemProps = {
  wallet: Wallet;
  onItemPressed?: (wallet: Wallet) => void;
  style?: WalletItemStyle;
  tickIcon?: ReactNode;
  primaryLabel?: string;
  moreIcon?: ReactNode;
  formatCurrency: (amount: number, code: string) => string;
  isShowSwitch: boolean;
  recommandBanner?: (wallet: Wallet) => ReactNode;
  bannerStartOffset?: number;
  bannerEndOffset?: number;
};

const WalletItemComponent = (props: WalletItemProps) => {
  const {
    wallet,
    style,
    onItemPressed,
    formatCurrency,
    tickIcon,
    primaryLabel,
    moreIcon,
    isShowSwitch,
    recommandBanner,
    bannerStartOffset,
    bannerEndOffset,
  } = props;
  const { colors, i18n } = useContext(ThemeContext);
  const styles = useMergeStyles(style);
  const value = useRef(new Animated.Value(0)).current;
  const [playAnimation, setPlayAnimation] = useState(true);
  const _startOffset = bannerStartOffset ?? -50;
  const _endOffset = bannerEndOffset ?? -8;
  const switchButton = value.interpolate({
    inputRange: [0, 1],
    outputRange: [_startOffset, _endOffset],
  });

  useEffect(() => {
    if (isShowSwitch) {
      Animated.timing(value, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setPlayAnimation(false));
    }
  }, [isShowSwitch]);

  return (
    <View style={styles.wrapperStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.containerStyle}
        onPress={() => onItemPressed?.(wallet)}
      >
        <View style={styles.imageContainerStyle}>
          {wallet.bankAccount.bankLogo ? (
            <Image
              resizeMode='contain'
              style={styles.imageStyle}
              fallbackImage={images.bank}
              source={{ uri: wallet.bankAccount.bankLogo }}
            />
          ) : (
            <Image
              resizeMode='contain'
              style={styles.imageStyle}
              fallbackImage={images.bank}
              source={images.bank}
            />
          )}
        </View>
        <View style={styles.leftContainerStyle}>
          <Text style={styles.accountNameTextStyle}>{wallet.walletName}</Text>
          <Text style={styles.accountNumberTextStyle}>
            {`${wallet.bankAccount?.bankBranchId ?? ''} ${wallet.bankAccount.accountNumber}`.trim()}
          </Text>
        </View>
        <View style={styles.rightContainerStyle}>
          <Text style={styles.amountTextStyle}>
            {formatCurrency(wallet.currentBalance, wallet.currencyCode)}
          </Text>
          {wallet.isDefaultWallet && (
            <View style={styles.primaryContainerStyle}>
              {tickIcon ?? <BCheckedIcon size={12} color={colors.primaryColor} />}
              <Text style={styles.primaryTextStyle}>
                {primaryLabel ?? i18n?.t('wallet_component.lbl_primary') ?? 'Primary'}
              </Text>
            </View>
          )}
        </View>
        {moreIcon}
      </TouchableOpacity>
      <Animated.View
        style={{
          transform: [{ translateY: playAnimation ? switchButton : _endOffset }],
        }}
      >
        {isShowSwitch ? recommandBanner?.(wallet) : <View />}
      </Animated.View>
    </View>
  );
};

export default React.memo(WalletItemComponent);
