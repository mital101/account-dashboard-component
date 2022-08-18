export interface Wallet {
  availableBalance: number;
  currentBalance: number;
  bankAccount: {
    accountId: string;
    accountSubType: string;
    accountHolderName: string;
    accountNumber: string;
    bankCode: string;
    bankLogo?: string;
    bankBranchId?: string;
    countryCode: string;
    internalProductCategory: string;
    productId: string;
  };
  currencyCode: string;
  walletName: string;
  type: string;
  walletId: string;
  isDefaultWallet: boolean;
  isAggregated?: boolean;
}

export interface FinancialProfileWalletSummary {
  walletId: string;
  currentBalance?: number;
  availableBalance?: number;
  currency?: string;
  baseCurrency?: string;
  currentBalanceInBaseCurrency?: number;
  availableBalanceInBaseCurrency?: number;
}
export interface FinancialProfile {
  totalAvailableBalance: number;
  totalCurrentBalance: number;
  walletSummaries: FinancialProfileWalletSummary[];
}

export interface WalletSummary {
  availableBalance: number;
  currentBalance: number;
  minimumBalance: number;
  totalMoneyIn: number;
  totalMoneyOut: number;
}

export interface WalletLimit {
  limitValue: number;
  remainingLimitValue: number;
  limitUnit: string;
  serviceProvider: string;
  userId: string;
  frequence: string;
}

export interface Bank {
  name: string;
  id: string;
  imageUrl: string;
  isLinked: boolean;
  isInternalVirtualBank: boolean;
  countryCode: string;
  accreditedDataRecipientId: string;
  customerFacing: boolean;
  creditScoreSupported: boolean;
  permissions: BankPermission[];
  openBankingId: string;
}

export interface BankPermission {
  countryCode: string;
  description: string;
  id: string;
  ordinal: number;
  permissionCode: string;
  permissionGroup: string;
  permissionTitle: string;
  shortDescription: string;
}

export interface Paging {
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
}

export interface TransactionSummary {
  totalMoneyIn: number;
  totalMoneyOut: number;
}

export interface Transaction {
  txnId: string;
  txnType: string;
  txnCategory: string;
  txnCode: string;
  txnDateTime: string;
  description: string;
  creditDebitIndicator: string;
  amount: {
    amount: number;
    currency: string;
  };
  totalFeeAmount?: {
    amount: number;
    currency: string;
  };
  destinationAccount: TransactionAccount;
  sourceAccount: TransactionAccount;
  recipientDescription?: string;
  paymentTerminal: {
    name: PaymentTerminalName;
  };
  status?: string;
}

export enum PaymentTerminalName {
  pesonet = 'PNT',
  ud = 'UD',
  instapay = 'ITP',
}

export interface TransactionAccount {
  accountNumber: string;
  walletId: string;
  accountName: string;
  isDefaultAccount: boolean;
  bankInfo: {
    code: string;
    openBankingSupport: boolean;
    legalName?: string;
  };
  isJoinedAccount: boolean;
  multiCurrencySupported: boolean;
}

export interface WalletTransaction {
  walletId: string;
  paging: Paging;
  data: Transaction[];
  summary: TransactionSummary;
}

export interface GroupedWallet {
  section: string;
  data: Wallet[];
}

export type GroupedWallets = Array<GroupedWallet>;

export interface GroupedTransaction {
  section: string;
  data: Transaction[];
}

export type GroupedTransactions = Array<GroupedTransaction>;

export enum CreditDebitIndicator {
  Credit = 'Credit',
  Debit = 'Debit',
}

export enum WalletType {
  BankWallet = 'BANK_WALLET',
}

export type BankImagesMap = Record<string, string>;

export interface BankAccount {
  accountId: string;
  nickname: string;
  status: string;
  accountType: string;
  accountSubType: string;
  sortCodeAccountNumber: string;
  servicer: {
    identification: string;
  };
  account: {
    schemeName: string;
    identification: string;
    name: string;
    secondaryIdentification: string;
  }[];
}

export interface BankingConsentData {
  bankId: string;
  accountConsentId: string;
  accountRequestId: string;
  loginUrl: string;
  redirectUrl: string;
  idToken: string;
}

export interface Cashflow {
  fromDateTime: string;
  toDateTime: string;
  periodFrequence: string;
  baseCurrencyCode: string;
  totalClosingAvailableBalance: number;
  totalClosingCurrentBalance: number;
  totalPendingMoneyIn: number;
  totalPendingMoneyOut: number;
  totalMoneyIn: number;
  totalMoneyOut: number;
  totalOpeningAvailableBalance: number;
  totalOpeningCurrentBalance: number;
  cashflowPeriods: CashflowPeriod[];
}

export interface CashflowPeriod {
  period: number;
  totalPendingMoneyIn: number;
  totalPendingMoneyOut: number;
  totalMoneyIn: number;
  totalMoneyOut: number;
  from: string;
  to: string;
}

export interface GroupAccountConsent {
  section: string;
  data: AccountConsent[];
}
export interface AccountConsent {
  accountConsentId: string;
  accountRequestId: string;
  createdAt: string;
  expiredAt: string;
  organisationId: string;
  status: string;
  userId: string;
  consentData: ConsentData;
  aspspInfo: Bank;
}

export interface ConsentData {
  AccountRequestId: string;
  ConsentId: string;
  Permissions: string[];
  Status: string;
}

export interface CryptoTCData {
  documentFormat: string;
  version: string;
  summaryContent: string;
  content: string;
  title: string;
}

export interface Currency {
  code: string;
  decimals: string;
  isoCode: string;
  name: string;
  symbol: string;
  isTop: boolean;
  currencyType: string;
  description: string;
  logo: string;
}

export interface ExchangRateCurrency {
  code: string;
  id: string;
  name: string;
  symbol: string;
  symbolGraphic: string;
}

export interface CurrencyExchangeRateData {
  id: string;
  exchangeRate: string;
  fromCurrency: ExchangRateCurrency;
  toCurrency: ExchangRateCurrency;
  rateType: string;
  ratio: number;
  updatedAt: string;
}
