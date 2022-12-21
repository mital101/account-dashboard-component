import React, { useContext, useMemo, useState } from "react";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import TouchID from "react-native-touch-id";
import { InfoIcon } from "../../../../assets/info.icon";
import { BRoundedTickIcon } from "../../../../assets/rounded-tick.icon";
import { WalletContext } from "../../../../context/wallet-context";
import { TransactionTypes } from "../../../../types";
import AlertModal from "../../../alert-model";
import VirtualCard from "../../card-info-component/components/virtual-card";
import Button from "../../core/button";
import EditableInput from "../../core/editable-textinput";
import { NumberFormatter } from "../../helpers";
import useMergeStyle, { CardLimitStyles } from "./styles";
export interface CardLimitProps {
  style?: CardLimitStyles;
  onPressGotoHome: () => void;
  onDeviceBiometFailed: (
    val: string,
    atrFixedValue: string,
    setState: any
  ) => void;
  onDeviceBiometSuccess: (
    val: string,
    atrFixedValue: string,
    setState: any
  ) => void;
  showAlert: boolean;
  setAlert: (val: boolean) => void;
  error: boolean;
  setError: (val: boolean) => void;
}

const CardLimitComponent: React.FC<CardLimitProps> = (props) => {
  const {
    style,
    onPressGotoHome,
    onDeviceBiometFailed,
    onDeviceBiometSuccess,
    showAlert,
    setAlert,
    error,
    setError,
  } = props;
  const styles: CardLimitStyles = useMergeStyle(style);
  const { cardLimits, updateCardLimits, cardWallet, isLoadingCardLimit } =
    useContext(WalletContext);
  const { i18n } = useContext(ThemeContext);
  const isAlertVisible = useMemo(() => showAlert, [showAlert]);
  // const [showAlert, setAlert] = useState(false);
  // const [error, setError] = useState<boolean>(false);
  const [rtError, setRtError] = useState(false);
  const [cwError, setCwError] = useState(false);
  const [ctError, setCtError] = useState(false);
  const [isUpdatingCardLimits, setUpdatingLimits] = useState(false);
  const retailTransactionLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CARD_RETAIL &&
        res.frequence === "Daily"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const cashWithdrawalLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CARD_WITHDRAW &&
        res.frequence === "Daily"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const contactLessLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CONTACTLESS_WITHDRAW &&
        res.frequence === "PerTransaction"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const minRetailTransactionLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CARD_RETAIL &&
        res.frequence === "MinPerTransaction"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const minCashWithdrawalLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CARD_WITHDRAW &&
        res.frequence === "MinPerTransaction"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const minContactLessLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CONTACTLESS_WITHDRAW &&
        res.frequence === "MinPerTransaction"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const maxRetailTransactionLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CARD_RETAIL &&
        res.frequence === "MaxPerTransaction"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const maxCashWithdrawalLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CARD_WITHDRAW &&
        res.frequence === "MaxPerTransaction"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const maxContactLessLimit = useMemo(() => {
    const data = cardLimits?.find(
      (res) =>
        res.transactionType === TransactionTypes.CONTACTLESS_WITHDRAW &&
        res.frequence === "MaxPerTransaction"
    );
    return data ? data.limitValue : 0;
  }, [cardLimits]);
  const currencyCode = useMemo(
    () => (cardLimits ? cardLimits[0].limitUnit : ""),
    [cardLimits]
  );
  const [rtLimit, setRtLimit] = useState(retailTransactionLimit);
  const [cwLimit, setCWLimit] = useState(cashWithdrawalLimit);
  const [ctLimit, setCtLimit] = useState(contactLessLimit);
  React.useEffect(() => {
    setRtLimit(retailTransactionLimit);
    setCWLimit(cashWithdrawalLimit);
    setCtLimit(contactLessLimit);
  }, [retailTransactionLimit, cashWithdrawalLimit, contactLessLimit]);
  React.useEffect(() => {
    if (!updateCardLimits) {
    }
  }, [isUpdatingCardLimits]);

  const checkUserAuth = (val: string, atrFixedValue: string, setState: any) => {
    TouchID.authenticate("Authentication required to proceed")
      .then(() => {
        setUpdatingLimits(true);
        //     const body = {
        //       walletId: cardWallet?.walletId ?? '',
        //     limitSettings : [
        //         {
        //             serviceProvider : "Finexus",
        //             limitUnit: "MYR",
        //             frequence: "Daily",
        //             limitValue: Number(val),
        //             limitSettingFactors : [
        //                 {
        //           attributeName: "transactionType",
        //           attributeFixedValues: atrFixedValue
        //         }
        //             ]
        //         }
        //     ]
        // }
        //     updateCardLimits(body).then(() => {
        //       setUpdatingLimits(false);
        //       setError(false);
        //       setAlert(true);
        //       setState(val)
        //     })
        onDeviceBiometSuccess(val, atrFixedValue, setState);
      })
      .catch(() => {
        onDeviceBiometFailed(val, atrFixedValue, setState);
        // setError(true);
        // setAlert(true);
      });
  };
  return (
    <KeyboardAvoidingView
      style={styles.wrapperStyle}
      keyboardVerticalOffset={0}
    >
      <Text style={styles.titleStyle}>
        {i18n?.t("adb_card.lbl_card_limit") ?? "Card limit"}
      </Text>
      <Text style={styles.subTitleStyle}>
        {i18n?.t("adb_card.lbl_set_preffered_limits") ??
          "Please set your preferred limits for each transaction type."}
      </Text>
      <View style={styles.cardContainerStyle}>
        <VirtualCard showEyeIcon cardHolderName="{Nur Aeolanda Binti Mahmud}" />
      </View>
      <View>
        <EditableInput
          onSave={async (e) => {
            if (
              Number(e) > Number(maxRetailTransactionLimit) ||
              Number(e) < Number(minRetailTransactionLimit)
            ) {
              setRtError(true);
            } else {
              checkUserAuth(e, TransactionTypes.CARD_RETAIL, setRtLimit);
              setRtError(false);
            }
          }}
          // value={retailTransactionLimit.toFixed(2).toString()}
          value={NumberFormatter(`${rtLimit}`, 2)}
          keyboardType="number-pad"
          label="Retail transaction daily limit"
          valuePrefix={currencyCode}
          error={rtError}
          errorLabel={`Your Retail Transaction limit is between ${minRetailTransactionLimit} - ${maxRetailTransactionLimit} `}
        />
        <EditableInput
          onSave={async (e) => {
            if (
              Number(e) > Number(maxCashWithdrawalLimit) ||
              Number(e) < Number(minCashWithdrawalLimit)
            ) {
              setCwError(true);
            } else {
              checkUserAuth(e, TransactionTypes.CARD_WITHDRAW, setCWLimit);
              setCwError(false);
            }
          }}
          // value={cashWithdrawalLimit.toFixed(2).toString()}
          value={NumberFormatter(`${cwLimit}`, 2)}
          keyboardType="number-pad"
          label="Cash withdrawal daily limit"
          valuePrefix={currencyCode}
          errorLabel={`Your Cash withdrawal limit is between ${minCashWithdrawalLimit} - ${maxCashWithdrawalLimit} `}
          error={cwError}
        />
        <EditableInput
          onSave={async (e) => {
            if (
              Number(e) > Number(maxContactLessLimit) ||
              Number(e) < Number(minContactLessLimit)
            ) {
              setCtError(true);
            } else {
              checkUserAuth(
                e,
                TransactionTypes.CONTACTLESS_WITHDRAW,
                setCtLimit
              );
              setCtError(false);
            }
          }}
          // value={contactLessLimit.toFixed(2).toString()}
          value={NumberFormatter(`${ctLimit}`, 2)}
          keyboardType="number-pad"
          label="Contactless transaction limit"
          valuePrefix={currencyCode}
          errorLabel={`Your Contactless transaction limit is between ${minContactLessLimit} - ${maxContactLessLimit} `}
          error={ctError}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label={i18n?.t("adb_card.btn_go_home") ?? "Go to Home"}
          onPress={() => {
            onPressGotoHome();
          }}
        />
      </View>
      <AlertModal
        isVisible={isAlertVisible}
        position="bottom"
        title={
          error
            ? i18n?.t("adb_card.lbl_unsuccessful") ?? "Unsuccessful!"
            : i18n?.t("adb_card.lbl_success") ?? "Success!"
        }
        subtitle={
          error
            ? i18n?.t("adb_card.lbl_error_req") ??
              "Error when performing request. Please try again later."
            : i18n?.t("adb_card.lbl_card_limits_updated") ??
              "Your card limits have been updated."
        }
        icon={
          <View style={{ height: 55, width: 55 }}>
            {error ? (
              <InfoIcon color="#00000030" />
            ) : (
              <BRoundedTickIcon color="#00000030" />
            )}
          </View>
        }
        onCancel={() => {}}
        onConfirmed={() => {}}
        style={{
          containerStyle: {
            borderRadius: 24,
          },
        }}
        children={
          <View style={{ paddingHorizontal: 24, width: "100%" }}>
            {error && (
              <View style={{ marginBottom: 10 }}>
                <Button
                  labelColor="#1b1b1b"
                  background="#ffffff"
                  label={i18n?.t("adb_card.btn_done") ?? "Done"}
                  onPress={() => setAlert(false)}
                />
              </View>
            )}
            <Button
              label={
                error
                  ? i18n?.t("adb_card.btn_retry") ?? "Retry"
                  : i18n?.t("adb_card.btn_done") ?? "Done"
              }
              onPress={() => setAlert(false)}
            />
          </View>
        }
      />
      {/* <LoadingModal shouldShow={ isLoadingCardLimit} /> */}
    </KeyboardAvoidingView>
  );
};

export default CardLimitComponent;
