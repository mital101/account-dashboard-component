import { FilterTransaction } from '../types';
import qs from 'qs';

type WalletClient = {
  walletClient: any;
  financialClient: any;
  contentTemplateClient: any;
  exchangeRateClient: any;
  countryInformationClient: any;
  paymentClient: any;
  limitClient: any;
};

export class WalletService {
  private static _instance: WalletService = new WalletService();

  private _walletClient?: any;
  private _financialClient?: any;
  private _contentTemplateClient?: any;
  private _exchangeRateClient?: any;
  private _countryInformationClient?: any;
  private _paymentClient?: any;
  private _limitClient?: any;
  private _paymentQuoteClient?: any;
  private _paymentOrderClient?: any;

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
    this._paymentClient = clients.paymentClient;
    this._limitClient = clients.limitClient;
    this._paymentQuoteClient = clients.paymentQuoteClient;
    this._paymentOrderClient = clients.paymentOrderClient;
  };

  getWallets = async () => {
    if (this._walletClient) {
      const response = await this._walletClient.get('wallets');
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
    toCurrency?: string,
    fromCurrency?: string,
    includePercentageChange?: boolean,
    percentageChangeUnit?: string,
    percentageChangeOffset?: number
  ) => {
    if (this._exchangeRateClient) {
      const response = await this._exchangeRateClient.get(
        'currencies/exchange-rates',
        {
          params: {
            pageNum: pageNum,
            pageSize: pageSize,
            toCurrency: toCurrency,
            fromCurrency: fromCurrency,
            includePercentageChange: includePercentageChange,
            percentageChangeUnit: percentageChangeUnit,
            percentageChangeOffset: percentageChangeOffset,
          },
        }
      );
      return response.data;
    } else {
      throw new Error('Exchange rate client service is not registered');
    }
  };

  getCurrenciesHistoricalExchangeRate = async (
    updatedAtFrom?: string,
    fromCurrency?: string,
    toCurrency?: string,
    pageNum?: number,
    pageSize?: number
  ) => {
    if (this._exchangeRateClient) {
      const response = await this._exchangeRateClient.get(
        'currencies/historical-exchange-rates',
        {
          params: {
            pageNum,
            pageSize,
            fromCurrency,
            toCurrency,
            updatedAtFrom,
          },
        }
      );
      return response.data;
    } else {
      throw new Error(
        'Historical exchange rate client service is not registered'
      );
    }
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

  moneyInValidation = async (
    amount: number,
    senderAccountNumber: string,
    receiverAccountNumber: string
  ) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.post(
          'inward-payments/validations',
          {
            Data: {
              Initiation: {
                LocalInstrument: 'PDAX',
                InstructedAmount: {
                  Amount: amount,
                  Currency: 'PHP',
                },
                DebtorAccount: {
                  Identification: senderAccountNumber,
                  SchemeName: 'PH.BRSTN.AccountNumber',
                },
                DebtorAccountExt: {
                  BankCode: 'UnionDigital',
                },
                CreditorAccount: {
                  Identification: receiverAccountNumber,
                  SchemeName: 'PH.BRSTN.AccountNumber',
                },
                CreditorAccountExt: {
                  BankCode: 'PDAX',
                },
                RemittanceInformation: {
                  Unstructured: 'notes',
                },
                SupplementaryData: {
                  PaymentType: 'MoneyIn',
                },
              },
            },
            Risk: {
              PaymentContextCode: 'PartyToParty',
            },
          }
        );
        return response.data;
      } catch (error) {
        return 'error: ' + error;
      }
    } else {
      throw new Error('Payment client service is not registered');
    }
  };

  moneyInInitital = async (
    amount: number,
    senderAccountNumber: string,
    receiverAccountNumber: string
  ) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.post('inward-payments', {
          Data: {
            Initiation: {
              LocalInstrument: 'PDAX',
              InstructedAmount: {
                Amount: amount,
                Currency: 'PHP',
              },
              DebtorAccount: {
                Identification: senderAccountNumber,
                SchemeName: 'PH.BRSTN.AccountNumber',
              },
              CreditorAccount: {
                Identification: receiverAccountNumber,
                SchemeName: 'PH.BRSTN.AccountNumber',
              },
              RemittanceInformation: {
                Unstructured:
                  'Topup money from Pitaka account to Crypto Wallet',
              },
              SupplementaryData: {
                PaymentType: 'MoneyIn',
              },
              CreditorAccountExt: {
                BankCode: 'PDAX',
              },
              DebtorAccountExt: {
                BankCode: 'UnionDigital',
              },
            },
          },
          Risk: {
            PaymentContextCode: 'PartyToParty',
          },
        });
        return response.data;
      } catch (error) {
        return 'error: ' + error;
      }
    } else {
      throw new Error('Payment client service is not registered');
    }
  };

  moneyInConfirmation = async (id: string, otp: string) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.patch(
          'inward-payments/' + id,
          {
            Data: {
              Initiation: {
                LocalInstrument: 'PDAX',
                SupplementaryData: {
                  PaymentType: 'MoneyIn',
                  CustomFields: [
                    {
                      Key: 'OTP',
                      Value: `${otp}`,
                    },
                  ],
                },
              },
            },
          }
        );
        return response.data;
      } catch (error) {
        return error;
      }
    } else {
      throw new Error('Payment client service is not registered');
    }
  };

  //Money Out

  moneyOutValidation = async (
    amount: number,
    senderAccountNumber: string,
    receiverAccountNumber: string
  ) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.post(
          'outward-payments/validations',
          {
            Data: {
              Initiation: {
                LocalInstrument: 'PDAX',
                InstructedAmount: {
                  Amount: amount,
                  Currency: 'PHP',
                },
                DebtorAccount: {
                  Identification: senderAccountNumber,
                  SchemeName: 'PH.BRSTN.AccountNumber',
                },
                DebtorAccountExt: {
                  BankCode: 'PDAX',
                },
                CreditorAccount: {
                  Identification: receiverAccountNumber,
                  SchemeName: 'PH.BRSTN.AccountNumber',
                },
                CreditorAccountExt: {
                  BankCode: 'UnionDigital',
                },
                RemittanceInformation: {
                  Unstructured: 'notes',
                },
                SupplementaryData: {
                  PaymentType: 'MoneyOut',
                },
              },
            },
            Risk: {
              PaymentContextCode: 'PartyToParty',
            },
          }
        );
        return response.data;
      } catch (error) {
        return 'error: ' + error;
      }
    } else {
      throw new Error('Payment client service is not registered');
    }
  };

  moneyOutInitital = async (
    amount: number,
    senderAccountNumber: string,
    receiverAccountNumber: string
  ) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.post('outward-payments', {
          Data: {
            Initiation: {
              LocalInstrument: 'PDAX',
              InstructedAmount: {
                Amount: amount,
                Currency: 'PHP',
              },
              DebtorAccount: {
                Identification: senderAccountNumber,
                SchemeName: 'PH.BRSTN.AccountNumber',
              },
              CreditorAccount: {
                Identification: receiverAccountNumber,
                SchemeName: 'PH.BRSTN.AccountNumber',
              },
              RemittanceInformation: {
                Unstructured:
                  'Topup money from Pitaka account to Crypto Wallet',
              },
              SupplementaryData: {
                PaymentType: 'MoneyOut',
              },
              CreditorAccountExt: {
                BankCode: 'UnionDigital',
              },
              DebtorAccountExt: {
                BankCode: 'PDAX',
              },
            },
          },
          Risk: {
            PaymentContextCode: 'PartyToParty',
          },
        });
        return response.data;
      } catch (error) {
        return 'error: ' + error;
      }
    } else {
      throw new Error('Payment client service is not registered');
    }
  };

  moneyOutConfirmation = async (id: string, otp: string) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.patch(
          'outward-payments/' + id,
          {
            Data: {
              Initiation: {
                LocalInstrument: 'PDAX',
                SupplementaryData: {
                  PaymentType: 'MoneyOut',
                  CustomFields: [
                    {
                      Key: 'OTP',
                      Value: `${otp}`,
                    },
                  ],
                },
              },
            },
          }
        );
        return response.data;
      } catch (error) {
        return error;
      }
    } else {
      throw new Error('Payment client service is not registered');
    }
  };

  getWalletsByBankId = async (bankId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.get('wallets', {
        params: {
          bankId: bankId,
        },
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  getCryptoTransactions = async (
    pageNumber: number,
    pageSize: number,
    filter?: FilterTransaction
  ) => {
    if (this._walletClient) {
      const params = {
        walletType: 'CRYPTO_WALLET',
        pageNumber,
        pageSize,
        statuses: filter?.status,
        fromDateTime: filter?.from,
        toDateTime: filter?.to,
        txnTypes: filter?.types,
      };

      const response = await this._walletClient.get('transactions', {
        params: {
          ...params,
        },
        paramsSerializer: (params: any) => {
          return qs.stringify(params, { indices: false });
        },
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  getCryptoPaymentTransaction = async (paymentId: string) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.get('payments/' + paymentId);
        return response.data;
      } catch (error) {
        return error;
      }
    } else {
      throw new Error('Payment client service is not registered');
    }
  };

  getFinancialProfile = async (userId: string, bankId: string) => {
    if (this._financialClient) {
      const response = await this._financialClient.get(
        `users/${userId}/financial-profile`,
        {
          params: {
            bankId: bankId,
          },
        }
      );
      return response.data;
    } else {
      throw new Error('Financial Client is not registered');
    }
  };

  getLimitByWalletId = async (walletId: string) => {
    if (this._limitClient) {
      const response = await this._limitClient.get(`limits`, {
        params: {
          walletId: walletId,
          serviceProvider: 'UD',
        },
      });
      console.log('getLimitByWalletId -> data', response.data);
      return response.data;
    } else {
      throw new Error('Limit Client is not registered');
    }
  };

  createTradeQuote = async (
    amount: number,
    quoteType: string,
    itemCode: string,
    itemName: string
  ) => {
    if (this._paymentQuoteClient) {
      try {
        const response = await this._paymentQuoteClient.post('/quotes', {
          quotes: [
              {
                  quoteType: quoteType,
                  currency: "PHP",
                  totalAmount: amount,
                  lineItems: [
                      {
                          itemName: itemName,
                          itemCode: itemCode
                      }
                  ]
              }
          ]
        });
        return response.data;
      } catch (error) {
        return 'error: ' + error;
      }
    } else {
      throw new Error('Payment quotes client service is not registered');
    }
  };

  placeTradeOrder = async (
    quoteId: string,
  ) => {
    if (this._paymentOrderClient) {
      try {
        const response = await this._paymentOrderClient.post('/orders', {
          "quoteId": quoteId
        });
        return response.data;
      } catch (error) {
        return 'error: ' + error;
      }
    } else {
      throw new Error('Payment quotes client service is not registered');
    }
  };
}
