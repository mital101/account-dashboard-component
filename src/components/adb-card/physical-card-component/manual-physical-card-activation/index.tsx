import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  KeyboardEvent,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Button, ThemeContext } from "react-native-theme-component";
import AlertMessage from "../../core/alert-message";
import CardInput from "./cardInput";
import { checkCreditCard, formatCC, formatExpDate } from "./helper";
import useMergeStyle, { ManualCardActivationStyles } from "./styles";
export interface ManualCardActivationProps {
  style?: ManualCardActivationStyles;
}

const ManualCardActivation: React.FC<ManualCardActivationProps> = (props) => {
  const { style } = props;
  const styles: ManualCardActivationStyles = useMergeStyle(style);
  const { i18n } = useContext(ThemeContext);
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [bFlag, setBFlag] = useState(false) // Checks if user clicked the button
  const [showAlertMsg, setAlertMsg] = useState<boolean>(false);
  const [isExpDateInvalid, setExpDateInvalid] = useState<boolean>(false);
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
  // // Checks if expiry date is valid
  const checkExpDateInvalid = useCallback(() => {
    if(date.length > 0){

      const currentDate = new Date();
      const expDate = new Date();
      const expYear = "20" + date.substring(3, 5);
      const expMonth = date.substring(0, 2);
      expDate.setFullYear(Number(expYear), Number(expMonth), 1);
      if (expDate < currentDate) {
        return true;
    }
  }
  return false;
  }, [date]);
  // // Checks if card number is valid
  const checkCardInvalid = useCallback(
    () =>  {
      if(cardNumber.length > 0){
       return checkCreditCard(cardNumber)
      }else return {
        success: true,
        message:  null,
        type:  null
      }
    },
    [cardNumber]
  );
  // // Checks if cvv is valid
  const checkCvvInvalid = useCallback(() =>  {
    if(cvv.length > 0){

     return cvv.length !== 3
    }
    return false
  } , [cvv]);

  // Checks if `Continue` button should be disabled or not
  const isSubmitDisabled =
    !isCardInvalid.success || isExpDateInvalid || isCvvInvalid;
    const checkDetails = () => {
        const cnValid = checkCardInvalid();
        const cvValid = checkCvvInvalid();
        const edValid = checkExpDateInvalid();
        setCardInvalid(cnValid);
        setCvvInvalid(cvValid);
        setExpDateInvalid(edValid);
        if(cnValid.success && !cvValid && !edValid){
          return true;
        }
    }
  useEffect(() => {
    // if(bFlag){
      checkDetails()
    // }
  }, [cvv, date, cardNumber])

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
  return (
    <View style={styles.wrapperStyle}>
      <AlertMessage
        isVisible={showAlertMsg}
        title={"Your card has already been activated."}
        onClose={() => setAlertMsg(false)}
      />
      <Text style={styles.titleStyle}>Enter your unique
one-time code</Text>
      <Text style={styles.subTitleStyle}>
        Enter the one-time code printed on the letter that you received together with your card
      </Text>
      <View style={styles.inputContainerStyle}>
         <CardInput
          // showCardImg
          label="One-time code"
          value={cardNumber}
          // onChangeText={(e) => {
          //   const formattedNum = formatCC(e);
          //   setCardNumber(formattedNum);
          //   setBFlag(true)
          // }}
          onChangeText={(e) => {
            setBFlag(true)
            setCardNumber(e)
          }}
          // error={!isCardInvalid.success}
          // errorLabel="Invalid card number."
        />
        {/*<View style={styles.sensitiveDataContainer}>
          <View style={{ width: "48%" }}>
            <CardInput
              label="Expiry date"
              value={date}
              onChangeText={(e) => formatExpDate(e).then((x) => {setBFlag(true); setDate(x)})}
              error={isExpDateInvalid}
              errorLabel="Invalid expiry date."
            />
          </View>
          <View style={{ width: "48%" }}>
            <CardInput
              label="CVV"
              value={cvv}
              onChangeText={(e) => {
                setBFlag(true)
                setCVV(e)
              }}
              error={isCvvInvalid}
              errorLabel="Invalid CVV."
            />
          </View>
        </View>*/}
      </View>
      <Animated.View
        style={[innerStyles.animatedButtonStyle, { bottom: keyboardHeight }]}
      >
        <Button
          label={i18n?.t("adb_card.btn_submit")}
          bgColor="#1b1b1b"
          // disabled={isSubmitDisabled}
          // disableColor={"#1b1b1b20"}
          style={{
            primaryContainerStyle: innerStyles.primaryButtonContainerStyle,
            primaryLabelStyle: innerStyles.primaryButtonLabelStyle,
          }}
          onPress={() => {
            // const success=checkDetails();
            //   if(success){
            //     setAlertMsg(true)
            //   }
          }}
        />
      </Animated.View>
    </View>
  );
};

export default ManualCardActivation;

const innerStyles = StyleSheet.create({
  primaryButtonContainerStyle: {
    height: 56,
    borderRadius: 100,
    justifyContent: "center",
  },
  primaryButtonLabelStyle: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "500",
  },
  animatedButtonStyle: {
    position: "absolute",
    width: "100%",
    alignSelf: "center",
  },
});
