import React, { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { CloseEyesIcon } from "../../../../../assets/close-eyes.icon";
import { CopyIcon } from "../../../../../assets/copy.icon";
import { EyesIcon } from "../../../../../assets/eyes.icon";
import { LockIcon } from "../../../../../assets/lock-icon";
import VisaIcon from "../common/visa-icon";
import Clipboard from "@react-native-clipboard/clipboard";

export interface VirtualCardProps {
  cardHolderName: string;
  showEyeIcon?: boolean;
  showCardType?: boolean;
  cardBottomText?: string;
  isCardLock?: boolean;
}

const VirtualCard: React.FC<VirtualCardProps> = (props) => {
  const {
    cardHolderName,
    showEyeIcon,
    showCardType,
    cardBottomText,
    isCardLock,
  } = props;
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cardNumber] = useState("1234567895639044");
  const { colors } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    mainView: {
      marginVertical: 32,
    },
    container: {
      borderRadius: 17,
      overflow: "hidden",
      height: (Dimensions.get("screen").height * 25) / 100,
      borderWidth: 1,
    },
    marginH: { marginHorizontal: 4 },
    marginLeft: { marginLeft: "30%" },
    upperContainer: {
      padding: 17,
      height: "70%",
    },
    cardDetailContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    cardNameText: {
      color: colors.primaryButtonLabelColor,
    },
    cardNumberText: {
      fontSize: 20,
      color: colors.btnColor,
    },
    cardNumberContainer: {
      bottom: 20,
      marginLeft: 16,
      position: "absolute",
      flexDirection: "row",
    },
    lowerContainer: {
      backgroundColor: colors.btnColor,
      paddingHorizontal: 16,
      justifyContent: "space-between",
      height: "30%",
      flexDirection: "row",
      alignItems: "center",
    },
    cardHeaderContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardDetail: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10,
    },
    cardDetailText: {
      height: 7,
      width: 7,
      backgroundColor: colors.btnColor,
      borderRadius: 50,
      marginHorizontal: 2,
    },
    visaCardText: {
      color: colors.btnColor,
    },
    eyeIconContainer: {
      height: 16,
      width: 16,
    },
    cardLock: {
      opacity: 1,
    },
    cardUnlock: {
      opacity: 0.3,
    },
    cardLockBorderColor: {
      borderColor: colors.black + "30",
    },
    cardUnlockBorderColor: {
      borderColor: colors.black,
    },
  });

  return (
    <View style={styles.mainView} pointerEvents={isCardLock ? "none" : "auto"}>
      <View
        style={[
          [
            styles.container,
            isCardLock
              ? styles.cardLockBorderColor
              : styles.cardUnlockBorderColor,
          ],
        ]}
      >
        <View
          style={[
            styles.upperContainer,
            isCardLock ? styles.cardUnlock : styles.cardLock,
          ]}
        >
          <View style={styles.cardHeaderContainer}>
            <VisaIcon />
            <View style={styles.cardDetailContainer}>
              <View style={styles.cardDetail}>
                <Text style={styles.visaCardText}>CVV</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.visaCardText}>•••</Text>
                </View>
              </View>
              <View style={styles.cardDetail}>
                <Text style={styles.visaCardText}>Expires</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.visaCardText}>••/••</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cardNumberContainer}>
            <View style={styles.marginH}>
              <Text style={styles.cardNumberText}>••••</Text>
            </View>
            <View style={styles.marginH}>
              <Text style={styles.cardNumberText}>••••</Text>
            </View>
            <View style={styles.marginH}>
              <Text style={styles.cardNumberText}>••••</Text>
            </View>
            <View style={styles.marginH}>
              <Text style={styles.cardNumberText}>
                {showCardNumber ? cardNumber.substring(12, 16) : "••••"}
              </Text>
            </View>
            {showCardNumber && (
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(cardNumber);
                }}
                style={styles.marginLeft}
              >
                <CopyIcon color={colors.black} width={20} height={20} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={[styles.lowerContainer, { opacity: isCardLock ? 0.3 : 1 }]}
        >
          <Text style={styles.cardNameText}>{cardHolderName}</Text>
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={() => setShowCardNumber(!showCardNumber)}
          >
            {showEyeIcon && showCardNumber ? (
              <CloseEyesIcon color="#ffffff" />
            ) : (
              <EyesIcon />
            )}
          </TouchableOpacity>
        </View>
        {isCardLock && (
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              top: "35%",
              height: 56,
              width: 56,
              borderRadius: 100,
              backgroundColor: "#9b9b9b",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LockIcon />
          </View>
        )}
      </View>
      {showCardType && (
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          {cardBottomText}
        </Text>
      )}
    </View>
  );
};

export default VirtualCard;
