import React, { useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import TouchID from "react-native-touch-id";
import { InfoIcon } from "../../../assets/info.icon";
import { BRoundedTickIcon } from "../../../assets/rounded-tick.icon";
import { WalletContext } from "../../../context/wallet-context";
import AlertModal from "../../alert-model";
import Button from "../core/button";
import { AppPasscodeCompStyle } from "../types";
import useMergeStyles from "./styles";
export interface AppPassCodeProps {
  style?: AppPasscodeCompStyle;
  onPressGotoCard: () => void;
  orderPhysicalCard: () => void;
  onSuccess: () => void;
  // error: boolean;
  // showAlert:boolean;
  // setShowAlert: (val:boolean) => void;
  // setError: (val:boolean) => void;
  isForVirtualCard:boolean
}

const RenderButtons = ({ onPress }: { onPress: (num: string) => void }) => {
  const data: any[] = [...Array(12).keys()];
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        marginVertical: 20,
      }}
    >
      {data.map((i) => {
        return (
          <TouchableOpacity
            onPress={() =>
              onPress(i === 9 ? "" : i === 10 ? "0" : i === 11 ? "X" : i + 1)
            }
            disabled={i === 9}
            style={{
              height: 64,
              width: 64,
              marginHorizontal: 16,
              backgroundColor: i === 9 || i === 11 ? "transparent" : "#dddddd",
              marginVertical: 8,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
            }}
          >
            <Text style={{ fontWeight: "600" }}>
              {i === 9 ? "" : i === 10 ? 0 : i === 11 ? "X" : i + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const RenderPass = ({ val }: { val: string }) => {
  const data: any[] = [...Array(6).keys()];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 60,
      }}
    >
      {data.map((i) => {
        return (
          <View
            style={{
              height: 16,
              width: 16,
              backgroundColor: i < val.length ? "#1b1b1b" : "transparent",
              borderRadius: 20,
              marginHorizontal: 12,
              borderWidth: 1,
            }}
          />
        );
      })}
    </View>
  );
};

const AppPassCodeComponent: React.FC<AppPassCodeProps> = (
  props: AppPassCodeProps
) => {
  const { style, onPressGotoCard, orderPhysicalCard, onSuccess, isForVirtualCard } = props;
  const styles: AppPasscodeCompStyle = useMergeStyles(style);
  const [userVal, setUserVal] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { createVCApplication, isSubmittingVCApplication } =
    useContext(WalletContext);
  const { i18n } = useContext(ThemeContext);
  React.useEffect(() => {
    TouchID.authenticate("Authentication required to proceed", {
      passcodeFallback: false,
    })
      .then(() => {
        if(isForVirtualCard){

          createVCApplication().then((e) => {
            setShowAlert(true);
            if (!e) {
              setError(true);
            }
          });
        }else{
          onSuccess()
        }
      })
      .catch(() => {});
  }, []);
  React.useEffect(() => {
    if (userVal.length >= 6) {
      if(isForVirtualCard){
        createVCApplication().then((e) => {
          setShowAlert(true);
          if (!e) {
            setError(true);
          }
        });
      }else{
        onSuccess()
      }
    }
  }, [userVal]);
  return (
    <View style={styles.containerStyle}>
      <View style={styles.titleContainerStyle}>
        <Text style={styles.titleStyle}>
          {i18n?.t("adb_card.lbl_enter_app_pass") ?? "Enter your app passcode"}
        </Text>
        <Text style={styles.subTitleStyle}>
          {i18n?.t("adb_card.lbl_enter_digit_pass") ??
            "Enter your 6-digit passcode to continue."}
        </Text>
      </View>
      <TextInput
        style={{
          borderWidth: 1,
          position: "absolute",
          width: "100%",
          opacity: 0,
        }}
      />
      <View style={{ flex: 0.8, justifyContent: "space-between" }}>
        <RenderPass val={userVal} />
        <RenderButtons
          onPress={(e) => {
            if (e === "X") {
              setUserVal(userVal.substring(0, userVal.length - 1));
            } else {
              if (userVal.length < 6) {
                setUserVal(userVal + e);
              }
            }
          }}
        />
      </View>
      <AlertModal
        isVisible={showAlert}
        position="bottom"
        title={error ? "Unsuccessful!" : "Success!"}
        subtitle={
          error
            ? i18n?.t("adb_card.lbl_req_failed") ??
              "Sorry, your request is unsuccessful in this instance. Please try again later."
            : i18n?.t("adb_card.lbl_card_activated") ??
              "Your virtual card has been activated. Get your  physical card today!"
        }
        icon={
          <View style={{ height: 55, width: 55 }}>
            {error ? <InfoIcon /> : <BRoundedTickIcon />}
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
            <View style={{ marginBottom: 10 }}>
              <Button
                labelColor="#1b1b1b"
                background="#ffffff"
                label={
                  error
                    ? i18n?.t("adb_card.btn_go_home") ?? "Go to Home"
                    : i18n?.t("adb_card.btn_go_card") ?? "Go to Card Centre"
                }
                onPress={onPressGotoCard}
              />
            </View>
            <Button
              label={
                error
                  ? i18n?.t("adb_card.btn_retry") ?? "Retry"
                  : i18n?.t("adb_card.btn_order_physical_card") ??
                    "Order Physical Card"
              }
              onPress={() => {
                if (!error) {
                  orderPhysicalCard();
                } else {
                  setShowAlert(false);
                }
              }}
            />
          </View>
        }
      />
    </View>
  );
};

export default AppPassCodeComponent;
