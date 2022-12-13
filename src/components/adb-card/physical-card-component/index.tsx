import React, { useContext } from "react";
import {
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { WalletContext } from "../../../context/wallet-context";
import VirtualCard from "../card-info-component/components/virtual-card";
import CarouselCard from "../core/carousel-card";
import CircularImageView from "../core/circular-image-view";
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
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 12,
        }}
      >
        <CircularImageView
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label="Settings"
        />
        <CircularImageView
          onClick={onLimitPress}
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label="Limit"
        />
        <CircularImageView
          style={{
            containerStyle: {
              marginHorizontal: 12,
            },
          }}
          label="Lock"
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
              ? "Do you also want a physical card?"
              : "Activate virtual card!"
          }
          subTitle={
            isVirtualCardActive
              ? "Enjoy hassle free payments, ATM withdrawals and pay in-store merchants. "
              : "Activate your virtual card and start spending now!"
          }
          buttonLabel={isVirtualCardActive ? "Order Now" : "Activate Now"}
          onPress={onCarouselPress}
        />
      </View>
    </ScrollView>
  );
};

export default CardManagementComponent;
