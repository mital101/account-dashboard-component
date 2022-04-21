import React, { ReactNode, useContext } from 'react';
import { Dimensions, Platform, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import {
  BRoundedCloseIcon,
  BRoundedTickIcon,
  BTransactionIcon,
  BShareIcon,
} from '../../../assets/images';
import { ActionSheetStyle } from '../../../types';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';
import { Wallet } from '../../../model';

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

export type ActionSheetComponentProps = {
  wallet?: Wallet;
  isVisible?: boolean;
  style?: ActionSheetStyle;
  setPrimaryIcon?: ReactNode;
  unlinkIcon?: ReactNode;
  viewTransactionIcon?: ReactNode;
  shareIcon?: ReactNode;
  cancelIcon?: ReactNode;
  onSetPrimary?: (wallet: Wallet) => void;
  onUnlink?: (wallet: Wallet) => void;
  onViewTransactions?: (wallet: Wallet) => void;
  onShare?: (wallet: Wallet) => void;
  onCancel?: () => void;
};

const ActionSheetComponent = (props: ActionSheetComponentProps) => {
  const {
    wallet,
    isVisible,
    style,
    setPrimaryIcon,
    unlinkIcon,
    cancelIcon,
    viewTransactionIcon,
    onSetPrimary,
    onUnlink,
    onCancel,
    onViewTransactions,
    onShare,
    shareIcon,
  } = props;
  const styles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

  return (
    <Modal
      deviceHeight={deviceHeight}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      backdropOpacity={0.5}
      statusBarTranslucent
      isVisible={isVisible && wallet !== undefined}
      style={styles.modalStyle}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
    >
      <SafeAreaView style={styles.containerStyles}>
        {wallet !== undefined ? (
          <View style={styles.containerStyles}>
            {!wallet.isDefaultWallet && (
              <TouchableOpacity
                style={styles.buttonContainerStyle}
                activeOpacity={0.8}
                onPress={() => {
                  onCancel?.();
                  onSetPrimary?.(wallet);
                }}
              >
                <View style={styles.leftIconContainer}>
                  {setPrimaryIcon ?? <BRoundedTickIcon width={18} height={18} />}
                </View>
                <Text style={styles.buttonTextStyle}>
                  {i18n?.t('wallets_list_component.btn_set_primary') ?? 'Set as primary account'}
                </Text>
              </TouchableOpacity>
            )}
            {onUnlink && (
              <TouchableOpacity
                style={styles.buttonContainerStyle}
                activeOpacity={0.8}
                onPress={() => {
                  onCancel?.();
                  onUnlink(wallet);
                }}
              >
                <View style={styles.leftIconContainer}>
                  {unlinkIcon ?? <BRoundedCloseIcon width={18} height={18} />}
                </View>
                <Text style={styles.buttonTextStyle}>
                  {i18n?.t('wallets_list_component.btn_unlink_account') ?? 'Unlink bank account'}
                </Text>
              </TouchableOpacity>
            )}
            {onViewTransactions && (
              <TouchableOpacity
                style={styles.buttonContainerStyle}
                activeOpacity={0.8}
                onPress={() => {
                  onCancel?.();
                  onViewTransactions(wallet);
                }}
              >
                <View style={styles.leftIconContainer}>
                  {viewTransactionIcon ?? <BTransactionIcon width={18} height={18} />}
                </View>
                <Text style={styles.buttonTextStyle}>
                  {i18n?.t('wallets_list_component.btn_view_transaction') ?? 'View transactions'}
                </Text>
              </TouchableOpacity>
            )}
            {onShare && (
              <TouchableOpacity
                style={styles.buttonContainerStyle}
                activeOpacity={0.8}
                onPress={() => {
                  onCancel?.();
                  onShare(wallet);
                }}
              >
                <View style={styles.leftIconContainer}>
                  {shareIcon ?? <BShareIcon size={18} />}
                </View>
                <Text style={styles.buttonTextStyle}>
                  {i18n?.t('wallets_list_component.btn_share_information') ?? 'Share Information'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.cancelContainerStyle}
              activeOpacity={0.8}
              onPress={onCancel}
            >
              {cancelIcon}
              <Text style={styles.cancelTextStyle}>
                {i18n?.t('wallets_list_component.btn_cancel')?.toUpperCase() ?? 'CANCEL'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </SafeAreaView>
    </Modal>
  );
};

ActionSheetComponent.defaultProps = {
  isVisible: false,
};

export default React.memo(ActionSheetComponent);
