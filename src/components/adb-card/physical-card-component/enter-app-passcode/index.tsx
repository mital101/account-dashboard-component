import React, { useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { BottomSheet, ThemeContext } from "react-native-theme-component";
import TouchID from "react-native-touch-id";
import CloseIcon from "../../../../assets/close-icon";
import DangerIcon from "../../../../assets/danger-icon";
import { InfoIcon } from "../../../../assets/info.icon";
import RightArrowIcon from "../../../../assets/right-arrow-icon";
import { BRoundedTickIcon } from "../../../../assets/rounded-tick.icon";
import { BTickIcon } from "../../../../assets/tick.icon";
import { BackIconArrow } from "../../../../assets/backIconArrow.icon";
import { WalletContext } from "../../../../context/wallet-context";
import AlertModal from "../../../alert-model";
import Button from "../../core/button";
import { AppPasscodeCompStyle } from "../../types";
import { validatePIN } from "../../app-passcode-component/helpers";
import useMergeStyles from "../../app-passcode-component/styles";
import { BackIcon } from "account-origination-component/src/assets/icons";

export interface AppPassCodeProps {
  style?: AppPasscodeCompStyle;
  onClosePassCode: () => void;
  onPressGotoCard: () => void;
  orderPhysicalCard: () => void;
  onSuccess: (e: string) => void;
  onPressNext?: (e: string) => void;
  isForPhysicalCard?: boolean;
  isForVirtualCard?: boolean;
  extraData?: any[];
  title?: string;
  subTitle?: string;
  error?: boolean;
  setError: (e: boolean) => void;
  showAlert?: boolean;
  setShowAlert: (e: boolean) => void;
  isVisible?: boolean;
  secondaryErrorLabel?: string;
  showSecondaryErrorLabel?: boolean;
}

const RenderButtons = ({
  onPress,
  isForPhysicalCard,
}: {
  onPress: (num: string) => void;
  isForPhysicalCard?: boolean;
}) => {
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
              onPress(
                i === 9
                  ? isForPhysicalCard
                    ? "X"
                    : ""
                  : i === 10
                  ? "0"
                  : i === 11
                  ? isForPhysicalCard
                    ? "Go"
                    : "X"
                  : i + 1
              )
            }
            // disabled={isForPhysicalCard && i === 9}
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
            {i === 9 ? (
              <View>{isForPhysicalCard && <CloseIcon />}</View>
            ) : i === 11 ? (
              <View>
                {isForPhysicalCard ? (
                  <RightArrowIcon size={24} />
                ) : (
                  <CloseIcon />
                )}
              </View>
            ) : (
              <Text style={{ fontWeight: "600", color: "#1b1b1b" }}>
                {i === 10 ? 0 : i + 1}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const RenderPass = ({
  val,
  extraData,
  errorLabel,
  showError,
}: {
  val: string;
  extraData?: any[];
  showError?: boolean;
  errorLabel?: string;
}) => {
  const data: any[] = [...Array(6).keys()];
  return (
    <View>
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
      <View style={{ marginTop: 15 }}>
        {extraData?.map((ed) => {
          return (
            <View
              style={{
                marginVertical: 4,
                paddingHorizontal: 24,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <BTickIcon
                height={15}
                width={15}
                color={validatePIN(val) ? "green" : "#1b1b1b"}
              />
              <Text style={{ color: "#000", marginLeft: 10 }}>{ed.title}</Text>
            </View>
          );
        })}
        {showError && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <DangerIcon />
            <Text style={{ color: "#000", marginLeft: 10 }}>
              Your PINs do not match.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const EnterAppPassCodeComponent: React.FC<AppPassCodeProps> = (
  props: AppPassCodeProps
) => {
  const {
    style,
    onPressGotoCard,
    orderPhysicalCard,
    onClosePassCode,
    onSuccess,
    isForVirtualCard,
    isForPhysicalCard,
    extraData,
    title,
    subTitle,
    error,
    setError,
    showAlert,
    setShowAlert,
    showSecondaryErrorLabel,
    secondaryErrorLabel,
    onPressNext,
    isVisible,
  } = props;
  const styles: AppPasscodeCompStyle = useMergeStyles(style);
  const [userVal, setUserVal] = React.useState("");
  const { createVCApplication, isSubmittingVCApplication } =
    useContext(WalletContext);
  const { i18n } = useContext(ThemeContext);

  React.useEffect(() => {
    setUserVal("");
    if (isVisible) {
      setTimeout(() => {
        console.log('execute');
        
        TouchID.authenticate("Authentication required to proceed", {
          passcodeFallback: false,
        })
          .then(() => {
            if (isForVirtualCard) {
              createVCApplication().then((e) => {
                setShowAlert(true);
                if (!e) {
                  setError(true);
                }
              });
            } else {
              if (onPressNext === undefined) {
                onSuccess(userVal);
              }
            }
            setUserVal("");
            onSuccess("faceunlock");
          })
          .catch((err) => {
            console.log("err",err);
            
          });
      }, 1000);
    }
  }, [isVisible]);

  // React.useEffect(() => {
  //   if (userVal.length >= 6) {
  //     if (isForVirtualCard) {
  //       createVCApplication().then((e) => {
  //         setShowAlert(true);
  //         if (!e) {
  //           setError(true);
  //         }
  //       });
  //     } else {
  //       if (onPressNext === undefined) {
  //         onSuccess(userVal);
  //       }
  //     }
  //   }
  // }, [userVal]);

  return (
    <BottomSheet
      style={{
        containerStyle: styles.containerStyle,
      }}
      isVisible={isVisible}
    >
      <TouchableOpacity
        style={{ marginTop: 30, paddingLeft: 20 }}
        onPress={() => {
          onClosePassCode();
        }}
      >
        <BackIconArrow />
      </TouchableOpacity>
      <View
        style={{ paddingBottom: 40 }}
      >
        <View style={styles.appCodeContainerStyle}>
          <Text style={styles.titleStyle}>
            {title ?? i18n?.t("adb_card.lbl_enter_app_pass")}
          </Text>
          <Text style={styles.subTitleStyle}>
            {subTitle ?? i18n?.t("adb_card.lbl_enter_digit_pass")}
          </Text>
        </View>
        <TextInput
          style={{
            borderWidth: 1,
            position: "absolute",
            width: "100%",
            opacity: 0,
            marginTop: 50,
          }}
          editable={false}
        />
        <View
          style={{
            marginTop: 80,
            height: "80%",
            justifyContent: "space-between",
          }}
        >
          <RenderPass
            val={userVal}
            extraData={extraData ?? []}
            showError={showSecondaryErrorLabel}
            errorLabel={secondaryErrorLabel}
          />
          <RenderButtons
            isForPhysicalCard={isForPhysicalCard}
            onPress={(e) => {
              if (e === "X") {
                setUserVal("");
              } else if (e === "Go") {
                if (onPressNext) {
                  onPressNext(userVal);
                }
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
          title={
            error
              ? "Unsuccessful!"
              : isForPhysicalCard
              ? "Card PIN successfully set!"
              : "Success!"
          }
          subtitle={
            error
              ? i18n?.t("adb_card.lbl_req_failed") ??
                "Sorry, your request is unsuccessful in this instance. Please try again later."
              : isForPhysicalCard
              ? "Your PIN has been set."
              : i18n?.t("adb_card.lbl_card_activated")
          }
          icon={
            <View style={{ height: 55, width: 55 }}>
              {error ? <InfoIcon color={"#00000030"} /> : <BRoundedTickIcon />}
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
              {!isForPhysicalCard && (
                <View style={{ marginBottom: 10 }}>
                  <Button
                    labelColor="#1b1b1b"
                    background="#ffffff"
                    label={
                      error
                        ? i18n?.t("adb_card.btn_go_home")
                        : i18n?.t("adb_card.btn_go_card")
                    }
                    onPress={onPressGotoCard}
                  />
                </View>
              )}
              <Button
                label={
                  error
                    ? i18n?.t("adb_card.btn_retry")
                    : isForPhysicalCard
                    ? i18n?.t("adb_card.btn_go_card")
                    : i18n?.t("adb_card.btn_order_physical_card")
                }
                onPress={() => {
                  if (!error) {
                    if (isForPhysicalCard) {
                      onPressGotoCard();
                      setShowAlert(false);
                    } else {
                      orderPhysicalCard();
                    }
                  } else {
                    setShowAlert(false);
                    setUserVal("");
                  }
                }}
              />
            </View>
          }
        />
      </View>
    </BottomSheet>
  );
};

export default EnterAppPassCodeComponent;
