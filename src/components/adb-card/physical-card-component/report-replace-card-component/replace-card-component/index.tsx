import { WalletContext } from "@banking-component/account-dashboard-component/src/context/wallet-context";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, ThemeContext } from "react-native-theme-component";
import { InfoIcon } from "../../../../../assets/info.icon";
import { BRoundedTickIcon } from "../../../../../assets/rounded-tick.icon";
import AlertModal from "../../../../alert-model";
import DeliverInfoSheet from "../../order-physical-card/deliver-info-sheet";
import { ReportIssueType } from "../report-card-component";
import useMergeStyles, { ReplaceCardComponentStyles } from "./styles";

export interface ReplaceCardComponentProps {
  style?: ReplaceCardComponentStyles;
  reason: string;
  loader: boolean;
  onPressSettings: () => void;
  onPressGotoHome: () => void;
  onPressContinue: () => void;
}
export const addressRadioGroup = [
  {
    id: "rd-1",
    title: "Mailing address",
    desc: "{Olive P5-20, Empire Residence, 40170, Damansara Perdana, Selangor}",
    selected: true,
  },
];

const ReplaceCardComponent = (props: ReplaceCardComponentProps) => {
  const {
    style,
    reason,
    onPressSettings,
    onPressGotoHome,
    onPressContinue,
    loader,
  } = props;
  const { wallets, getWalletDetail } = useContext(WalletContext);
  const { i18n, colors,fonts } = useContext(ThemeContext);
  const styles: ReplaceCardComponentStyles = useMergeStyles(style);
  const [radioData, setRadioData] = useState(addressRadioGroup);
  const [showSheet, setShowSheet] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [showAlertWallet, setshowAlertWallet] = useState(false);
  const [error, setError] = useState(false);

  const handlePress = (index: number) => {
    const arr = [...radioData];
    arr.forEach((_, i) => {
      arr[i].selected = false;
    });
    arr[index].selected = !arr[index].selected;
    setRadioData(arr);
  };

  const checkBalance = async () => {
    if (wallets.length == 0 && reason === ReportIssueType.LOST_OR_STOLEN) {
      setshowAlertWallet(true);
      setError(false);
    } else {
      if (error) {
        setError(true);
        setAlert(true);
      } else {
        let response = await onPressContinue();
        setAlert(response);
        setShowSheet(false);
      }
    }
  };

  const innerStyles = StyleSheet.create({
    mainView: { paddingHorizontal: 24, width: "100%" },
    marginBottom: { marginBottom: 10 },
    subTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    childrenView: { paddingHorizontal: 24, width: "100%" },
    deliverText: {
      fontFamily : fonts.semiBold,
      marginRight: 10,
      color: colors.btnColor,
    },
    radioButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginVertical: 8,
    },
    radioBtnOuterCircle: {
      height: 24,
      width: 24,
      borderWidth: 2,
      borderRadius: 24,
      padding: 2,
    },
    radioBtnInnerCircle: {
      height: "100%",
      width: "100%",
      backgroundColor: colors.btnColor,
      borderRadius: 24,
    },
    radioBtnTitle: {
      fontWeight: "600",
      marginBottom: 4,
      color: colors.btnColor,
    },
    copyContainer: {
      backgroundColor: "#dddddd",
      width: "100%",
      borderRadius: 3,
      padding: 16,
      marginVertical: 16,
    },
    copyContainerText: {
      fontSize: 12,
      color: colors.btnColor,
      fontFamily : fonts.regular
    },
  });

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Replace your card today!</Text>
      <Text style={styles.subTitleStyle}>
        Please confirm your delivery address. Your replacement card will have
        different card details for security reasons.
      </Text>
      <View style={styles.reasonContainer}>
        <Text style={styles.reasonTitle}>Reason for replacement</Text>
        <Text style={styles.reasonText}>{reason}</Text>
      </View>
      <View style={innerStyles.subTitleContainer}>
        <Text style={innerStyles.deliverText}>
          {i18n?.t("adb_card.lbl_deliver_to") ?? "Deliver to"}
        </Text>
      </View>
      {radioData.map((item, index) => (
           <Text style={{ color: colors.btnColor }}>{item.desc}</Text>
    
      ))}
      <View style={innerStyles.copyContainer}>
          <Text style={innerStyles.copyContainerText}>
              { i18n?.t("adb_card.lbl_get_physical_card_delivery")}
            
            </Text>
          </View>
      <DeliverInfoSheet
        isVisible={showSheet}
        onClose={() => setShowSheet(false)}
        onPressSettings={onPressSettings}
      />
      <View style={styles.buttonContainer}>
        <View style={innerStyles.copyContainer}>
          <Text style={innerStyles.copyContainerText}>
            {reason === ReportIssueType.DAMAGED
              ? "No fees will be deducted from your main account."
              : "RM 12.00 fees will be deducted from your main account."}
          </Text>
        </View>
        <Button
          style={{
            primaryContainerStyle: {
              borderRadius: 100,
              height: 56,
              marginBottom: 8,
              borderWidth: 2,
              borderColor: colors.btnColor,
            },
            primaryLabelStyle: {
              color: colors.btnColor,
            },
          }}
          bgColor={colors.backgroundTextColor}
          variant="primary"
          label={i18n?.t("adb_card.btn_go_home")}
          onPress={onPressGotoHome}
        />
        {loader ? (
          <ActivityIndicator size={"large"} color={colors.primaryColor} />
        ) : (
          <Button
            style={{
              primaryContainerStyle: {
                borderRadius: 100,
                height: 56,
              },
              primaryLabelStyle: {
                color: colors.backgroundTextColor,
              },
            }}
            bgColor={colors.btnColor}
            variant="primary"
            label={i18n?.t("adb_card.btn_continue")}
            onPress={() => {
              checkBalance();
            }}
          />
        )}
      </View>
      <AlertModal
        isVisible={showAlertWallet}
        position="bottom"
        title={i18n?.t("adb_card.lbl_insufficient_balance")}
        subtitle={i18n?.t("adb_card.lbl_insufficient_subTitle")}
        icon={
          <View style={{ height: 55, width: 55 }}>
            {error ? (
              <InfoIcon color={colors.icon} />
            ) : (
              <BRoundedTickIcon color={colors.icon} />
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
          <View style={innerStyles.mainView}>
            <View style={innerStyles.copyContainer}>
              <Text style={innerStyles.copyContainerText}>
                {`You can start transacting with your${
                  reason === ReportIssueType.LOST_OR_STOLEN
                    ? " replacement"
                    : ""
                } virtual card right now.`}
              </Text>
            </View>

            <View style={innerStyles.marginBottom}>
              <Button
                style={{
                  primaryContainerStyle: {
                    borderRadius: 100,
                    height: 56,
                    borderWidth: 2,
                    borderColor: colors.btnColor,
                  },
                  primaryLabelStyle: {
                    color: colors.btnColor,
                  },
                }}
                bgColor={colors.backgroundTextColor}
                variant="primary"
                label={i18n?.t("adb_card.btn_go_home")}
                onPress={() => {
                  setshowAlertWallet(false);

                  onPressGotoHome();
                }}
              />
            </View>
            <Button
              style={{
                primaryContainerStyle: {
                  borderRadius: 100,
                  height: 56,
                },
              }}
              bgColor={colors.btnColor}
              variant="primary"
              label={i18n?.t("common.lbl_continue")}
              onPress={() => {
                setshowAlertWallet(false);
              }}
            />
          </View>
        }
      />
      <AlertModal
        isVisible={showAlert}
        position="bottom"
        title={
          error
            ? i18n?.t("adb_card.lbl_unsuccessful")
            : i18n?.t("adb_card.lbl_success")
        }
        subtitle={
          error
            ? i18n?.t("adb_card.lbl_req_failed")
            : "Your replacement card has been ordered and will be delivered to your selected address."
        }
        icon={
          <View style={{ height: 55, width: 55 }}>
            {error ? (
              <InfoIcon color={colors.icon} />
            ) : (
              <BRoundedTickIcon color={colors.icon} />
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
          <View style={innerStyles.childrenView}>
            {!error && (
              <View style={innerStyles.copyContainer}>
                <Text style={innerStyles.copyContainerText}>
                  {`You can start transacting with your${
                    reason === ReportIssueType.LOST_OR_STOLEN
                      ? " replacement"
                      : ""
                  } virtual card right now.`}
                </Text>
              </View>
            )}
            <View style={{ marginBottom: 10 }}>
              <Button
                style={{
                  primaryContainerStyle: {
                    borderRadius: 100,
                    height: 56,
                    borderWidth: 2,
                    borderColor: colors.btnColor,
                  },
                  primaryLabelStyle: {
                    color: colors.btnColor,
                  },
                }}
                bgColor={colors.backgroundTextColor}
                variant="primary"
                label={i18n?.t("adb_card.btn_go_home")}
                onPress={() => {
                  setAlert(false);
                  if (!error) {
                    onPressGotoHome();
                  }
                }}
              />
            </View>
            <Button
              style={{
                primaryContainerStyle: {
                  borderRadius: 100,
                  height: 56,
                },
              }}
              bgColor={colors.btnColor}
              variant="primary"
              label={
                error
                  ? i18n?.t("adb_card.btn_retry")
                  : i18n?.t("adb_card.btn_track_card")
              }
              onPress={() => {
                setAlert(false);
                if (!error) {
                  onPressSettings();
                }
              }}
            />
          </View>
        }
      />
    </View>
  );
};

export default ReplaceCardComponent;
