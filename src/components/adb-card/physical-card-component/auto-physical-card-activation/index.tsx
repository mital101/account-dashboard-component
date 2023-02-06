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
    primaryButtonLabelStyle: {
      textAlign: "center",
      color: "#ffffff",
      fontWeight: "500",
      fontFamily: "Poppins-Bold",
    },
    mainContainer: {
      backgroundColor: colors.black,
      opacity: 0.1,
      flex: 1,
    },
    camaraView: {
      height: "100%",
      width: "100%",
      borderRadius: 10,
      backgroundColor: "red",
    },
  });

  return (
    <View style={styles.containerStyle}>
      <View style={{ height: "50%" }}>
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
      <View style={{ height: "50%" }}>
        <Text
          style={{
            fontFamily: fonts.semiBold,
            color: "black",
            fontSize: 22,
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          Activate card
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            color: "black",
            fontSize: 14,
            paddingHorizontal: 20,
          }}
        >
          Scan the QR code printed on the letter that you received together with
          your card.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            // onPress={() => setAlert(true)}
            onPress={onPressManuallyActivate}
            bgColor="#1b1b1b"
            style={{
              primaryContainerStyle: innerStyles.primaryButtonContainerStyle,
              primaryLabelStyle: innerStyles.primaryButtonLabelStyle,
            }}
            label="Manually Activate"
          />
        </View>
      </View>
      <AlertModal
        isVisible={showAlert}
        position="bottom"
        title={error ? "Unsuccessful!" : "Your card is successfully activated!"}
        subtitle={
          error
            ? i18n?.t("adb_card.lbl_req_failed") ??
              "Sorry, your request is unsuccessful in this instance. Please try again later."
            : i18n?.t("adb_card.lbl_card_activated") ??
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
              bgColor="#1b1b1b"
              variant="primary"
              label={error ? "Retry" : "Setup PIN"}
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
