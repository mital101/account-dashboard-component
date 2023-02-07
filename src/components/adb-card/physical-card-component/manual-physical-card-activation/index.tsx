import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Keyboard,
  KeyboardEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { Button, ThemeContext } from "react-native-theme-component";
import AlertMessage from "../../core/alert-message";
import { checkCreditCard, formatCC, formatExpDate } from "./helper";
import useMergeStyle, { ManualCardActivationStyles } from "./styles";
import { InfoIcon } from "../../../../assets/info.icon";
import { BRoundedTickIcon } from "../../../../assets/rounded-tick.icon";
import AlertModal from "../../../alert-model";
export interface ManualCardActivationProps {
  style?: ManualCardActivationStyles;
  error?: boolean;
  setError: (e: boolean) => void;
  showAlert?: boolean;
  setShowAlert: (e: boolean) => void;
  onPressGotoHome: (e: boolean) => void;
  onPressSetpin: (e: boolean) => void;
}

const ManualCardActivation: React.FC<ManualCardActivationProps> = (props) => {
  const { style, onPressGotoHome, onPressSetpin } = props;
  const styles: ManualCardActivationStyles = useMergeStyle(style);
  const { i18n, fonts, colors } = useContext(ThemeContext);
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [bFlag, setBFlag] = useState(false); // Checks if user clicked the button
  const [showAlertMsg, setAlertMsg] = useState<boolean>(false);
  const [isExpDateInvalid, setExpDateInvalid] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isCardInvalid, setCardInvalid] = useState<{
    success: boolean;
    message: null | string;
    type: null | string;
  }>({
    success: true,
    message: null,
    type: null,
  });
  const [isCvvInvalid, setCvvInvalid] = useState<boolean>(false);
  const keyboardHeight = useRef(new Animated.Value(21)).current;
  const [oneTimeCode, setoneTimeCode] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  // Checks if `Continue` button should be disabled or not
  const isSubmitDisabled =
    !isCardInvalid.success || isExpDateInvalid || isCvvInvalid;
  const checkDetails = () => {
    if (oneTimeCode.length == 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      keyboardWillShow
    );
    const keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      keyboardWillHide
    );

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);

  const keyboardWillShow = (event: KeyboardEvent) => {
    Animated.timing(keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height + 15,
      useNativeDriver: false,
    }).start();
  };
  const keyboardWillHide = (event: KeyboardEvent) => {
    Animated.timing(keyboardHeight, {
      duration: event.duration,
      toValue: 21,
      useNativeDriver: false,
    }).start();
  };

  const innerStyles = StyleSheet.create({
    primaryButtonContainerStyle: {
      height: 56,
      borderRadius: 100,
      justifyContent: "center",
    },
    bottom: { bottom: keyboardHeight },
    primaryButtonLabelStyle: {
      textAlign: "center",
      color: colors.primaryButtonLabelStyle,
      fontFamily: fonts.bold,
    },
    animatedButtonStyle: {
      position: "absolute",
      width: "100%",
      alignSelf: "center",
    },
    rowInput: {
      marginTop: 20,
    },
    balanceLabel: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: colors.inputColor,
    },
    input: {
      fontSize: 16,
      color: "#1D1C1D",
      borderBottomWidth: 1,
      borderBottomColor: colors.inputColor,
      marginTop: 5,
      fontFamily: fonts.regular,
      paddingVertical: 10,
    },
    height: { height: 55, width: 55 },
  });

  const onInputValue = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key !== "Backspace") {
      setoneTimeCode(parseInt(`${oneTimeCode || ""}${e.nativeEvent.key}`));
    } else {
      setoneTimeCode(parseInt(`${oneTimeCode || ""}`.slice(0, -1)));
    }
  };

  return (
    <View style={styles.wrapperStyle}>
      <AlertMessage
        isVisible={showAlertMsg}
        title={i18n?.t("adb_card.lbl_alert_title")}
        onClose={() => setAlertMsg(false)}
      />
      <Text style={styles.titleStyle}>
        {i18n?.t("adb_card.lbl_physical_onetime")}
      </Text>
      <Text style={styles.subTitleStyle}>
        {i18n?.t("adb_card.lbl_physical_onetime_subtitle")}
      </Text>
      <View style={innerStyles.rowInput}>
        <Text style={innerStyles.balanceLabel}>
          {i18n?.t("adb_card.lbl_physical_code_label")}
        </Text>
        <TextInput
          value={oneTimeCode}
          onKeyPress={onInputValue}
          style={innerStyles.input}
          placeholder="Enter one-time code"
          keyboardType="numeric"
        />
      </View>
      <Animated.View
        style={[innerStyles.animatedButtonStyle, innerStyles.bottom]}
      >
        <Button
          label={i18n?.t("adb_card.btn_submit")}
          bgColor={colors.disable}
          disabled={isSubmitDisabled}
          disableColor={colors.disableTransparent}
          style={{
            primaryContainerStyle: innerStyles.primaryButtonContainerStyle,
            primaryLabelStyle: innerStyles.primaryButtonLabelStyle,
          }}
          onPress={() => {
            if (checkDetails()) {
              setError(false);
              setShowAlert(true);
            } else {
              setError(true);
              setShowAlert(true);
            }
          }}
        />
      </Animated.View>

      <AlertModal
        isVisible={showAlert}
        position="bottom"
        title={
          error
            ? i18n?.t("adb_card.lbl_unsuccessful")
            : i18n?.t("adb_card.lbl_activate_sucess")
        }
        subtitle={
          error
            ? i18n?.t("adb_card.lbl_req_failed") ??
              i18n?.t("adb_card.lbl_req_failed")
            : i18n?.t("adb_card.lbl_card_activated_subtitle") ??
              i18n?.t("adb_card.lbl_card_activated_subtitle")
        }
        icon={
          <View style={innerStyles.height}>
            {error ? (
              <InfoIcon color={colors.icon} />
            ) : (
              <BRoundedTickIcon color={colors.icon} />
            )}
          </View>
        }
        style={{
          containerStyle: {
            borderRadius: 24,
          },
        }}
        onCancel={() => {}}
        onConfirmed={() => {}}
        children={
          <View style={{ paddingHorizontal: 24, width: "100%" }}>
            {error && (
              <Button
                style={{
                  primaryContainerStyle: {
                    borderRadius: 100,
                    height: 56,
                    marginBottom: 10,
                    borderWidth: 2,
                    borderColor: colors.btnColor,
                  },
                  primaryLabelStyle: {
                    color: colors.btnColor,
                  },
                }}
                bgColor={colors.primaryButtonLabelColor}
                variant="primary"
                label={i18n?.t("adb_card.go_to_home_btn")}
                onPress={() => {
                  setShowAlert(false);
                  onPressGotoHome();
                }}
              />
            )}
            <Button
              style={{
                primaryContainerStyle: {
                  borderRadius: 100,
                  height: 56,
                  marginTop: 20,
                },
              }}
              bgColor={colors.btnColor}
              variant="primary"
              label={
                error
                  ? i18n?.t("adb_card.btn_retry")
                  : i18n?.t("adb_card.setup_pin")
              }
              onPress={() => {
                setShowAlert(false);
                if (!error) {
                  onPressSetpin();
                }
              }}
            />
          </View>
        }
      />
    </View>
  );
};

export default ManualCardActivation;
