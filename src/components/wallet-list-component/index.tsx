import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, SectionList, View, RefreshControl, ScrollView } from 'react-native';
import useMergeStyles from './styles';
import { WalletListComponentProps, WalletListComponentRefs } from '../../types';
import { BInformationIcon } from '../../assets/images';
import { WalletContext } from '../../context/wallet-context';
import { ThemeContext, AlertModal, useCurrencyFormat } from 'react-native-theme-component';
import WalletItemComponent from './wallet-item-component';
import BalanceComponent from './balance-component';
import LinkAccountComponent from './link-account-component';
import ViewCashflowComponent from './view-cashflow-component';
import ActionSheetComponent from './action-sheet-component';
import SelectionComponent from './section-component';
import { Wallet } from '../../model';
import EmptyWalletComponent from '../no-wallet-component';
import { isEmpty, uniqBy } from 'lodash';

const WalletListComponent = forwardRef((props: WalletListComponentProps, ref) => {
  const {
    Root,
    Balance,
    Section,
    WalletItem,
    ActionSheet,
    LinkAccountButton,
    ConfirmSetPrimaryModal,
    ConfirmUnlinkModal,
    EmptyWallet,
    ViewCashFlow,
  } = props;
  const containerStyle = Root?.style;
  const styles = useMergeStyles(containerStyle);
  const {
    summary,
    getDefaultWallet,
    getGroupWallets,
    deleteWallet,
    setPrimaryWallet,
    wallets,
    isLoadingWallets,
    isRefreshingWallets,
    refreshWallets,
  } = useContext(WalletContext);
  const { colors, i18n } = useContext(ThemeContext);
  const currencyCode = getDefaultWallet()?.currencyCode ?? 'USD';
  const currentBalance = summary?.currentBalance ?? 0;
  const groupedWallets = getGroupWallets();
  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>(undefined);
  const [isShowActionSheet, setShowActionSheet] = useState(false);
  const [isShowUnlink, setShowUnlink] = useState(false);
  const [isShowPrimary, setShowPrimary] = useState(false);
  const [walletWithBanners, setWalletWithBanners] = useState<Wallet[]>([]);

  useImperativeHandle(
    ref,
    (): WalletListComponentRefs => ({
      showActionsSheet,
      unlinkWallet,
      setAsPrimary,
      showRecommandBanner,
      hideActionSheet,
    })
  );

  const showActionsSheet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setShowActionSheet(true);
  };

  const unlinkWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setTimeout(() => {
      setShowUnlink(true);
    }, 500);
  };

  const setAsPrimary = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setTimeout(() => {
      setShowPrimary(true);
    }, 500);
  };

  const showRecommandBanner = (wallet: Wallet) => {
    walletWithBanners.push(wallet);
    setWalletWithBanners(uniqBy(walletWithBanners, 'walletId'));
  };

  const hideActionSheet = () => {
    setSelectedWallet(undefined);
    setShowActionSheet(false);
  };

  if (isEmpty(wallets)) {
    if (isLoadingWallets) {
      return (
        <View style={styles.loadingWrap}>
          {Root?.components?.loadingIndicator ?? <ActivityIndicator color={colors.primaryColor} />}
        </View>
      );
    }
    return (
      <ScrollView
        contentContainerStyle={styles.emptyPlaceholder}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshingWallets}
            onRefresh={refreshWallets}
            tintColor={colors.primaryColor}
          />
        }
      >
        <View style={styles.listContainerStyle}>{Root.components?.headerTitle}</View>
        <EmptyWalletComponent
          message={EmptyWallet?.props.message ?? i18n?.t('wallets_list_component.msg_no_wallet')}
          buttonLabel={
            EmptyWallet?.props.buttonLabel ??
            i18n?.t('wallets_list_component.btn_link_bank_account')
          }
          style={EmptyWallet?.style}
          {...EmptyWallet?.props}
          {...EmptyWallet?.components}
        />
        {/* {renderSuccessModal()} */}
      </ScrollView>
    );
  }

  return (
    <>
      <View style={styles.containerStyle}>
        {groupedWallets && (
          <SectionList
            {...Root.props?.scrollHandler}
            sections={groupedWallets}
            keyExtractor={(item) => item.walletId}
            extraData={Root.props?.bankImages}
            renderItem={({ item, index }) => {
              const isShowSwitch =
                walletWithBanners.find((w) => w.walletId === item.walletId) !== undefined;
              return (
                WalletItem?.components?.renderItem?.(index, item) ?? (
                  <WalletItemComponent
                    wallet={item}
                    isShowSwitch={isShowSwitch}
                    style={WalletItem?.style}
                    {...WalletItem?.props}
                    {...WalletItem?.components}
                  />
                )
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.listDivider} />}
            ListHeaderComponent={
              <View>
                {Root.components?.headerTitle}
                <BalanceComponent
                  balance={useCurrencyFormat(currentBalance, currencyCode)}
                  style={Balance?.style}
                  {...Balance?.props}
                  {...Balance?.components}
                />
              </View>
            }
            ListFooterComponent={() => (
              <View>
                <LinkAccountComponent
                  style={LinkAccountButton?.style}
                  {...LinkAccountButton?.props}
                  {...LinkAccountButton?.components}
                />
                {ViewCashFlow?.props?.onViewCashFlow && (
                  <ViewCashflowComponent style={ViewCashFlow?.styles} {...ViewCashFlow?.props} />
                )}
              </View>
            )}
            renderSectionHeader={({ section: { section } }) => {
              return (
                Section?.components?.renderSection?.(section) ?? (
                  <SelectionComponent title={section} style={Section?.style} />
                )
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshingWallets}
                onRefresh={refreshWallets}
                tintColor={colors.primaryColor}
              />
            }
          />
        )}
      </View>
      <ActionSheetComponent
        isVisible={isShowActionSheet}
        wallet={selectedWallet}
        onCancel={hideActionSheet}
        style={ActionSheet?.style}
        {...ActionSheet?.props}
        {...ActionSheet?.components}
      />
      <AlertModal
        isVisible={isShowUnlink && !ConfirmUnlinkModal?.props?.disable}
        title={i18n?.t('wallets_list_component.lbl_unlink_account') ?? 'Unlink Bank Account'}
        cancelTitle={i18n?.t('wallets_list_component.btn_cancel') ?? 'Cancel'}
        confirmTitle={ConfirmUnlinkModal?.props?.confirmButonLabel}
        isFullWidth={ConfirmUnlinkModal?.props?.isFullWidth}
        isShowClose={ConfirmUnlinkModal?.props?.isShowClose}
        onClose={() => setShowUnlink(false)}
        onCancel={() => setShowUnlink(false)}
        leftIcon={
          ConfirmUnlinkModal?.components?.leftIcon ?? (
            <BInformationIcon width={20} height={20} color={colors.primaryColor} />
          )
        }
        message={
          i18n?.t('wallets_list_component.msg_unlink_account') ??
          'Are you sure? once unlinked, you cannot undo this action.'
        }
        onConfirmed={() => {
          const wallet = selectedWallet;
          setShowUnlink(false);
          if (wallet) {
            deleteWallet(wallet);
          }
          setSelectedWallet(undefined);
        }}
        style={ConfirmUnlinkModal?.style}
        closeIcon={ConfirmUnlinkModal?.components?.closeIcon}
      />
      <AlertModal
        isVisible={isShowPrimary && !ConfirmSetPrimaryModal?.props?.disable}
        title={i18n?.t('wallets_list_component.lbl_confirmation') ?? 'Confirmation'}
        cancelTitle={i18n?.t('wallets_list_component.btn_cancel') ?? 'Cancel'}
        confirmTitle={ConfirmSetPrimaryModal?.props?.confirmButonLabel}
        isFullWidth={ConfirmSetPrimaryModal?.props?.isFullWidth}
        isShowClose={ConfirmSetPrimaryModal?.props?.isShowClose}
        onClose={() => setShowPrimary(false)}
        onCancel={() => setShowPrimary(false)}
        leftIcon={
          ConfirmSetPrimaryModal?.components?.leftIcon ?? (
            <BInformationIcon width={20} height={20} color={colors.primaryColor} />
          )
        }
        message={(
          i18n?.t('wallets_list_component.msg_set_primary') ??
          'Are you sure you want to set %s as the primary account?.'
        ).replace('%s', selectedWallet?.walletName ?? '')}
        onConfirmed={() => {
          const wallet = selectedWallet;
          setShowPrimary(false);
          if (wallet) {
            setPrimaryWallet(wallet.walletId);
          }
          setSelectedWallet(undefined);
        }}
        style={ConfirmSetPrimaryModal?.style}
        closeIcon={ConfirmSetPrimaryModal?.components?.closeIcon}
      />
      {/* {renderSuccessModal()} */}
    </>
  );
});

export default WalletListComponent;
