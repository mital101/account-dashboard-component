import { CryptoTransferOutDetailComponentProps } from "./types";
import React, { useState, useRef } from "react";
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


  const handleOnSubmit = async (values: SendCryptoData) => {
    Keyboard.dismiss();
    const { username, password } = values;
    console.log("values ", values);
  };

  const renderForm = (formProps: FormikProps<SendCryptoData>) => (
    <View style={styles.formWrapper}>
      <Text
        style={styles.label}
      >{`Recipient’s ${defaultData.shortName} address`}</Text>
      <InputField
        name="recipientAddress"
        returnKeyType="done"
        placeholder={`Enter recipient’s ${defaultData.shortName} address`}
        autoCapitalize="none"
        suffixIcon={
          <TouchableOpacity style={styles.qrIconWrapper}>
            <QrIcon />
          </TouchableOpacity>
        }
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
      <InputField
        name="network"
        returnKeyType="done"
        placeholder={"Bitcoin"}
        autoCapitalize="none"
        // formatError={Root?.props?.formatError}
        // style={InputForm?.style?.passwordInputFieldStyle}
        // suffixIcon={InputForm?.component?.suffixIcon ?? <></>}
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
            <Text style={styles.amountTextLabel}>{"BTC"}</Text>
            <Text style={styles.amountTextMessage}>{"≈ ₱ 44,986.03"}</Text>
          </View>
        </View>
        <View style={styles.balanceContentWrapper}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>{"Balance:"}</Text>
            <Text style={styles.balanceValue}>{" 0.00038167 BTC"}</Text>
          </View>
          <TouchableOpacity style={styles.sendLinkWrapper}>
            <Text style={styles.linkText}>{"Send all"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.noteView}>
        <Text style={styles.noteLabel}>
          NOTE: For transactions amounting to P50,000 above, you will need to
          enter the recipient’s details on the next screen for regulatory
          compliance purposes.
        </Text>
      </View>

      <View style={styles.dailyLimit}>
        <View style={styles.rowBetween}>
          <Text style={styles.dailyLimitLabel}>Daily Limit (₱ 100,000.00)</Text>
          <TouchableOpacity style={styles.row} onPress={goToAccountLimit}>
            <Text style={styles.aboutLimitLabel}>About Limit</Text>
            <ArrowRightIcon width={15} height={15} color={"#F8981D"} />
          </TouchableOpacity>
        </View>
        <ProcessBar processPercent={50} />
        <View style={styles.remainingWrapper}>
          <Text style={styles.remainLabel}>₱ 100,000.00 remaining</Text>
        </View>
      </View>

      {/*<Button
        isLoading={isSigning}
        style={rootStyles.loginButtonStyle}
        label={i18n?.t('login_component.btn_login') ?? 'LOGIN'}
        onPress={formProps.handleSubmit}
      />*/}
    </View>
  );

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
            onGoBack();
          }}
        >
          <ArrowBack />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/*<Text style={styles.pageTitle}>{`Send ${defaultData.shortName}`}</Text>*/}

        <Text style={styles.pageTitle}>{"Recipient’s Details"}</Text>
        <Text style={styles.pageHeaderMessage}>
          {"Please enter recipient's details below. "}
        </Text>

        {/*<Formik
          innerRef={formikRef}
          initialValues={SendCryptoData.init(
            '',
            defaultData?.fullName,
            '',
          )}
          validationSchema={SendCryptoSchema}
          onSubmit={handleOnSubmit}
        >
          {renderForm}
        </Formik>*/}
        <Formik
          innerRef={formikRef}
          initialValues={RecipientData.init("", "", "")}
          validationSchema={RecipientSchema}
          onSubmit={handleOnSubmit}
        >
          {renderRecipientForm}
        </Formik>
      </ScrollView>
      <View style={styles.actionWrapper}>
        <Button
          label={selectedTabIndex === 0 ? "Transfer-out PHP" : "Select"}
          onPress={() => {
            // formikRef?.current?.submitForm();
            onTransfer()
          }}
          // disabled={!isValidToSubmit}
          disableColor={"#EAEAEB"}
        />
      </View>
    </SafeAreaView>
  );
};

export default CryptoTransferOutDetailComponent;
