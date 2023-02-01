import React, { useContext, useMemo, useState } from "react";
import {
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { WalletContext } from "../../../context/wallet-context";
import VirtualCard from "../card-info-component/components/virtual-card";
import CarouselCard from "../core/carousel-card";
import CircularImageView from "../core/circular-image-view";
import LockCardBottomSheet from "./lock-card-sheet";
import EnterAppPassCodeComponent from './enter-app-passcode'
import SettingsBottomSheet from "./settings-sheet";
import useMergeStyles from "./styles";

export interface CardManagementProps {
  style?: CardManagementStyles;
  onCarouselPress: () => void;
  onLimitPress: () => void;
  onChangeCardPin: () => void;
  onReportPress: () => void;
  onLockCard: () => void;
}
export interface CardManagementStyles {
  navContainerStyle?: StyleProp<ViewStyle>;
  navContainerTextStyle?: StyleProp<TextStyle>;
  navContainerSubTitleStyle?: StyleProp<TextStyle>;
}
const CardManagementComponent: React.FC<CardManagementProps> = (props) => {
  const {
    style,
    onCarouselPress,
    onLimitPress,
    onChangeCardPin,
    onReportPress,
    onLockCard
  } = props;
  const styles: CardManagementStyles = useMergeStyles(style);
  const {
    isVirtualCardActive,
    updateCardStatus,
    cardWalletStatus,
    cardWallet,
  } = useContext(WalletContext);
  const { i18n } = useContext(ThemeContext);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showLockSheet, setShowLockSheet] = useState<boolean>(false);
  const [cardLock, setCardLock] = useState<boolean>(false);
  const [passcodeVisible,setpasscodeVisible] = useState<boolean>(false);
  const isCardLocked = useMemo(
    () => cardWalletStatus !== "ACTIVE",
    [cardWalletStatus]
  );

  const [showAlert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [showErrorLabel, setShowErrorLabel] = useState(false);

  const confirmPIN = (value: string) => {
    if ('123456' === value || value === 'faceunlock') {
      setError(false);
      setShowErrorLabel(false);
      if(isCardLocked){
           const status = "ACTIVE";
              const walletId = cardWallet?.walletId ?? "";
              updateCardStatus(status, walletId);
      }else{

      
        setCardLock(true)
        
          const status = "LOCKED";
          const walletId = cardWallet?.walletId ?? "";
          const reason = "test";
          const reasonCode = "LOST";
          updateCardStatus(status, walletId, reason, reasonCode);
      }
          onLockCard() 
          setpasscodeVisible(false)
    } else {
      setShowErrorLabel(true);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <View style={styles.navContainerStyle}>
        <Text style={styles.navContainerTextStyle}>Card</Text>
        <VirtualCard
          showEyeIcon
          cardHolderName="{Nur Aeolanda Binti Mahmud}"
          isCardLock={isCardLocked}
        />
        <Text style={styles.navContainerSubTitleStyle}>
          {"{ADB} Savings-i"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-around",
          marginVertical: 12,
        }}
      >
        <CircularImageView
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          onClick={() => setShowSettings(true)}
          label={i18n?.t("adb_card.lbl_setting")}
        />
        <CircularImageView
          onClick={() => onLimitPress()}
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label={i18n?.t("adb_card.lbl_limit")}
        />
        <CircularImageView
          onClick={() => onReportPress()}
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label={i18n?.t("adb_card.lbl_report_replace")}
        />
        <CircularImageView
          onClick={() => {
            if (isCardLocked) {
              // const status = "ACTIVE";
              // const walletId = cardWallet?.walletId ?? "";
              // updateCardStatus(status, walletId);
              setpasscodeVisible(true)

            } else {
              setShowLockSheet(true);
            }
          }}
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label={
            isCardLocked
              ? i18n?.t("adb_card.lbl_unlock")
              : i18n?.t("adb_card.lbl_lock")
          }
        />
      </View>
      <View
        style={{
          marginTop: 12,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <CarouselCard
          title={
            isVirtualCardActive
              ? i18n?.t("adb_card.lbl_want_physical_card")
              : i18n?.t("adb_card.lbl_activate_card",{ other: "!" })
          }
          subTitle={
            isVirtualCardActive
              ? i18n?.t("adb_card.lbl_enjoy_hassle_free")
              : i18n?.t("adb_card.lbl_activate_card", {
                  other: "and start spending now!",
                })
          }
          buttonLabel={
            isVirtualCardActive
              ? i18n?.t("adb_card.btn_order_now")
              : i18n?.t("adb_card.btn_active_now")
          }
          onPress={onCarouselPress}
        />
      </View>
      <SettingsBottomSheet
        onClose={() => setShowSettings(false)}
        isVisible={showSettings}
        onChangeCardPin={() => {
          setShowSettings(false);
          onChangeCardPin();
        }}
      />
      <LockCardBottomSheet
        onLockCard={() => {
          setShowLockSheet(false);
          setTimeout(() => {
          setpasscodeVisible(true)
            
          }, 1000);
        }}
        title={i18n?.t("lock_card.btn_lock_card")}
        isVisible={showLockSheet}
        onClose={() =>{
           setShowLockSheet(false)
        }}
      />
     <EnterAppPassCodeComponent
        key={'Hello'}
        isForPhysicalCard={true}
        isVisible={passcodeVisible}
        title="Enter your app passcode"
        subTitle="Enter your 6-digit passcode to continue."
        onSuccess={confirmPIN}
        onPressNext={confirmPIN}
        error={error}
        showAlert={showAlert}
        onClosePassCode={() => setpasscodeVisible(!passcodeVisible)}
        setError={(e) => setError(e)}
        setShowAlert={(e) => setAlert(e)}
        // onPressGotoCard={() => navigation.navigate(Route.ADB_MAIN_TABBAR, { screen: 'Card' })}
        orderPhysicalCard={() => { } }
        showSecondaryErrorLabel={showErrorLabel}
        secondaryErrorLabel={'Your passcode do not match.'} onPressGotoCard={function (): void {
          throw new Error("Function not implemented.");
        } }    />
    </ScrollView>
  );
};

export default CardManagementComponent;
