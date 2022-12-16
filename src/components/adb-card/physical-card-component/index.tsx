import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { WalletContext } from "../../../context/wallet-context";
import VirtualCard from "../card-info-component/components/virtual-card";
import CarouselCard from "../core/carousel-card";
import CircularImageView from "../core/circular-image-view";
import LimitBottomSheet from "./limits-sheet";
import useMergeStyles from "./styles";

export interface CardManagementProps {
  style?: CardManagementStyles;
  onCarouselPress: () => void;
  onLimitPress: () => void;
}
export interface CardManagementStyles {
  navContainerStyle?: StyleProp<ViewStyle>;
  navContainerTextStyle?: StyleProp<TextStyle>;
  navContainerSubTitleStyle?: StyleProp<TextStyle>;
}

const CardManagementComponent: React.FC<CardManagementProps> = (props) => {
  const { style, onCarouselPress, onLimitPress } = props;
  const styles: CardManagementStyles = useMergeStyles(style);
  const { isVirtualCardActive } = useContext(WalletContext);
  const { i18n } = useContext(ThemeContext);
  const [showSheet,setShowSheet] = useState(false)
  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <View style={styles.navContainerStyle}>
        <Text style={styles.navContainerTextStyle}>Card</Text>
        <VirtualCard showEyeIcon cardHolderName="{Nur Aeolanda Binti Mahmud}" />
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
          label={i18n?.t("adb_card.lbl_setting") ?? "Settings"}
        />
        <CircularImageView
          onClick={() => setShowSheet(true)}
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label={i18n?.t("adb_card.lbl_limit") ?? "Limit"}
        />
        <CircularImageView
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label={i18n?.t("adb_card.lbl_report_replace") ?? "Report & Replace"}
        />
        <CircularImageView
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label={i18n?.t("adb_card.lbl_lock") ?? "Lock"}
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
              ? i18n?.t("adb_card.lbl_want_physical_card") ??
                "Do you also want a physical card?"
              : i18n?.t("adb_card.lbl_activate_card", {other: "!"}) ??
                "Activate virtual card!"
          }
          subTitle={
            isVirtualCardActive
              ? i18n?.t("adb_card.lbl_enjoy_hassle_free") ??
                "Enjoy hassle free payments, ATM withdrawals and pay in-store merchants. "
              : i18n?.t(
                  "adb_card.lbl_activate_card",
                  {other: "and start spending now!"}
                ) ?? "Activate your virtual card and start spending now!"
          }
          buttonLabel={
            isVirtualCardActive
              ? i18n?.t("adb_card.btn_order_now") ?? "Order Now"
              : i18n?.t("adb_card.btn_active_now") ?? "Activate Now"
          }
          onPress={onCarouselPress}
        />
      </View>
      <LimitBottomSheet isVisible={showSheet} onClose={() => setShowSheet(false)} onCardLimitPress={() => {
        setShowSheet(false)
        onLimitPress()
      }} onOnlineLimitPress={() => {}} />
    </ScrollView>
  );
};

export default CardManagementComponent;
