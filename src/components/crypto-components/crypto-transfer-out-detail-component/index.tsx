import { CryptoTransferOutDetailComponentProps } from "./types";
import React, { useContext,useState, useRef,useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Keyboard
} from "react-native";
import { CryptoItem } from "./types";
import useMergeStyles from "./styles";
import {
  RadioButtonItem,
  RadioButtonGroup,
  Button,
  ProcessBar,
  useCurrencyFormat,
  InputField
} from "react-native-theme-component";

//
// import {
//   Button,
//   ErrorModal,
//   InputField,
//   InputPhoneNumber,
//   ThemeContext
// } from 'react-native-theme-component';

import { Formik, FormikProps } from "formik";

import { ArrowBack, QrIcon, ArrowRightIcon } from "../../../assets/images";
import {
  SendCryptoData,
  SendCryptoSchema,
  RecipientData,
  RecipientSchema
} from "./model";

const randomCryptoImgUrl =
  "https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_960_720.png";
import { WalletService } from '../../../services/wallet-service';
import { WalletContext } from '../../../context/wallet-context';
import { AuthContext } from 'react-native-auth-component';

const walletService = WalletService.instance();

const CryptoTransferOutDetailComponent = ({
  style,
  onSelectCrypto,
  onTransferOutPHP,
  goToAccountLimit,
  onGoBack,
  isError = true,
  defaultData,
  onTransfer
}: CryptoTransferOutDetailComponentProps) => {
  // const { onSelectCrypto, isError = true, onTransferOutPHP, goToAccountLimit ,onGoBack} = props || {};
  const formikRef: any = useRef(null);
  const styles = useMergeStyles(style);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [transferValue, setTransferValue] = useState<number>(0);
  const [selectedCrypto, setSelectedCrypto] = React.useState<string>();
  const isValidToSubmit =
    selectedTabIndex === 0 ? transferValue > 0 : !!selectedCrypto;
  const [currencyRateData, setCurrencyRateData] = useState<any>();
  const [cryptoLimitData, setCryptoLimitData] = useState<any>();
  const [isForm1Valid, setIsForm1Valid] = useState<boolean>(false);
  const [form1Data, setForm1Data] = useState<any>();

  const { wallets } = useContext(WalletContext);
  const { profile } = useContext(AuthContext);

  const handleOnSubmit = async (values: SendCryptoData) => {
    Keyboard.dismiss();
    setIsForm1Valid(true);
    setForm1Data(values);
    //const { username, password } = values;
    // console.log("values ", values);
  };

  const handleCryptoOutOnSubmit = async (values: SendCryptoData) => {
    Keyboard.dismiss();
    setIsForm1Valid(true);
    if (wallets) {
      const getCurrencyAccountNumber = wallets.find((item) => item.currencyCode === defaultData.currency)

      try {
        const isValidCrypto = await walletService.cryptoOutValidation(
          form1Data.amountToSend,
          defaultData.currency,
          getCurrencyAccountNumber.bankAccount.accountId,
          form1Data.recipientAddress ,
          values.firstName,
          values.lastName,
          values.receivingName
        );
        if (isValidCrypto) {
          onTransfer({
            sendFrom:profile.firstName+' '+profile.lastName,
            sendTo:form1Data.recipientAddress,
            receiverAccountNumber:getCurrencyAccountNumber.bankAccount.accountId,
            firstName:values.firstName,
            lastName:values.lastName,
            exchangeName:values.receivingName,
            transactionId:'',
            transactionfee:'0',
            totalAmount:form1Data.amountToSend,
            amountToSend:form1Data.amountToSend,
            network:form1Data.network,
            currency:defaultData.currency,
          })

        }
      } catch (error) {
        console.log('error ',error);

      }


      // if (result.Data) {
      //   setAmountCryptoIn(transferValue);
      //   setTransferValue(0);
      //   onTransferOutPHP && onTransferOutPHP();
      // }
    }


  };

  const getCurrencyData = async () => {
    try {
      const responeData = await walletService.getCurrenciesExchangeRate(
        1,
        10,
        'PHP',
        defaultData.currency,
        true,
        'DAY',
        1
      );
      if (responeData.data.length > 0) {
        setCurrencyRateData(responeData.data[0]);
      }
    } catch (error) {
      console.log('error ',error);

    }

  };

  const getCryptoLimitData = async () => {
    try {
      const responeData = await walletService.getCryptoLimit(
        'CryptoOut',
        'PDAX'
      );
      if (responeData.data.length > 0) {
        let filteredCryptoLimit =  responeData.data.find((limitItem) => limitItem.limitUnit === defaultData.currency)
        setCryptoLimitData(filteredCryptoLimit);
      }
    } catch (error) {
      console.log('error ',error);

    }

  };

  const handleOnTransferPHP = async () => {
    setIsLoadingValidation(true);
    if (unionWallet && cryptoWallet) {
      const result = await walletService.cryptoOutValidation(
        amount,
        currency ,
        senderAccountNumber ,
        receiverAccountNumber,
        receiverBankCode,
        receiverFirstName,
        receiverLastName,
        receiverExchangeName
      );

      // if (result.Data) {
      //   setAmountCryptoIn(transferValue);
      //   setTransferValue(0);
      //   onTransferOutPHP && onTransferOutPHP();
      // }
    }
    setIsLoadingValidation(false);
  }

  useEffect(() => {
      getCurrencyData();
      getCryptoLimitData()
  }, []);

  const validateAddress = async () => {

    try {
      const result = await walletService.cryptoAddressValidation(
        defaultData.currency ,
        formikRef?.current?.values?.recipientAddress
      );

      if (result.networks && result.networks.length > 0) {
        formikRef?.current.setFieldValue("network", result.networks[0])
      }

    } catch (error) {
      console.log('error',error);
    }



  }

  const renderForm = (formProps: FormikProps<SendCryptoData>) => {

    return (
    <View style={styles.formWrapper}>
      <Text
        style={styles.label}
      >{`Recipient’s ${defaultData.currency} address`}</Text>
      <InputField
        name="recipientAddress"
        returnKeyType="done"
        placeholder={`Enter recipient’s ${defaultData.currency} address`}
        autoCapitalize="none"
        suffixIcon={
          <TouchableOpacity style={styles.qrIconWrapper}>
            <QrIcon />
          </TouchableOpacity>
        }
        onEndEditing={()=>{

          validateAddress();
        }}
        // formatError={Root?.props?.formatError}
        style={{
          contentContainerStyle: {
            borderWidth: 0,
            borderRadius: 4,
            borderBottomWidth: 0,
            backgroundColor: "#fff"
          },
          inputContainerStyle: {
            height: 42
          },
          textInputStyle: {
            fontSize: 15,
            color: "#000000"
          }
        }}
      />

      <Text style={styles.label}>{"Network"}</Text>
      {currencyRateData && <InputField
        name="network"
        returnKeyType="done"
        placeholder={"Bitcoin"}
        autoCapitalize="none"
        disable={true}
        // formatError={Root?.props?.formatError}
        // style={InputForm?.style?.passwordInputFieldStyle}
        // suffixIcon={InputForm?.component?.suffixIcon ?? <></>}
        // value={currencyRateData.fromCurrency.name}
        style={{
          contentContainerStyle: {
            borderWidth: 0,
            borderRadius: 5,
            borderBottomWidth: 0,
            backgroundColor: "#fff"
          },
          inputContainerStyle: {
            height: 42
          },
          textInputStyle: {
            fontSize: 15,
            color: "#000000"
          }
        }}
      />}

      <Text style={styles.label}>{"Enter amount to send"}</Text>
      <View style={styles.amountWrapper}>
        <View style={styles.amountContent}>
          <InputField
            name="amountToSend"
            returnKeyType="done"
            placeholder={"0"}
            autoCapitalize="none"
            // formatError={Root?.props?.formatError}
            // style={InputForm?.style?.passwordInputFieldStyle}
            // suffixIcon={InputForm?.component?.suffixIcon ?? <></>}
            style={{
              contentContainerStyle: {
                borderWidth: 0,
                borderRadius: 5,
                borderBottomWidth: 0,
                backgroundColor: "#fff",
                width: 250
              },
              inputContainerStyle: {
                height: 42
              },
              textInputStyle: {
                fontSize: 15,
                color: "#000000"
              },
              errorTextStyle: {
                width: 250
              }
            }}
          />
          <View style={styles.amountTextWrapper}>
            <Text style={styles.amountTextLabel}>{defaultData.currency}</Text>
            {currencyRateData && <Text style={styles.amountTextMessage}>{`≈ ₱${currencyRateData.exchangeRate * formProps.values.amountToSend }`}</Text>}
          </View>
        </View>
        <View style={styles.balanceContentWrapper}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>{"Balance:"}</Text>
            <Text style={styles.balanceValue}>{`${defaultData.availableBalance} ${defaultData.currency}`}</Text>
          </View>
          <TouchableOpacity onPress={()=>{
            formProps.setFieldValue('amountToSend',defaultData.availableBalance.toString())
          }}  style={styles.sendLinkWrapper}>
            <Text style={styles.linkText}>{"Send all"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.noteView}>
        <Text style={styles.noteLabel}>
          NOTE: 22For transactions amounting to P50,000 above, you will need to
          enter the recipient’s details on the next screen for regulatory
          compliance purposes.
        </Text>
      </View>

      <View style={styles.dailyLimit}>
        <View style={styles.rowBetween}>
          {cryptoLimitData && <Text style={styles.dailyLimitLabel}>{`Daily Limit (₱ ${cryptoLimitData.limitValue})`}</Text>}
          <TouchableOpacity style={styles.row} onPress={goToAccountLimit}>
            <Text style={styles.aboutLimitLabel}>About Limit</Text>
            <ArrowRightIcon width={15} height={15} color={"#F8981D"} />
          </TouchableOpacity>
        </View>
        {cryptoLimitData && <ProcessBar processPercent={(cryptoLimitData.remainingLimitValue/cryptoLimitData.limitValue)*100} />}
        {cryptoLimitData && <View style={styles.remainingWrapper}>
          <Text style={styles.remainLabel}>{`₱ ${cryptoLimitData.remainingLimitValue} remaining`}</Text>
        </View>}
      </View>

      {/*<Button
        isLoading={isSigning}
        style={rootStyles.loginButtonStyle}
        label={i18n?.t('login_component.btn_login') ?? 'LOGIN'}
        onPress={formProps.handleSubmit}
      />*/}
    </View>
  )};

  const renderRecipientForm = (formProps: FormikProps<RecipientData>) => (
    <View style={styles.formWrapper}>
      <Text style={styles.label}>{`First Name of Recipient`}</Text>
      <InputField
        name="firstName"
        returnKeyType="done"
        placeholder={`Enter first name of recipient`}
        autoCapitalize="none"
        style={{
          contentContainerStyle: {
            borderWidth: 0,
            borderRadius: 4,
            borderBottomWidth: 0,
            backgroundColor: "#fff"
          },
          inputContainerStyle: {
            height: 42
          },
          textInputStyle: {
            fontSize: 15,
            color: "#000000"
          }
        }}
      />

      <Text style={styles.label}>{"Last Name of Recipient"}</Text>
      <InputField
        name="lastName"
        returnKeyType="done"
        placeholder={"Enter last name of recipient"}
        autoCapitalize="none"
        style={{
          contentContainerStyle: {
            borderWidth: 0,
            borderRadius: 5,
            borderBottomWidth: 0,
            backgroundColor: "#fff"
          },
          inputContainerStyle: {
            height: 42
          },
          textInputStyle: {
            fontSize: 15,
            color: "#000000"
          }
        }}
      />

      <Text style={styles.label}>{"Receiving Exchange Name"}</Text>
      <InputField
        name="receivingName"
        returnKeyType="done"
        placeholder={"Enter receiving exchange name"}
        autoCapitalize="none"
        style={{
          contentContainerStyle: {
            borderWidth: 0,
            borderRadius: 5,
            borderBottomWidth: 0,
            backgroundColor: "#fff"
          },
          inputContainerStyle: {
            height: 42
          },
          textInputStyle: {
            fontSize: 15,
            color: "#000000"
          }
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (isForm1Valid) {
              setIsForm1Valid(false)
            }else{
              onGoBack();
            }
          }}
        >
          <ArrowBack />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {!isForm1Valid && <Text style={styles.pageTitle}>{`Send ${defaultData.currency}`}</Text>}

        {isForm1Valid && <>
            <Text style={styles.pageTitle}>{"Recipient’s Details"}</Text>
            <Text style={styles.pageHeaderMessage}>
              {"Please enter recipient's details below. "}
            </Text>
          </>}

        {!isForm1Valid && <Formik
          innerRef={formikRef}
          initialValues={SendCryptoData.init("", "", "")}
          validationSchema={SendCryptoSchema}
          onSubmit={handleOnSubmit}
        >
          {renderForm}
        </Formik>}
        {isForm1Valid &&  <Formik
          innerRef={formikRef}
          initialValues={RecipientData.init("", "", "")}
          validationSchema={RecipientSchema}
          onSubmit={handleCryptoOutOnSubmit}
        >
          {renderRecipientForm}
        </Formik>}
      </ScrollView>
      <View style={styles.actionWrapper}>
        <Button
          label={selectedTabIndex === 0 ? !isForm1Valid ?"Proceed" : 'Next' : "Select"}
          onPress={() => {
            formikRef?.current?.submitForm();
            // onTransfer()
          }}
          // disabled={!isValidToSubmit}
          disableColor={"#EAEAEB"}
        />
      </View>
    </SafeAreaView>
  );
};

export default CryptoTransferOutDetailComponent;
