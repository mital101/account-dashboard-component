import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
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
  const { style ,onPressGotoHome ,onPressSetpin} = props;
  const styles: ManualCardActivationStyles = useMergeStyle(style);
  const { i18n,fonts } = useContext(ThemeContext);
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [bFlag, setBFlag] = useState(false) // Checks if user clicked the button
  const [showAlertMsg, setAlertMsg] = useState<boolean>(false);
  const [isExpDateInvalid, setExpDateInvalid] = useState<boolean>(false);
  const [showAlert,setShowAlert] =useState<boolean>(false);
  const [isCardInvalid, setCardInvalid] = useState<{
    success: boolean;
    message: null | string;
    type: null | string;
  }>({
    success: true,
    message:  null,
    type:  null
  });
  const [isCvvInvalid, setCvvInvalid] = useState<boolean>(false);
  const keyboardHeight = useRef(new Animated.Value(21)).current;
  const [oneTimeCode,setoneTimeCode] = useState<string>('')
  const [error, setError] = useState<boolean>(false);
 
 
  // Checks if `Continue` button should be disabled or not
  const isSubmitDisabled =
    !isCardInvalid.success || isExpDateInvalid || isCvvInvalid;
    const checkDetails = () => {
      if(oneTimeCode.length == 0){
        return false
      }
      return true
    }

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
    primaryButtonLabelStyle: {
      textAlign: "center",
      color: "#ffffff",
      fontFamily : fonts.bold
    },
    animatedButtonStyle: {
      position: "absolute",
      width: "100%",
      alignSelf: "center",
    },
    rowInput: {
     marginTop :20
    },
    balanceLabel: {
      fontSize: 14,
      fontFamily: fonts.medium,
      color: '#858585',
    },
    input: {
      fontSize: 16,
      color: '#1D1C1D',
      borderBottomWidth :1,
      borderBottomColor : '#858585',
      marginTop :5,
      fontFamily: fonts.regular,
      paddingVertical :10
    },
  });

  const onInputValue = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key !== 'Backspace') {
      setoneTimeCode(parseInt(`${oneTimeCode || ''}${e.nativeEvent.key}`));
    } else {
      setoneTimeCode(parseInt(`${oneTimeCode || ''}`.slice(0, -1)));
    }
  };
  
  return (
    <View style={styles.wrapperStyle}>
      <AlertMessage
        isVisible={showAlertMsg}
        title={"Your card has already been activated."}
        onClose={() => setAlertMsg(false)}
      />
      <Text style={styles.titleStyle}>{i18n?.t("adb_card.lbl_physical_onetime")}</Text>
      <Text style={styles.subTitleStyle}>
       
      {i18n?.t("adb_card.lbl_physical_onetime_subtitle")} 
      </Text>
      <View style={innerStyles.rowInput}>
              <Text style={innerStyles.balanceLabel}>{i18n?.t("adb_card.lbl_physical_code_label")}</Text>
              <TextInput
                value={oneTimeCode}
                onKeyPress={onInputValue}
                style={innerStyles.input}
                placeholder="Enter one-time code"
                keyboardType="numeric"
              />
            </View>
      <Animated.View
        style={[innerStyles.animatedButtonStyle, { bottom: keyboardHeight }]}
      >
        <Button
          label={i18n?.t("adb_card.btn_submit")}
          bgColor="#1b1b1b"
          disabled={isSubmitDisabled}
          disableColor={"#1b1b1b20"}
          style={{
            primaryContainerStyle: innerStyles.primaryButtonContainerStyle,
            primaryLabelStyle: innerStyles.primaryButtonLabelStyle,
          }}
          onPress={() => {
              if(checkDetails()){
                setError(false)
                setShowAlert(true)
              }else{
                setError(true)
                setShowAlert(true)
              }
          }}
        />
      </Animated.View>

      <AlertModal
        isVisible={showAlert}
        position="bottom"
        title={error ? "Unsuccessful!" : "Your card is successfully activated!"}
        subtitle={
          error
            ? i18n?.t("adb_card.lbl_req_failed") ??
              "Sorry, your request is unsuccessful in this instance. Please try again later."
            : i18n?.t("adb_card.lbl_card_activated_subtitle") ??
              "Let’s setup your Card PIN."
        }
        icon={
          <View style={{ height: 55, width: 55 }}>
            {error ? (
              <InfoIcon color="#1b1b1b30" />
            ) : (
              <BRoundedTickIcon color="#1b1b1b30" />
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
                    borderColor: "#1b1b1b",
                  },
                  primaryLabelStyle: {
                    color: "#1b1b1b",
                  },
                }}
                bgColor="#ffffff"
                variant="primary"
                label={"Go to Home"}
                onPress={() => {
                  setShowAlert(false);
                  onPressGotoHome()
                }}
              />
            )}
            <Button
              style={{
                primaryContainerStyle: {
                  borderRadius: 100,
                  height: 56,
                  marginTop : 20
                },
              }}
              bgColor="#1b1b1b"
              variant="primary"
              label={error ? "Retry" : "Setup PIN"}
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

