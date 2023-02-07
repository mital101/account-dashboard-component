import React, { useContext, useEffect, useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { fonts } from "react-native-auth-component";
import { Button, ThemeContext } from "react-native-theme-component";
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
  scanQRCodes,
} from "react-native-vision-camera";
import { InfoIcon } from "../../../../assets/info.icon";
import { BRoundedTickIcon } from "../../../../assets/rounded-tick.icon";
import AlertModal from "../../../alert-model";
import useMergeStyles, { AutoPhysicalCardStyles } from "./styles";
export interface IAutoCardActivation {
  style?: AutoPhysicalCardStyles;
  onPressManuallyActivate: () => void;
  onPressSetpin: () => void;
}

const AutoCardActivation: React.FC<IAutoCardActivation> = (
  props: IAutoCardActivation
) => {
  const { style, onPressManuallyActivate, onPressSetpin } = props;
  const styles: AutoPhysicalCardStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);
  const [showAlert, setAlert] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const devices = useCameraDevices();

  const device = devices.back;
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    requestCamera();
  }, []);

  const requestCamera = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
  };

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    const qrCodes = scanQRCodes(frame);
  }, []);

  const innerStyles = StyleSheet.create({
    primaryButtonContainerStyle: {
      height: 56,
      borderRadius: 100,
      justifyContent: "center",
      width: "100%",
    },
    iconView: { height: 55, width: 55 },
    primaryButtonLabelStyle: {
      textAlign: "center",
      color: colors.primaryButtonLabelColor,
      fontWeight: "500",
      fontFamily: "Poppins-Bold",
    },
    mainContainer: {
      color: colors.secondaryButtonLabelColor,
      opacity: 0.1,
      flex: 1,
    },
    camaraView: {
      height: "100%",
      width: "100%",
      borderRadius: 10,
      backgroundColor: colors.red,
    },
    title: {
      fontFamily: fonts.semiBold,
      color: colors.secondaryButtonLabelColor,
      fontSize: 22,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    subText: {
      fontFamily: fonts.regular,
      color: colors.secondaryButtonLabelColor,
      fontSize: 14,
      paddingHorizontal: 20,
    },
    height: { height: "50%" },
  });

  return (
    <View style={styles.containerStyle}>
      <View style={innerStyles.height}>
        <View style={innerStyles.mainContainer}>
          {device == undefined ? null : (
            <Camera
              style={innerStyles.camaraView}
              device={device}
              isActive={true}
              enableHighQualityPhotos
              photo
              frameProcessor={frameProcessor}
              ref={cameraRef}
            />
          )}
        </View>
      </View>
      <View style={innerStyles.height}>
        <Text style={innerStyles.title}>
          {i18n?.t("adb_card.lbl_activate_card_title")}
        </Text>
        <Text style={innerStyles.subText}>
          {i18n?.t("adb_card.lbl_activecard_subtitle")}
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            onPress={onPressManuallyActivate}
            bgColor={colors.btnColor}
            style={{
              primaryContainerStyle: innerStyles.primaryButtonContainerStyle,
              primaryLabelStyle: innerStyles.primaryButtonLabelStyle,
            }}
            label={i18n?.t("adb_card.lbl_manual_card_title")}
          />
        </View>
      </View>
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
            : i18n?.t("adb_card.lbl_card_activated") ??
              i18n?.t("adb_card.lbl_card_activated_subtitle")
        }
        icon={
          <View style={innerStyles.iconView}>
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
                  setAlert(false);
                  if (!error) {
                    // onPressTrackCard();
                  }
                }}
              />
            )}
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
                  : i18n?.t("adb_card.setup_pin")
              }
              onPress={() => {
                setAlert(false);
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

export default AutoCardActivation;
