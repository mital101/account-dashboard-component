import React, { useCallback, useMemo, useState } from 'react';
import { WalletService } from '../services/wallet-service';
import {
  GroupedWallets,
  Wallet,
  WalletSummary,
  orderBy,
  isEmpty,
  chain,
} from '@banking-component/core';
import { showMessage } from 'react-native-theme-component';

const walletService = WalletService.instance();

export interface WalletContextData {
  wallets: Wallet[];
  isLoadingWallets: boolean;
  isRefreshingWallets: boolean;
  isLinkingWallet: boolean;
  summary?: WalletSummary;
  isUnlinking: boolean;
  fetchWallets: () => void;
  refreshWallets: (delayTime?: number) => void;
  getGroupWallets: () => GroupedWallets | undefined;
  getDefaultWallet: () => Wallet | undefined;
  getWalletDetail: (walletId?: string) => Wallet | undefined;
  getAggregatedWallets: () => Wallet[];
  deleteWallet: (wallet: Wallet) => void;
  setPrimaryWallet: (walletId: string) => void;
  linkWallet: (bankId: string, consentId: string, accountIds?: string[]) => void;
  clearWalletErrors: () => void;
  errorLoadWallet?: Error;
  errorUnlinkWallet?: Error;
  errorUpdatePrimary?: Error;
  errorLinkWallet?: Error;
  isUpdatingPrimary: boolean;
  clearWallets: () => void;
  isSharingInformation: boolean;
  isShareSuccessfully: boolean;
  errorShareInformation?: Error;
  shareInformation: (
    userId: string,
    accountIds: string[],
    emails: string[],
    fromDate: string,
    toDate: string,
    expiredDate: string
  ) => void;
}

export const walletDefaultValue: WalletContextData = {
  wallets: [],
  isLoadingWallets: false,
  isRefreshingWallets: false,
  refreshWallets: () => null,
  fetchWallets: () => null,
  getGroupWallets: () => undefined,
  getDefaultWallet: () => undefined,
  getWalletDetail: () => undefined,
  getAggregatedWallets: () => [],
  isUnlinking: false,
  deleteWallet: () => null,
  isUpdatingPrimary: false,
  setPrimaryWallet: () => null,
  linkWallet: () => null,
  isLinkingWallet: false,
  clearWalletErrors: () => null,
  clearWallets: () => null,
  isSharingInformation: false,
  shareInformation: () => null,
  isShareSuccessfully: false,
};

export const WalletContext = React.createContext<WalletContextData>(walletDefaultValue);

export function useWalletContextValue(): WalletContextData {
  const [_wallets, setWallets] = useState<Wallet[]>([]);
  const [_isLoading, setIsLoading] = useState(false);
  const [_summary, setSummary] = useState<WalletSummary | undefined>();
  const [_loadError, setLoadError] = useState<Error | undefined>();
  const [_unlinkError, setUnlinkError] = useState<Error | undefined>();
  const [_isUnlinking, setIsUnlinking] = useState(false);
  const [_isUpdatingPrimary, setIsUpdatingPrimary] = useState(false);
  const [_updatePrimaryError, setUpdatePrimaryError] = useState<Error | undefined>();
  const [_isLinkingWallet, setIsLinkingWallet] = useState(false);
  const [_linkWalletError, setLinkWalletError] = useState<Error | undefined>();
  const [_isRefreshing, setIsRefreshing] = useState(false);
  const [_isSharingInformation, setIsSharingInformation] = useState(false);
  const [_errorShareInformation, setErrorShareInformation] = useState<Error | undefined>();
  const [_isShareSuccessfully, setShareSucessfully] = useState(false);

  const fetchWallets = useCallback(async () => {
    try {
      setIsLoading(true);
      await _fetchWallets();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setLoadError(err as Error);
    }
  }, []);

  const _fetchWallets = async () => {
    const resp = await walletService.getWallets();
    let _walletsData: Wallet[] = resp.data;
    if (isEmpty(_walletsData)) {
      setWallets([]);
      setSummary(undefined);
    } else {
      const _defaultWallet = _walletsData.find((w) => w.isDefaultWallet);
      if (!_defaultWallet) {
        await walletService.setDefaultWallet(_walletsData[0].walletId, true);
        _walletsData = _walletsData.map((w, index) => ({
          ...w,
          isDefaultWallet: index === 0,
        }));
      }
      setWallets(orderBy<Wallet>(_walletsData, ['isDefaultWallet'], ['desc']));
      setSummary(resp.summary);
    }
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const refreshWallets = useCallback(async (delayTime?: number) => {
    try {
      setIsRefreshing(true);
      if (delayTime) {
        await sleep(delayTime);
      }
      await _fetchWallets();
      setIsRefreshing(false);
    } catch (err) {
      setIsRefreshing(false);
      setLoadError(err as Error);
    }
  }, []);

  const setPrimaryWallet = useCallback(async (walletId: string) => {
    try {
      setIsUpdatingPrimary(true);
      await walletService.setDefaultWallet(walletId, true);
      refreshWallets();
      setIsUpdatingPrimary(false);
      showMessage({
        message: 'Primary Account Changed Successfully',
        backgroundColor: '#44ac44',
      });
    } catch (error) {
      setIsUpdatingPrimary(false);
      setUpdatePrimaryError(error as Error);
    }
  }, []);

  const deleteWallet = useCallback(
    async (wallet: Wallet) => {
      try {
        setIsUnlinking(true);
        await walletService.unlinkBankWallet(wallet.walletId);
        refreshWallets();
        setIsUnlinking(false);
        showMessage({
          message: 'Account successfully removed',
          backgroundColor: '#44ac44',
        });
      } catch (error) {
        setIsUnlinking(false);
        setUnlinkError(error as Error);
      }
    },
    [_wallets]
  );

  const getAggregatedWallets = useCallback(() => {
    if (isEmpty(_wallets)) {
      return [];
    }
    if (_wallets.length === 1) {
      return _wallets;
    }
    const aggregatedWallet: Wallet = {
      walletName: 'All Accounts',
      walletId: _wallets.map((w: Wallet) => w.walletId).join(','),
      availableBalance: _summary?.availableBalance ?? 0,
      currentBalance: _summary?.currentBalance ?? 0,
      isDefaultWallet: false,
      type: _wallets[0].type,
      bankAccount: _wallets[0].bankAccount,
      currencyCode: _wallets[0].currencyCode,
      isAggregated: true,
    };
    return [aggregatedWallet, ..._wallets];
  }, [_wallets, _summary]);

  const getGroupWallets = useCallback(() => {
    const group = chain(_wallets).groupBy('type').value();
    return Object.keys(group).map((key) => {
      let section;
      switch (key) {
        case 'BANK_WALLET':
          section = 'Bank Accounts';
          break;
        case 'VIRTUAL_WALLET':
          section = 'Wallets';
          break;
        default:
          section = key;
          break;
      }
      return {
        section,
        data: orderBy<Wallet>(group[key], ['isDefaultWallet'], ['desc']),
      };
    });
  }, [_wallets]);

  const getDefaultWallet = useCallback(() => {
    return _wallets.find((wallet) => wallet.isDefaultWallet);
  }, [_wallets]);

  const getWalletDetail = useCallback(
    (walletId?: string) => {
      if (!walletId) {
        return undefined;
      }
      const wallet = _wallets.find(
        (item) => item.walletId.replace(/-/g, '') === walletId.replace(/-/g, '')
      );
      return wallet;
    },
    [_wallets]
  );

  const linkWallet = useCallback(
    async (bankId: string, consentId: string, accountIds?: string[]) => {
      try {
        setIsLinkingWallet(true);
        await walletService.linkBankAccount(bankId, consentId, accountIds);
        refreshWallets(1000);
        setIsLinkingWallet(false);
      } catch (error) {
        setLinkWalletError(error as Error);
        setIsLinkingWallet(false);
      }
    },
    []
  );

  const shareInformation = useCallback(
    async (
      userId: string,
      accountIds: string[],
      emails: string[],
      fromDate: string,
      toDate: string,
      expiredDate: string
    ) => {
      try {
        setIsSharingInformation(true);
        await walletService.shareInformation(
          userId,
          accountIds,
          emails,
          fromDate,
          toDate,
          expiredDate
        );
        setShareSucessfully(true);
        setTimeout(() => {
          setShareSucessfully(false);
        }, 500);
        setIsSharingInformation(false);
      } catch (error) {
        setErrorShareInformation(error as Error);
        setIsSharingInformation(false);
      }
    },
    []
  );

  const clearWalletErrors = useCallback(() => {
    setLoadError(undefined);
    setUnlinkError(undefined);
    setUpdatePrimaryError(undefined);
    setLinkWalletError(undefined);
    setErrorShareInformation(undefined);
  }, []);

  const clearWallets = useCallback(() => {
    setWallets([]);
  }, []);

  return useMemo(
    () => ({
      wallets: _wallets,
      isLoadingWallets: _isLoading,
      fetchWallets,
      summary: _summary,
      errorLoadWallet: _loadError,
      getGroupWallets,
      getDefaultWallet,
      getWalletDetail,
      getAggregatedWallets,
      deleteWallet,
      errorUnlinkWallet: _unlinkError,
      isUnlinking: _isUnlinking,
      isUpdatingPrimary: _isUpdatingPrimary,
      errorUpdatePrimary: _updatePrimaryError,
      setPrimaryWallet,
      linkWallet,
      isLinkingWallet: _isLinkingWallet,
      errorLinkWallet: _linkWalletError,
      clearWalletErrors,
      clearWallets,
      isRefreshingWallets: _isRefreshing,
      refreshWallets,
      isSharingInformation: _isSharingInformation,
      errorShareInformation: _errorShareInformation,
      shareInformation,
      isShareSuccessfully: _isShareSuccessfully,
    }),
    [
      _wallets,
      _isLoading,
      _summary,
      _loadError,
      _unlinkError,
      _isUnlinking,
      _isUpdatingPrimary,
      _updatePrimaryError,
      _isLinkingWallet,
      _linkWalletError,
      _isRefreshing,
      _isSharingInformation,
      _errorShareInformation,
      _isShareSuccessfully,
    ]
  );
}
