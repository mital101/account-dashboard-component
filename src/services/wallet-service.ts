import { AuthServices } from 'react-native-auth-component';

type WalletClient = {
  walletClient: any;
  financialClient: any;
  contentTemplateClient: any;
  exchangeRateClient: any;
  countryInformationClient: any;
};

export class WalletService {
  private static _instance: WalletService = new WalletService();

  private _walletClient?: any;
  private _financialClient?: any;
  private _contentTemplateClient?: any;
  private _exchangeRateClient?: any;
  private _countryInformationClient?: any;
  private authService = AuthServices.instance();

  constructor() {
    if (WalletService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use WalletService.getInstance() instead of new.'
      );
    }
    WalletService._instance = this;
  }

  public static instance(): WalletService {
    return WalletService._instance;
  }

  public initClients = (clients: WalletClient) => {
    this._walletClient = clients.walletClient;
    this._financialClient = clients.financialClient;
    this._contentTemplateClient = clients.contentTemplateClient;
    this._exchangeRateClient = clients.exchangeRateClient;
    this._countryInformationClient = clients.countryInformationClient;
  };

  getWallets = async () => {
    if (this._walletClient) {
      const response = await this._walletClient.get('wallets', {
        params: {
          pageSize: 0,
          pageNumber: 0,
        },
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  getWalletDetails = async (walletId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.get(`wallets/${walletId}`);
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  linkBankAccount = async (
    bankId: string,
    consentId: string,
    accountIds?: string[]
  ) => {
    if (this._walletClient) {
      const response = await this._walletClient.post(
        'wallets/link-bank-accounts',
        {
          bankId,
          consentId,
          accountIds,
          async: true,
        }
      );
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  unlinkBankWallet = async (walletId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.delete(`wallets/${walletId}`);
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  setDefaultWallet = async (walletId: string, isDefaultWallet: boolean) => {
    if (this._walletClient) {
      const response = await this._walletClient.patch(`wallets/${walletId}`, {
        isDefaultWallet,
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  shareInformation = async (
    userId: string,
    accountNumbers: string[],
    toEmails: string[],
    fromDateTime: string,
    toDateTime: string,
    expiryDateTime: string
  ) => {
    if (this._financialClient) {
      const response = await this._financialClient.post(
        `users/${userId}/financial-profiles/shares`,
        {
          accountNumbers,
          toEmails,
          fromDateTime,
          toDateTime,
          maskAccountNumber: true,
          fileFormat: 'EXCEL',
          sendAsEmbeddedAttachment: true,
          expiryDateTime,
        }
      );
      return response.data;
    } else {
      throw new Error('Financial Client is not registered');
    }
  };

  getTransactions = async (walletIds: string, pageNumber?: number) => {
    if (this._walletClient) {
      const response = await this._walletClient.get('transactions', {
        params: {
          walletIds: walletIds,
          pageNumber,
          pageSize: 10,
        },
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  getCryptoTC = async (
    templateName: string,
    appId: string,
    entityId: string,
    format: string
  ) => {
    if (this._contentTemplateClient) {
      const response = await this._contentTemplateClient.post('contents', {
        appId: appId,
        documentFormat: format,
        entityId: entityId,
        templateName: templateName,
        data: {},
      });
      return response.data;
    } else {
      throw new Error('Content Template Client is not registered');
    }
  };

  getCurrenciesExchangeRate = async (
    pageNum?: number,
    pageSize?: number,
    toCurrency?: string
  ) => {
    console.log('getCurrenciesExchangeRate', this._exchangeRateClient);
    if (this._exchangeRateClient) {
      const response = await this._exchangeRateClient.get(
        'currencies/exchange-rates',
        {
          params: {
            pageNum: pageNum,
            pageSize: pageSize,
            toCurrency: toCurrency,
          },
        }
      );
      console.log('response', response);
      return response.data;
    } else {
      throw new Error('Exchange rate client service is not registered');
    }
  };

  getCurrenciesHistoricalExchangeRate = async (
    updateAtFrom?: string,
    fromCurrency?: string,
    toCurrency?: string,
    pageNum?: number,
    pageSize?: number
  ) => {
    console.log('getCurrenciesExchangeRate', this._exchangeRateClient);
    if (this._exchangeRateClient) {
      const response = await this._exchangeRateClient.get(
        'currencies/historical-exchange-rates',
        {
          params: {
            pageNum,
            pageSize,
            fromCurrency,
            toCurrency,
            updateAtFrom: updateAtFrom,
          },
        }
      );
      console.log('response', response.data);
      return response.data;
    } else {
      throw new Error(
        'Historical exchange rate client service is not registered'
      );
    }
  };

  getAccountStatus = async () => {
    const token = await this.authService.fetchAppAccessToken();
  };

  getListCurrency = async () => {
    if (this._countryInformationClient) {
      const response = await this._countryInformationClient.get(
        'currencies?currencyType=CRYPTO'
      );
      return response.data;
    } else {
      throw new Error(
        'Historical exchange rate client service is not registered'
      );
    }
  };
}
