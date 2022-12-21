import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  KeyboardEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, ThemeContext } from "react-native-theme-component";
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
  const keyboardHeight = useRef(new Animated.Value(21)).current;
  // Checks if expiry date is valid
  const isExpDateInvalid = useMemo(() => {
    if (date.length === 5) {
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
  // Checks if card number is valid
  const isCardInvalid = useMemo(
    () => checkCreditCard(cardNumber),
    [cardNumber]
  );
  const isSubmitDisabled =
    !isCardInvalid.success || isExpDateInvalid || cvv.length > 3;

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
  });

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
      <Text style={styles.titleStyle}>Enter your card details</Text>
      <Text style={styles.subTitleStyle}>
        Verify and complete your card information.
      </Text>
      <View style={styles.inputContainerStyle}>
        <CardInput
          showCardImg
          label="Card number"
          value={cardNumber}
          onChangeText={(e) => {
            const formattedNum = formatCC(e);
            setCardNumber(formattedNum);
          }}
          error={!isCardInvalid.success}
          errorLabel="Invalid card number."
        />
        <View style={styles.sensitiveDataContainer}>
          <View style={{ width: "48%" }}>
            <CardInput
              label="Expiry date"
              value={date}
              onChangeText={(e) => formatExpDate(e).then((x) => setDate(x))}
              error={isExpDateInvalid}
              errorLabel="Invalid expiry date."
            />
          </View>
          <View style={{ width: "48%" }}>
            <CardInput
              label="CVV"
              value={cvv}
              onChangeText={(e) => setCVV(e)}
              error={cvv.length > 3}
              errorLabel="Invalid CVV."
            />
          </View>
        </View>
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
