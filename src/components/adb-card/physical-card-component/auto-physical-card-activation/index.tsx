import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { InfoIcon } from '../../../../assets/info.icon';
import { BRoundedTickIcon } from '../../../../assets/rounded-tick.icon';
import AlertModal from '../../../alert-model';
import useMergeStyles, { AutoPhysicalCardStyles } from './styles';
export interface IAutoCardActivation {
    style?: AutoPhysicalCardStyles;
    onPressManuallyActivate: () => void;
    onPressSetpin: () => void;
}

const AutoCardActivation:React.FC<IAutoCardActivation> = (props:IAutoCardActivation) => {
    const {style, onPressManuallyActivate, onPressSetpin} = props;
    const styles:AutoPhysicalCardStyles = useMergeStyles(style)
    const {i18n} = useContext(ThemeContext)
    const [showAlert, setAlert] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const devices = useCameraDevices()
    const device = devices.back;
    const cameraRef = useRef<Camera>(null)
    useEffect(() => {
      const requestCamera = async () => {
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log('Camera : ', newCameraPermission);
      }
      requestCamera()
    }, [])
  return (
    <View style={styles.containerStyle}>
        <ImageBackground source={require("../../../../assets/activate_card_img.png")} style={styles.bgImageStyle}>
            <View style={{height: 175, width: '78%', marginBottom: 10, borderRadius: 10, overflow:"hidden"}}>
              {!device ? null : <Camera
                style={{height: '100%', width: '100%',borderRadius: 10, backgroundColor:'red'}}
                device={device}
                isActive={true}
                enableHighQualityPhotos
                photo
                ref={cameraRef}
              />}
            </View>
        </ImageBackground>
        <View style={styles.buttonContainer}>
            <Button
            // onPress={() => setAlert(true)}
            onPress={onPressManuallyActivate}
                bgColor='#1b1b1b'
                style={{
                    primaryContainerStyle:innerStyles.primaryButtonContainerStyle,
                    primaryLabelStyle: innerStyles.primaryButtonLabelStyle
                }}
                label='Manually Activate'
            />
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
            {error ? <InfoIcon color='#1b1b1b30' /> : <BRoundedTickIcon color='#1b1b1b30'/>}
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
            {error && <Button
              style={{
                primaryContainerStyle: {
                  borderRadius: 100,
                  height: 56,
                  marginBottom: 10,
                  borderWidth: 2,
                  borderColor: "#1b1b1b"
                },
                primaryLabelStyle: {
                  color: "#1b1b1b"
                }
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
            />}
            <Button
              style={{
                primaryContainerStyle: {
                  borderRadius: 100,
                  height: 56,
                },
              }}
              bgColor="#1b1b1b"
              variant="primary"
              label={
                error
                  ? "Retry"
                  : "Setup PIN"
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
  )
}

export default AutoCardActivation;

const innerStyles = StyleSheet.create({
    primaryButtonContainerStyle: {
        height: 56,
        borderRadius: 100,
        justifyContent: "center",
        width: "100%"
      },
      primaryButtonLabelStyle: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "500",
      },
})