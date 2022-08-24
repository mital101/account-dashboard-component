import React, { useCallback, useMemo, useState } from 'react';
import { WalletService } from '../services/wallet-service';
import { showMessage } from 'react-native-theme-component';
import moment from 'moment';
import {
  GroupedTransactions,
  GroupedWallets,
  Paging,
  Transaction,
  TransactionSummary,
  Wallet,
  WalletSummary,
  WalletTransaction,
  CryptoTCData,
  CurrencyExchangeRateData,
  Currency,
  WalletLimit,
  FinancialProfile,
} from '../model';
import _, { chain, groupBy, isEmpty, orderBy } from 'lodash';
import { FilterTransaction, TransferType } from '../types';
import { maxLengthExchangeRateHistory } from '../constants/common';

const walletService = WalletService.instance();

export interface WalletContextData {
  wallets: Wallet[];
  isLoadingWallets: boolean;
  isRefreshingWallets: boolean;
  isLinkingWallet: boolean;
  summary?: WalletSummary;
  isUnlinking: boolean;
  getWallets: () => void;
  refreshWallets: (delayTime?: number) => void;
  getGroupWallets: () => GroupedWallets | undefined;
  getDefaultWallet: () => Wallet | undefined;
  getWalletDetail: (walletId?: string) => Wallet | undefined;
  getAggregatedWallets: () => Wallet[];
  deleteWallet: (wallet: Wallet) => void;
  setPrimaryWallet: (walletId: string) => void;
  linkWallet: (
    bankId: string,
    consentId: string,
    accountIds?: string[]
  ) => void;
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
  isLinkedSuccessfully: boolean;
  transactions: WalletTransaction[];
  isLoadingTransaction: boolean;
  isRefreshingTransaction: boolean;
  transactionError?: Error;
  fetchTransactions: (walletId?: string, pageNumber?: number) => void;
  refreshTransactions: (walletId?: string) => void;
  getTransactionPaging: (walletId?: string) => Paging | undefined;
  groupTransactions: (walletId?: string) => GroupedTransactions | undefined;
  getTransactionByWalletId: (walletId: string) => WalletTransaction | undefined;
  getTransactionSummary: (walletId?: string) => TransactionSummary | undefined;
  clearTransactions: () => void;
  getCryptoTcData: (
    templateName: string,
    appId: string,
    entityId: string,
    format: string
  ) => void;
  isLoadingCryptoTC: boolean;
  cryptoTC?: CryptoTCData;
  isLoadingCryptoExchange: boolean;
  cryptoExchangeData?: CurrencyExchangeRateData[];
  getCryptoExchangeData: (limit?: number) => void;
  getAccountStatus: () => void;
  isLoadingHistoricalExchangeRate: boolean;
  getHistoricalExchangeRate: (updateAtFrom: string, type: string) => void;
  getListCurrency: () => void;
  isLoadingListCurrency: boolean;
  listCurrency?: Currency[];
  walletsById: Wallet[];
  getWalletsById: (id: string) => void;
  refreshWalletsById: (delayTime?: number) => void;
  isLoadingInitMoneyIn: boolean;
  paymentId?: string;
  amount?: number;
  initMoneyin: () => Promise<void>;
  setAmountCryptoIn: (amount: number) => void;
  cryptoWallet?: Wallet;
  unionWallet?: Wallet;
  setAmountCryptoOut: (amount: number) => void;
  initMoneyOut: () => Promise<void>;
  isLoadingInitMoneyOut: boolean;
  currentTransfer?: string;
  setCurrentTransfer: (type: TransferType) => void;
  getCryptoTransactions: (
    isLoadMore?: boolean,
    filter?: FilterTransaction
  ) => void;
  cryptoTransactions?: Transaction[];
  isLoadingGetCryptoTransactions: boolean;
  cryptoTransactionsPaging?: Paging;
  getFinancialProfile: (userId: string, bankId: string) => void;
  getWalletLimits: (walletId: string) => void;
  isLoadingWalletLimits: boolean;
  walletLimits?: WalletLimit[];
  financialProfile?: FinancialProfile;
}

export const walletDefaultValue: WalletContextData = {
  wallets: [],
  isLoadingWallets: true,
  isRefreshingWallets: false,
  refreshWallets: () => null,
  getWallets: () => null,
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
  isLinkedSuccessfully: false,
  transactions: [],
  isLoadingTransaction: false,
  isRefreshingTransaction: false,
  fetchTransactions: () => null,
  refreshTransactions: () => null,
  getTransactionPaging: () => undefined,
  groupTransactions: () => undefined,
  getTransactionSummary: () => undefined,
  clearTransactions: () => undefined,
  getTransactionByWalletId: () => undefined,
  getCryptoTcData: () => null,
  isLoadingCryptoTC: true,
  cryptoTC: undefined,
  getCryptoExchangeData: () => undefined,
  isLoadingCryptoExchange: false,
  cryptoExchangeData: [],
  getAccountStatus: () => undefined,
  isLoadingHistoricalExchangeRate: false,
  getHistoricalExchangeRate: () => true,
  getListCurrency: () => undefined,
  isLoadingListCurrency: false,
  listCurrency: [],
  walletsById: [],
  getWalletsById: () => null,
  refreshWalletsById: () => null,
  isLoadingInitMoneyIn: false,
  paymentId: '',
  amount: 0,
  initMoneyin: async () => undefined,
  setAmountCryptoIn: () => undefined,
  cryptoWallet: undefined,
  unionWallet: undefined,
  setAmountCryptoOut: () => undefined,
  initMoneyOut: async () => undefined,
  isLoadingInitMoneyOut: false,
  currentTransfer: undefined,
  setCurrentTransfer: () => undefined,
  getCryptoTransactions: () => undefined,
  isLoadingGetCryptoTransactions: false,
  cryptoTransactions: [],
  cryptoTransactionsPaging: undefined,
  getFinancialProfile: () => undefined,
  getWalletLimits: () => undefined,
  isLoadingWalletLimits: false,
  walletLimits: undefined,
  financialProfile: undefined,
};

export const WalletContext =
  React.createContext<WalletContextData>(walletDefaultValue);

export function useWalletContextValue(): WalletContextData {
  const [_wallets, setWallets] = useState<Wallet[]>([]);
  const [_cryptoWallets, setCryptoWallets] = useState<Wallet>();
  const [_unionWallets, setUnionWallets] = useState<Wallet>();
  const [_isLoadingWallets, setIsLoadingWallets] = useState(true);
  const [_summary, setSummary] = useState<WalletSummary | undefined>();
  const [_loadError, setLoadError] = useState<Error | undefined>();
  const [_unlinkError, setUnlinkError] = useState<Error | undefined>();
  const [_isUnlinking, setIsUnlinking] = useState(false);
  const [_isUpdatingPrimary, setIsUpdatingPrimary] = useState(false);
  const [_updatePrimaryError, setUpdatePrimaryError] = useState<
    Error | undefined
  >();
  const [_isLinkingWallet, setIsLinkingWallet] = useState(false);
  const [_linkWalletError, setLinkWalletError] = useState<Error | undefined>();
  const [_isRefreshingWallet, setIsRefreshingWallet] = useState(false);
  const [_isSharingInformation, setIsSharingInformation] = useState(false);
  const [_errorShareInformation, setErrorShareInformation] = useState<
    Error | undefined
  >();
  const [_isShareSuccessfully, setShareSucessfully] = useState(false);
  const [_isLinkedSuccessfully, setLinkedSucessfully] = useState(false);
  const [_transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [_transactionError, setTransactionError] = useState<Error | undefined>(
    undefined
  );
  const [_isLoadingTransaction, setLoadingTransaction] = useState(false);
  const [_isRefreshingTransaction, setRefreshingTransaction] = useState(false);

  const [_isLoadingCryptoTC, setIsLoadingCryptoTC] = useState(true);
  const [_cryptoTC, setCryptoTC] = useState<CryptoTCData | undefined>();

  const [_isLoadingCryptoExchange, setIsLoadingCryptoExchange] = useState(true);
  const [_cryptoExchangeData, setCryptoExchangeData] = useState<
    CurrencyExchangeRateData[] | undefined
  >();
  const [_isLoadingHistoricalExchangeRate, setIsLoadingHistoricalExchangeRate] =
    useState<boolean>(false);

  const [_isLoadingListCurrency, setIsLoadingListCurrency] = useState(true);
  const [_listCurrency, setListCurrency] = useState<Currency[] | undefined>();

  const [_isLoadingInitMoneyIn, setIsLoadingInitMoneyIn] =
    useState<boolean>(false);
  const [_paymentId, setPaymentId] = useState<string>();
  const [_amount, setAmount] = useState<number>();
  const [_currentTransfer, setCurrentTransfer] = useState<TransferType>();
  const [_isLoadingInitMoneyOut, setIsLoadingInitMoneyOut] =
    useState<boolean>(false);
  const [_walletsById, setWalletsById] = useState<Wallet[]>([]);

  const [_isLoadingFinancialProfile, setIsLoadingFinancialProfile] =
    useState(true);
  const [_financialProfile, setFinancialProfile] = useState<FinancialProfile>();

  const [_isLoadingCryptoTransactions, setIsLoadingCryptoTransactions] =
    useState<boolean>(false);
  const [_cryptoTransactions, setCryptoTransactions] = useState<Transaction[]>(
    []
  );
  const [_cryptoTransactionsPaging, setCryptoTransactionsPaging] =
    useState<Paging>();

  const [_isLoadingWalletLimits, setIsLoadingWalletLimits] =
    useState<boolean>(false);

  const [_walletLimits, setWalletLimits] = useState<WalletLimit[]>([]);

  const getWallets = useCallback(async () => {
    try {
      setIsLoadingWallets(true);
      await _fetchWallets();
      setIsLoadingWallets(false);
      clearWalletErrors();
    } catch (err) {
      setIsLoadingWallets(false);
      setLoadError(err as Error);
    }
  }, []);

  const _fetchWallets = async () => {
    const resp = await walletService.getWallets();
    console.log('_fetchWallets -> resp', resp);
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
      const walletsOrdered = orderBy<Wallet>(
        _walletsData,
        ['isDefaultWallet'],
        ['desc']
      );
      const unionWallet: Wallet | undefined = walletsOrdered.find(
        (w) => w.bankAccount.bankCode === 'UnionDigital'
      );
      const cryptoWallet: Wallet | undefined = walletsOrdered.find(
        (w) => w.bankAccount.bankCode === 'PDAX'
      );
      if (unionWallet) {
        getWalletLimits(unionWallet?.walletId);
      }
      setWallets(walletsOrdered);
      setUnionWallets(unionWallet);
      setCryptoWallets(cryptoWallet);
      setSummary(resp.summary);
    }
  };

  const getWalletsById = useCallback(async (bankId: string) => {
    try {
      setIsLoadingWallets(true);
      await _fetchWalletsById(bankId);
      setIsLoadingWallets(false);
      clearWalletErrors();
    } catch (err) {
      setIsLoadingWallets(false);
      setLoadError(err as Error);
    }
  }, []);

  const _fetchWalletsById = async (bankId: string) => {
    const resp = await walletService.getWalletsByBankId(bankId);
    let _walletsData: Wallet[] = resp.data;
    if (isEmpty(_walletsData)) {
      setWalletsById([]);
    } else {
      setWalletsById(_walletsData);
    }
  };

  const getCryptoTcData = useCallback(
    async (
      templateName: string,
      appId: string,
      entityId: string,
      format: string
    ) => {
      try {
        setIsLoadingCryptoTC(true);
        //await _fetchWallets();
        // templateName:string,appId:string,entityId:string,format:string
        const resp = await walletService.getCryptoTC(
          templateName,
          appId,
          entityId,
          format
        );
        setIsLoadingCryptoTC(false);
        setCryptoTC(resp.data);
        // clearWalletErrors();
      } catch (err) {
        console.log('err ', err);

        setIsLoadingCryptoTC(false);
        setLoadError(err as Error);
      }
    },
    []
  );

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(() => resolve(true), ms));
  };

  const refreshWallets = useCallback(
    async (delayTime?: number) => {
      try {
        setIsRefreshingWallet(true);
        if (delayTime) {
          await sleep(delayTime);
        }
        await _fetchWallets();
        setIsRefreshingWallet(false);
        clearWalletErrors();
      } catch (err) {
        setIsRefreshingWallet(false);
        setLoadError(err as Error);
      }
    },
    [_wallets]
  );

  const refreshWalletsById = useCallback(
    async (delayTime?: number) => {
      try {
        setIsRefreshingWallet(true);
        if (delayTime) {
          await sleep(delayTime);
        }
        await _fetchWalletsById();
        setIsRefreshingWallet(false);
        clearWalletErrors();
      } catch (err) {
        setIsRefreshingWallet(false);
        setLoadError(err as Error);
      }
    },
    [_walletsById]
  );

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
        setLinkedSucessfully(true);
        setTimeout(() => {
          setLinkedSucessfully(false);
        }, 100);
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
    if (_loadError) {
      setLoadError(undefined);
    }
    if (_unlinkError) {
      setUnlinkError(undefined);
    }
    if (_updatePrimaryError) {
      setUpdatePrimaryError(undefined);
    }
    if (_linkWalletError) {
      setLinkWalletError(undefined);
    }
    if (_errorShareInformation) {
      setErrorShareInformation(undefined);
    }
    if (_transactionError) {
      setTransactionError(undefined);
    }
  }, [
    _errorShareInformation,
    _loadError,
    _unlinkError,
    _updatePrimaryError,
    _linkWalletError,
    _transactionError,
  ]);

  const clearWallets = useCallback(() => {
    setWallets([]);
    setWalletsById([]);
  }, []);

  const fetchTransactions = useCallback(
    async (walletId?: string, pageNumber?: number) => {
      if (!walletId) {
        return;
      }
      try {
        setLoadingTransaction(true);
        const { data, paging, summary } = await walletService.getTransactions(
          walletId,
          pageNumber
        );
        const index = _transactions.findIndex((ts) => ts.walletId === walletId);
        if (index === -1) {
          // is transactions not existed, add new
          setTransactions([
            ..._transactions,
            { walletId, data, paging, summary },
          ]);
        } else {
          // update transactions
          setTransactions(
            _transactions.map((ts) => {
              if (ts.walletId === walletId) {
                return {
                  ...ts,
                  data: [...ts.data, ...data],
                  paging: paging,
                  summary: summary,
                };
              }
              return ts;
            })
          );
        }
        setLoadingTransaction(false);
        clearWalletErrors();
      } catch (error) {
        setLoadingTransaction(false);
        setTransactionError(error as Error);
      }
    },
    [setTransactions, _transactions]
  );

  const refreshTransactions = useCallback(
    async (walletId?: string) => {
      if (!walletId) {
        return;
      }
      try {
        setRefreshingTransaction(true);
        const { data, paging, summary } = await walletService.getTransactions(
          walletId,
          1
        );
        const index = _transactions.findIndex((ts) => ts.walletId === walletId);
        if (index === -1) {
          // is transactions not existed, add new
          setTransactions([
            ..._transactions,
            { walletId, data, paging, summary },
          ]);
        } else {
          // update transactions
          setTransactions(
            _transactions.map((ts) => {
              if (ts.walletId === walletId) {
                return {
                  ...ts,
                  data: data,
                  paging: paging,
                  summary: summary,
                };
              }
              return ts;
            })
          );
        }
        setRefreshingTransaction(false);
        clearWalletErrors();
      } catch (error) {
        setRefreshingTransaction(false);
        setTransactionError(error as Error);
      }
    },
    [setTransactions, _transactions]
  );

  const getTransactionPaging = useCallback(
    (walletId?: string) => {
      if (!walletId) {
        return undefined;
      }
      const transaction = _transactions.find(
        (item) => item.walletId === walletId
      );
      return transaction?.paging;
    },
    [_transactions]
  );

  const getTransactionByWalletId = useCallback(
    (walletId: string) => {
      return _transactions.find((item) => item.walletId === walletId);
    },
    [_transactions]
  );

  const groupTransactions = useCallback(
    (walletId?: string) => {
      if (!walletId) {
        return [];
      }
      const walletTransaction = _transactions.find(
        (item) => item.walletId === walletId
      );
      const data = walletTransaction?.data;
      if (!data) {
        return [];
      }
      const sortedByDate = orderBy<Transaction>(
        data,
        [(txn: any) => new Date(txn.txnDateTime)],
        ['desc']
      );
      const group = groupBy<Transaction>(
        sortedByDate,
        (transaction: Transaction) =>
          moment(transaction.txnDateTime).format('DD MMM YYYY')
      );
      return Object.keys(group).map((key) => ({
        section: moment(key, 'DD MMM YYYY').toISOString(),
        data: orderBy<Transaction>(group[key], ['txnDateTime'], ['desc']),
      }));
    },
    [_transactions]
  );

  const getTransactionSummary = useCallback(
    (walletId?: string) => {
      if (!walletId) {
        return undefined;
      }
      const walletTransaction = _transactions.find(
        (item) => item.walletId === walletId
      );
      const summary = walletTransaction?.summary;

      if (!summary) {
        return undefined;
      }
      return summary;
    },
    [_transactions]
  );

  const clearTransactions = useCallback(() => {
    setTransactions([]);
  }, []);

  const getAccountStatus = useCallback(() => {
    walletService.getAccountStatus();
  }, []);

  const getCryptoExchangeData = useCallback(
    async (
      limit?: number,
      fromCurrency?: string,
      includePercentageChange?: boolean,
      percentageChangeUnit?: string,
      percentageChangeOffset?: number
    ) => {
      setIsLoadingCryptoExchange(true);
      const result = await walletService.getCurrenciesExchangeRate(
        1,
        limit ?? 100,
        'PHP',
        fromCurrency,
        includePercentageChange,
        percentageChangeUnit,
        percentageChangeOffset
      );
      setCryptoExchangeData(result.data);
      setIsLoadingCryptoExchange(false);
    },
    []
  );

  const getHistoricalExchangeRate = async (
    updateAtFrom: string,
    type: string
  ) => {
    setIsLoadingHistoricalExchangeRate(true);
    const result = await walletService.getCurrenciesHistoricalExchangeRate(
      updateAtFrom,
      type,
      'PHP',
      maxLengthExchangeRateHistory,
      1
    );
    setIsLoadingHistoricalExchangeRate(false);
    return result;
  };

  const getListCurrency = useCallback(async () => {
    setIsLoadingListCurrency(true);
    const result = await walletService.getListCurrency();
    setIsLoadingListCurrency(false);
    setListCurrency(result.data);
  }, []);

  const initMoneyin = useCallback(async () => {
    setIsLoadingInitMoneyIn(true);
    const unionWallet: Wallet | undefined = _wallets.find(
      (w) => w.bankAccount.bankCode === 'UnionDigital'
    );
    const cryptoWallet: Wallet | undefined = _wallets.find(
      (w) => w.bankAccount.bankCode === 'PDAX'
    );
    if (unionWallet && cryptoWallet && _amount) {
      const result = await walletService.moneyInInitital(
        _amount,
        unionWallet?.bankAccount.accountNumber,
        cryptoWallet?.bankAccount.accountNumber
      );
      setPaymentId(result.Data.DomesticPaymentId);
    }
    setIsLoadingInitMoneyIn(false);
  }, [_wallets, _amount]);

  const initMoneyOut = useCallback(async () => {
    setIsLoadingInitMoneyOut(true);
    const unionWallet: Wallet | undefined = _wallets.find(
      (w) => w.bankAccount.bankCode === 'UnionDigital'
    );
    const cryptoWallet: Wallet | undefined = _wallets.find(
      (w) => w.bankAccount.bankCode === 'PDAX'
    );
    if (unionWallet && cryptoWallet && _amount) {
      const result = await walletService.moneyOutInitital(
        _amount,
        cryptoWallet?.bankAccount.accountNumber,
        unionWallet?.bankAccount.accountNumber
      );
      setPaymentId(result.Data.DomesticPaymentId);
    }
    setIsLoadingInitMoneyOut(false);
  }, [_wallets, _amount]);

  const setAmountCryptoIn = useCallback((amount: number) => {
    setAmount(amount);
  }, []);

  const setAmountCryptoOut = useCallback((amount: number) => {
    setAmount(amount);
  }, []);

  const getCryptoTransactions = useCallback(
    async (isLoadMore = false, filter = {}) => {
      setIsLoadingCryptoTransactions(true);
      const pageSize = 20;
      const pageNumber =
        isLoadMore && _cryptoTransactionsPaging
          ? _cryptoTransactionsPaging.pageNumber + 1
          : 1;

      const result = await walletService.getCryptoTransactions(
        pageNumber,
        pageSize,
        filter
      );
      setCryptoTransactions(
        isLoadMore ? [..._cryptoTransactions, ...result.data] : result.data
      );
      setCryptoTransactionsPaging(result.paging);
      setIsLoadingCryptoTransactions(false);
    },
    [_cryptoTransactionsPaging]
  );

  const getFinancialProfile = useCallback(
    async (userId: string, bankId: string) => {
      console.log('getFinancialProfile -> request');
      setIsLoadingFinancialProfile(true);
      const result = await walletService.getFinancialProfile(userId, bankId);
      setIsLoadingFinancialProfile(false);
      setFinancialProfile(result.data);
    },
    []
  );

  const getWalletLimits = useCallback(async (walletId: string) => {
    setIsLoadingWalletLimits(true);
    const result = await walletService.getLimitByWalletId(walletId);
    setIsLoadingWalletLimits(false);
    setWalletLimits(result.data);
  }, []);

  return useMemo(
    () => ({
      wallets: _wallets,
      isLoadingWallets: _isLoadingWallets,
      getWallets,
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
      isRefreshingWallets: _isRefreshingWallet,
      refreshWallets,
      isSharingInformation: _isSharingInformation,
      errorShareInformation: _errorShareInformation,
      shareInformation,
      isShareSuccessfully: _isShareSuccessfully,
      isLinkedSuccessfully: _isLinkedSuccessfully,
      transactions: _transactions,
      fetchTransactions,
      transactionError: _transactionError,
      isLoadingTransaction: _isLoadingTransaction,
      refreshTransactions,
      isRefreshingTransaction: _isRefreshingTransaction,
      getTransactionPaging,
      groupTransactions,
      getTransactionSummary,
      clearTransactions,
      getTransactionByWalletId,
      isLoadingCryptoTC: _isLoadingCryptoTC,
      cryptoTC: _cryptoTC,
      getCryptoTcData,
      getCryptoExchangeData,
      isLoadingCryptoExchange: _isLoadingCryptoExchange,
      cryptoExchangeData: _cryptoExchangeData,
      getAccountStatus: getAccountStatus,
      getHistoricalExchangeRate,
      isLoadingHistoricalExchangeRate: _isLoadingHistoricalExchangeRate,
      getListCurrency,
      isLoadingListCurrency: _isLoadingListCurrency,
      listCurrency: _listCurrency,
      walletsById: _walletsById,
      refreshWalletsById,
      getWalletsById,
      initMoneyin,
      isLoadingInitMoneyIn: _isLoadingInitMoneyIn,
      paymentId: _paymentId,
      amount: _amount,
      setAmountCryptoIn,
      unionWallet: _unionWallets,
      cryptoWallet: _cryptoWallets,
      setAmountCryptoOut,
      initMoneyOut,
      isLoadingInitMoneyOut: _isLoadingInitMoneyOut,
      currentTransfer: _currentTransfer,
      setCurrentTransfer,
      getCryptoTransactions,
      cryptoTransactions: _cryptoTransactions,
      isLoadingGetCryptoTransactions: _isLoadingCryptoTransactions,
      cryptoTransactionsPaging: _cryptoTransactionsPaging,
      getFinancialProfile,
      isLoadingFinancialProfile: _isLoadingFinancialProfile,
      financialProfile: _financialProfile,
      getWalletLimits,
      isLoadingWalletLimits: _isLoadingWalletLimits,
      walletLimits: _walletLimits,
    }),
    [
      _isLinkedSuccessfully,
      _wallets,
      _isLinkingWallet,
      _summary,
      _loadError,
      _unlinkError,
      _isUnlinking,
      _isUpdatingPrimary,
      _updatePrimaryError,
      _isLinkingWallet,
      _linkWalletError,
      _isRefreshingWallet,
      _isSharingInformation,
      _errorShareInformation,
      _isShareSuccessfully,
      _transactions,
      _transactionError,
      _isLoadingTransaction,
      _isRefreshingTransaction,
      _isLoadingWallets,
      _isLoadingCryptoTC,
      _cryptoTC,
      _isLoadingCryptoExchange,
      _cryptoExchangeData,
      _isLoadingHistoricalExchangeRate,
      _isLoadingListCurrency,
      _listCurrency,
      _walletsById,
      _amount,
      _paymentId,
      _isLoadingInitMoneyIn,
      _unionWallets,
      _cryptoWallets,
      _isLoadingFinancialProfile,
      _financialProfile,
      _isLoadingInitMoneyOut,
      _currentTransfer,
      _cryptoTransactions,
      _isLoadingCryptoTransactions,
      _cryptoTransactionsPaging,
      _isLoadingWalletLimits,
      _walletLimits,
    ]
  );
}
