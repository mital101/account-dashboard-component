type WalletClient = {
  walletClient: any;
  financialClient: any;
  contentTemplateClient: any;
};

export class WalletService {
  private static _instance: WalletService = new WalletService();

  private _walletClient?: any;
  private _financialClient?: any;
  private _contentTemplateClient?: any;

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

  linkBankAccount = async (bankId: string, consentId: string, accountIds?: string[]) => {
    if (this._walletClient) {
      const response = await this._walletClient.post('wallets/link-bank-accounts', {
        bankId,
        consentId,
        accountIds,
        async: true,
      });
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

  getCryptoTC = async (templateName:string,appId:string,entityId:string,format:string) => {
    if (this._contentTemplateClient) {
      const response = await this._contentTemplateClient.post('contents',{
      	appId: appId,
      	documentFormat: format,
      	entityId: entityId,
      	templateName: templateName,
        data: {}
      });
      return response.data;
    } else {
      console.log('eeeeeeeeeeeeee');

      throw new Error('Content Template Client is not registered');
    }
  };
}
