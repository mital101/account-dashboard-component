import qs from "qs";
import {
  FilterTransaction,
  UdpateLimitType,
  VirtualCardApplicationBody
} from "../types";

type WalletClient = {
  walletClient: any;
  financialClient: any;
  contentTemplateClient: any;
  exchangeRateClient: any;
  countryInformationClient: any;
  paymentClient: any;
  limitClient: any;
  paymentQuoteClient: any;
  paymentOrderClient: any;
  mfaClient: any;
  walletServiceClient: any;
  accountOriginationClient: any;
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
  private _mfaClient?: any;
  private _walletServiceClient?: any;
  private _accountOriginationClient?: any;

  constructor() {
    if (WalletService._instance) {
      throw new Error(
        "Error: Instantiation failed: Use WalletService.getInstance() instead of new."
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
    this._mfaClient = clients.mfaClient;
    this._walletServiceClient = clients.walletServiceClient;
    this._accountOriginationClient = clients.accountOriginationClient;
  };

  getWallets = async () => {
    if (this._walletClient) {
      const response = await this._walletClient.get("wallets");
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
    }
  };

  getWalletDetails = async (walletId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.get(`wallets/${walletId}`);
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
    }
  };

  linkBankAccount = async (
    bankId: string,
    consentId: string,
    accountIds?: string[]
  ) => {
    if (this._walletClient) {
      const response = await this._walletClient.post(
        "wallets/link-bank-accounts",
        {
          bankId,
          consentId,
          accountIds,
          async: true,
        }
      );
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
    }
  };

  unlinkBankWallet = async (walletId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.delete(`wallets/${walletId}`);
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
    }
  };

  setDefaultWallet = async (walletId: string, isDefaultWallet: boolean) => {
    if (this._walletClient) {
      const response = await this._walletClient.patch(`wallets/${walletId}`, {
        isDefaultWallet,
      });
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
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
          fileFormat: "EXCEL",
          sendAsEmbeddedAttachment: true,
          expiryDateTime,
        }
      );
      return response.data;
    } else {
      throw new Error("Financial Client is not registered");
    }
  };

  getTransactions = async (walletIds: string, pageNumber?: number) => {
    if (this._walletClient) {
      const response = await this._walletClient.get("transactions", {
        params: {
          walletIds: walletIds,
          pageNumber,
          pageSize: 10,
        },
      });
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
    }
  };

  getCryptoTC = async (
    templateName: string,
    appId: string,
    entityId: string,
    format: string
  ) => {
    if (this._contentTemplateClient) {
      const response = await this._contentTemplateClient.post("contents", {
        appId: appId,
        documentFormat: format,
        entityId: entityId,
        templateName: templateName,
        data: {},
      });
      return response.data;
    } else {
      throw new Error("Content Template Client is not registered");
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
        "currencies/exchange-rates",
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
      throw new Error("Exchange rate client service is not registered");
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
        "currencies/historical-exchange-rates",
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
        "Historical exchange rate client service is not registered"
      );
    }
  };

  getListCurrency = async () => {
    if (this._countryInformationClient) {
      const response = await this._countryInformationClient.get(
        "currencies?currencyType=CRYPTO"
      );
      return response.data;
    } else {
      throw new Error(
        "Historical exchange rate client service is not registered"
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
          "inward-payments/validations",
          {
            Data: {
              Initiation: {
                LocalInstrument: "PDAX",
                InstructedAmount: {
                  Amount: amount,
                  Currency: "PHP",
                },
                DebtorAccount: {
                  Identification: senderAccountNumber,
                  SchemeName: "PH.BRSTN.AccountNumber",
                },
                DebtorAccountExt: {
                  BankCode: "UnionDigital",
                },
                CreditorAccount: {
                  Identification: receiverAccountNumber,
                  SchemeName: "PH.BRSTN.AccountNumber",
                },
                CreditorAccountExt: {
                  BankCode: "PDAX",
                },
                RemittanceInformation: {
                  Unstructured: "notes",
                },
                SupplementaryData: {
                  PaymentType: "MoneyIn",
                },
              },
            },
            Risk: {
              PaymentContextCode: "PartyToParty",
            },
          }
        );
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment client service is not registered");
    }
  };

  moneyInInitital = async (
    amount: number,
    senderAccountNumber: string,
    receiverAccountNumber: string
  ) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.post("inward-payments", {
          Data: {
            Initiation: {
              LocalInstrument: "PDAX",
              InstructedAmount: {
                Amount: amount,
                Currency: "PHP",
              },
              DebtorAccount: {
                Identification: senderAccountNumber,
                SchemeName: "PH.BRSTN.AccountNumber",
              },
              CreditorAccount: {
                Identification: receiverAccountNumber,
                SchemeName: "PH.BRSTN.AccountNumber",
              },
              RemittanceInformation: {
                Unstructured:
                  "Topup money from Pitaka account to Crypto Wallet",
              },
              SupplementaryData: {
                PaymentType: "MoneyIn",
              },
              CreditorAccountExt: {
                BankCode: "PDAX",
              },
              DebtorAccountExt: {
                BankCode: "UnionDigital",
              },
            },
          },
          Risk: {
            PaymentContextCode: "PartyToParty",
          },
        });
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment client service is not registered");
    }
  };

  moneyInConfirmation = async (id: string, otp: string) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.patch(
          "inward-payments/" + id,
          {
            Data: {
              Initiation: {
                LocalInstrument: "PDAX",
                SupplementaryData: {
                  PaymentType: "MoneyIn",
                  CustomFields: [
                    {
                      Key: "OTP",
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
      throw new Error("Payment client service is not registered");
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
          "outward-payments/validations",
          {
            Data: {
              Initiation: {
                LocalInstrument: "PDAX",
                InstructedAmount: {
                  Amount: amount,
                  Currency: "PHP",
                },
                DebtorAccount: {
                  Identification: senderAccountNumber,
                  SchemeName: "PH.BRSTN.AccountNumber",
                },
                DebtorAccountExt: {
                  BankCode: "PDAX",
                },
                CreditorAccount: {
                  Identification: receiverAccountNumber,
                  SchemeName: "PH.BRSTN.AccountNumber",
                },
                CreditorAccountExt: {
                  BankCode: "UnionDigital",
                },
                RemittanceInformation: {
                  Unstructured: "notes",
                },
                SupplementaryData: {
                  PaymentType: "MoneyOut",
                },
              },
            },
            Risk: {
              PaymentContextCode: "PartyToParty",
            },
          }
        );
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment client service is not registered");
    }
  };

  moneyOutInitital = async (
    amount: number,
    senderAccountNumber: string,
    receiverAccountNumber: string
  ) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.post("outward-payments", {
          Data: {
            Initiation: {
              LocalInstrument: "PDAX",
              InstructedAmount: {
                Amount: amount,
                Currency: "PHP",
              },
              DebtorAccount: {
                Identification: senderAccountNumber,
                SchemeName: "PH.BRSTN.AccountNumber",
              },
              CreditorAccount: {
                Identification: receiverAccountNumber,
                SchemeName: "PH.BRSTN.AccountNumber",
              },
              RemittanceInformation: {
                Unstructured:
                  "Topup money from Pitaka account to Crypto Wallet",
              },
              SupplementaryData: {
                PaymentType: "MoneyOut",
              },
              CreditorAccountExt: {
                BankCode: "UnionDigital",
              },
              DebtorAccountExt: {
                BankCode: "PDAX",
              },
            },
          },
          Risk: {
            PaymentContextCode: "PartyToParty",
          },
        });
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment client service is not registered");
    }
  };

  moneyOutConfirmation = async (id: string, otp: string) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.patch(
          "outward-payments/" + id,
          {
            Data: {
              Initiation: {
                LocalInstrument: "PDAX",
                SupplementaryData: {
                  PaymentType: "MoneyOut",
                  CustomFields: [
                    {
                      Key: "OTP",
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
      throw new Error("Payment client service is not registered");
    }
  };

  getWalletsByBankId = async (bankId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.get("wallets", {
        params: {
          bankId: bankId,
        },
      });
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
    }
  };

  getWalletsByWalletType = async (type: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.get("wallets", {
        params: {
          type: type,
        },
      });
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
    }
  };

  getCryptoTransactions = async (
    pageNumber: number,
    pageSize: number,
    filter?: FilterTransaction
  ) => {
    if (this._walletClient) {
      const params = {
        walletType: "CRYPTO_WALLET",
        pageNumber,
        pageSize,
        statuses: filter?.status,
        fromDateTime: filter?.from,
        toDateTime: filter?.to,
        txnTypes: filter?.types,
      };

      const response = await this._walletClient.get("transactions", {
        params: {
          ...params,
        },
        paramsSerializer: (params: any) => {
          return qs.stringify(params, { indices: false });
        },
      });
      return response.data;
    } else {
      throw new Error("Wallet Client is not registered");
    }
  };

  getCryptoPaymentTransaction = async (paymentId: string) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.get("payments/" + paymentId);
        return response.data;
      } catch (error) {
        return error;
      }
    } else {
      throw new Error("Payment client service is not registered");
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
      throw new Error("Financial Client is not registered");
    }
  };

  getLimitByWalletId = async (walletId: string) => {
    if (this._limitClient) {
      const response = await this._limitClient.get(`limits`, {
        params: {
          walletId: walletId,
          serviceProvider: "UD",
        },
      });
      console.log("getLimitByWalletId -> data", response.data);
      return response.data;
    } else {
      throw new Error("Limit Client is not registered");
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
        const response = await this._paymentQuoteClient.post("/quotes", {
          quotes: [
            {
              quoteType: quoteType,
              currency: "PHP",
              totalAmount: amount,
              lineItems: [
                {
                  itemName: itemName,
                  itemCode: itemCode,
                },
              ],
            },
          ],
        });
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment quotes client service is not registered");
    }
  };

  placeTradeOrder = async (quoteId: string) => {
    if (this._paymentOrderClient) {
      try {
        const response = await this._paymentOrderClient.post("/orders", {
          quoteId: quoteId,
        });
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment quotes client service is not registered");
    }
  };

  getVCSensitiveData = async (
    rsaKey: string,
    walletId: string,
    OTT: string
  ) => {
    console.log("getVCSensitiveData -> param", walletId, OTT, rsaKey);
    console.log("getVCSensitiveData -> rsaKey", rsaKey);
    if (this._walletClient) {
      try {
        const response = await this._walletClient.get(
          `/wallets/${walletId}/sensitive-data?oneTimeToken=${OTT}`,
          {
            headers: {
              encryptAlgorithm: "RSA",
              encryptKey: rsaKey,
            },
          }
        );
        console.log("getVCSensitiveData -> response.data", response.data);
        return response.data;
      } catch (error) {
        console.log("error2", error);
        throw error;
      }
    } else {
      throw new Error("Wallet client service is not registered");
    }
  };

  updateCardStatus = async (
    status: string,
    walletId: string,
    // ott: string,
    reason?: string,
    reasonCode?: string
  ) => {
    if (this._walletServiceClient) {
      console.log("service -> updateCardStatus", walletId, reason, reasonCode);
      try {
        const response = await this._walletServiceClient.post(
          `/wallets/${walletId}/status?oneTimeToken=`,
          {
            status,
            reason,
            reasonCode,
          }
        );
        console.log(
          "service -> updateCardStatus -> response.data",
          response.data
        );
        return response.data;
      } catch (error) {
        console.log("error2", error);
        throw error;
      }
    } else {
      throw new Error("Wallet client service is not registered");
    }
  };

  getTransactionLimitByProxyNumber = async (walletId: string) => {
    if (this._limitClient) {
      console.log("service -> getTransactionLimitByProxyNumber", walletId);
      try {
        const response = await this._limitClient.get(`limits`, {
          params: {
            walletId,
            serviceProvider: "EURONET",
          },
        });
        console.log(
          "service -> getTransactionLimitByProxyNumber -> response.data",
          response.data
        );
        return response.data;
      } catch (error) {
        console.log("error2", error);
        throw error;
      }
    } else {
      throw new Error("Limits client service is not registered");
    }
  };

  updateCardTransactionDailyLimit = async (
    walletId: string,
    limit: number,
    consentToken: string
  ) => {
    if (this._limitClient) {
      console.log(
        "service -> updateTransactionLimit",
        walletId,
        limit,
        consentToken
      );
      try {
        const response = await this._limitClient.put(`limit-settings`, {
          consentToken,
          walletId,
          limitSettings: [
            {
              limitName: "Daily online transaction max amount",
              serviceProvider: "EURONET",
              limitUnit: "PHP",
              frequence: "Daily",
              limitValue: limit,
              limitSettingFactors: [
                {
                  attributeName: "transactionType",
                  attributeFixedValues: "AGGR_OVERALL",
                },
              ],
            },
          ],
        });
        console.log(
          "service -> updateTransactionLimit -> response.data",
          response.data
        );
        return response.data;
      } catch (error) {
        console.log("error2", error);
        throw error;
      }
    } else {
      throw new Error("Wallet client service is not registered");
    }
  };

  generateOTP = async (flowId: string, referenceId: string) => {
    if (this._mfaClient) {
      try {
        const response = await this._mfaClient.post("otps", {
          flowId,
          referenceId,
        });
        console.log(
          "service -> generateOTPForCardDetails -> respone.data",
          response.data
        );
        return response.data;
      } catch (error) {
        console.log("error2", error);
        throw error;
      }
    } else {
      throw new Error("MFA client service is not registered");
    }
  };

  verifyOTP = async (flowId: string, otp: string, otpId: string) => {
    console.log("service -> verify otp -> otpId", otpId, otp);
    if (this._mfaClient) {
      try {
        const response = await this._mfaClient.put(`otps/${otpId}`, {
          flowId,
          otp,
        });
        console.log("service -> verify otp -> response.data", response.data);
        return response.data;
      } catch (error) {
        console.log("error2", error);
        throw error;
      }
    } else {
      throw new Error("MFA client service is not registered");
    }
  };

  getTransactionChannels = async (walletId: string) => {
    if (this._walletServiceClient) {
      try {
        const response = await this._walletServiceClient.get(
          `wallets/${walletId}/transaction-channels`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("Wallets client service is not registered");
    }
  };

  updateTransactionChannels = async (
    walletId: string,
    ott: string,
    isEnable: boolean
  ) => {
    if (this._walletClient) {
      console.log("service -> getTransactionLimitByProxyNumber", walletId);
      try {
        const response = await this._walletClient.put(
          `wallets/${walletId}/transaction-channels?oneTimeToken=${ott}`,
          {
            "transaction-channels": [
              {
                code: "ECOMDOMESTIC",
                enabled: isEnable,
              },
              {
                code: "ECOMINTERNATIONAL",
                enabled: isEnable,
              },
            ],
          }
        );
        console.log(
          "service -> getTransactionChannels -> response.data",
          response.data
        );
        return response.data;
      } catch (error) {
        console.log("error2", error);
        throw error;
      }
    } else {
      throw new Error("Wallets client service is not registered");
    }
  };

  getCryptoLimit = async (transactionType: string) => {
    if (this._limitClient) {
      const response = await this._limitClient.get(`limits`, {
        params: {
          transactionType: transactionType,
          serviceProvider: "PDAX",
        },
      });
      return response.data;
    } else {
      throw new Error("Limit Client is not registered");
    }
  };

  cryptoInValidation = async (
    currency: string,
    receiverAccountNumber: string
  ) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.post(
          "inward-payments/validations",
          {
            Data: {
              Initiation: {
                LocalInstrument: "PDAX",
                InstructedAmount: {
                  Currency: currency,
                },
                CreditorAccount: {
                  Identification: receiverAccountNumber,
                  SchemeName: "PH.BRSTN.AccountNumber",
                },
                CreditorAccountExt: {
                  BankCode: "PDAX",
                },
                SupplementaryData: {
                  PaymentType: "CryptoIn",
                },
              },
            },
            Risk: {
              PaymentContextCode: "PartyToParty",
            },
          }
        );
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment client service is not registered");
    }
  };

  cryptoOutValidation = async (
    amount: number,
    currency: string,
    senderAccountNumber: string,
    receiverAccountAddress: string,
    receiverFirstName: string,
    receiverLastName: string,
    receiverExchangeName: string
  ) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.post(
          "outward-payments/validations",
          {
            Data: {
              Initiation: {
                LocalInstrument: "PDAX",
                InstructedAmount: {
                  Amount: amount,
                  Currency: currency,
                },
                DebtorAccount: {
                  Identification: senderAccountNumber,
                  SchemeName: "PH.PlatformDefined.Id",
                },
                DebtorAccountExt: {
                  BankCode: "PDAX",
                },
                CreditorAccount: {
                  SecondaryIdentification: receiverAccountAddress,
                  SchemeName: "PH.BRSTN.AccountNumber",
                },
                CreditorAccountExt: {
                  BankCode: "872634829",
                },
                RemittanceInformation: {
                  Unstructured: "notes",
                },
                SupplementaryData: {
                  PaymentType: "CryptoOut",
                  CreditorAccountHolderFirstName: receiverFirstName,
                  CreditorAccountHolderLastName: receiverLastName,
                  CreditorGateway: receiverExchangeName,
                },
              },
            },
            Risk: {
              PaymentContextCode: "PartyToParty",
            },
          }
        );
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment client service is not registered");
    }
  };

  cryptoOutInitital = async (
    amount: number,
    currency: string,
    senderAccountNumber: string,
    receiverAccountAddress: string,
    receiverFirstName: string,
    receiverLastName: string,
    receiverExchangeName: string
  ) => {
    if (this._paymentClient) {
      console.log("amount ", amount);
      console.log("currency ", currency);
      console.log("senderAccountNumber ", senderAccountNumber);
      console.log("receiverAccountAddress ", receiverAccountAddress);
      console.log("receiverFirstName ", receiverFirstName);
      console.log("receiverLastName ", receiverLastName);
      console.log("receiverExchangeName ", receiverExchangeName);
      try {
        const response = await this._paymentClient.post("outward-payments", {
          Data: {
            Initiation: {
              LocalInstrument: "PDAX",
              InstructedAmount: {
                Amount: amount,
                Currency: currency,
              },
              DebtorAccount: {
                Identification: senderAccountNumber,
                SchemeName: "PH.PlatformDefined.Id",
              },
              DebtorAccountExt: {
                BankCode: "PDAX",
              },
              CreditorAccount: {
                SecondaryIdentification: receiverAccountAddress,
                SchemeName: "PH.BRSTN.AccountNumber",
              },
              CreditorAccountExt: {
                BranchCode: "872634829",
              },
              RemittanceInformation: {
                Unstructured: "notes",
              },
              SupplementaryData: {
                PaymentType: "CryptoOut",
                CreditorAccountHolderFirstName: receiverFirstName,
                CreditorAccountHolderLastName: receiverLastName,
                CreditorGateway: receiverExchangeName,
              },
            },
          },
          Risk: {
            PaymentContextCode: "PartyToParty",
          },
        });
        return response.data;
      } catch (error) {
        return "error: " + error;
      }
    } else {
      throw new Error("Payment client service is not registered");
    }
  };

  cryptoOutConfirmation = async (id: string, otp: string) => {
    if (this._paymentClient) {
      try {
        const response = await this._paymentClient.patch(
          "outward-payments/" + id,
          {
            Data: {
              Initiation: {
                LocalInstrument: "PDAX",
                SupplementaryData: {
                  PaymentType: "CryptoOut",
                  CustomFields: [
                    {
                      Key: "OTP",
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
      throw new Error("Payment client service is not registered");
    }
  };

  getDailyExchangeRate = async (currencyType: string) => {
    if (this._exchangeRateClient) {
      const response = await this._exchangeRateClient.get(
        `currencies/exchange-rates`,
        {
          params: {
            dataSource: "DB",
            pageNum: 1,
            pageSize: 1,
            fromCurrency: currencyType,
            toCurrency: "PHP",
            purpose: "TRADE",
          },
        }
      );
      return response.data;
    } else {
      throw new Error("Limit Client is not registered");
    }
  };

  cryptoAddressValidation = async (
    currencyType: string,
    cryptoAddress: string
  ) => {
    if (this._countryInformationClient) {
      const response = await this._countryInformationClient.post(
        "/crypto-currencies/addresses/validation",
        {
          currency: currencyType,
          address: cryptoAddress,
        }
      );
      return response.data;
    } else {
      throw new Error(
        "Historical exchange rate client service is not registered"
      );
    }
  };

  getUserWallets = async () => {
    if (this._walletServiceClient) {
      try {
        const response = await this._walletServiceClient.get("/wallets");
        console.log("response ---> ", response);
        return response.data;
      } catch (err) {
        console.log("response ---> err", err);
      }
    } else {
      throw new Error("Wallet Service Client is not registered");
    }
  };

  createVirtualCardApplication = async (body: VirtualCardApplicationBody) => {
    if (this._accountOriginationClient) {
      try {
        const response = await this._accountOriginationClient.post(
          "/applications",
          body
        );
        return response.data;
      } catch (err) {
        return err;
      }
    } else {
      throw new Error("Wallet Service Client is not registered");
    }
  };

  getCardLimit = async (walletId: string) => {
    if (this._limitClient) {
      console.log("Wallet Id : ", walletId);
      try {
        const response = await this._limitClient.get("/limits", {
          params: {
            serviceProvider: "Finexus",
            walletId,
            transactionType: "CARD_TRANSACTION",
          },
        });
        return response.data;
      } catch (err) {
        console.log("getCardLimit ---> err", err);
      }
    }
  };
  updateCardLimit = async (body: UdpateLimitType) => {
    if (this._limitClient) {
      try {
        const response = await this._limitClient.get("/limit-settings", body);
        return response.data;
      } catch (err) {
        console.log("getCardLimit ---> err", err);
      }
    }
  };
}
