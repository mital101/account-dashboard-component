import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CloseEyesIcon } from "../../../../../assets/close-eyes.icon";
import { EyesIcon } from "../../../../../assets/eyes.icon";
import VisaIcon from "../common/visa-icon";

export interface VirtualCardProps {
  cardHolderName: string;
  showEyeIcon?: boolean;
  showCardType?: boolean;
  cardBottomText?: string;
}

const VirtualCard: React.FC<VirtualCardProps> = (props) => {
  const { cardHolderName, showEyeIcon, showCardType, cardBottomText } = props;
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cardNumber] = useState("1234567895639044");
  return (
    <View style={{ marginVertical: 32 }}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
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
            <View style={{ marginHorizontal: 4 }}>
              <Text style={styles.cardNumberText}>••••</Text>
            </View>
            <View style={{ marginHorizontal: 4 }}>
              <Text style={styles.cardNumberText}>••••</Text>
            </View>
            <View style={{ marginHorizontal: 4 }}>
              <Text style={styles.cardNumberText}>••••</Text>
            </View>
            <View style={{ marginHorizontal: 4 }}>
              <Text style={styles.cardNumberText}>
                {showCardNumber ? cardNumber.substring(12, 16) : "••••"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.lowerContainer}>
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

const styles = StyleSheet.create({
  container: {
    borderRadius: 17,
    overflow: "hidden",
    height: (Dimensions.get("screen").height * 25) / 100,
    borderWidth: 1,
  },
  upperContainer: {
    backgroundColor: "#dddddd",
    padding: 17,
    height: "70%",
  },
  cardDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardNameText: {
    color: "#ffffff",
  },
  cardNumberText: {
    fontSize: 20,
    color: "#1b1b1b",
  },
  cardNumberContainer: {
    bottom: 20,
    marginLeft: 16,
    position: "absolute",
    flexDirection: "row",
  },
  lowerContainer: {
    backgroundColor: "#1b1b1b",
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
    backgroundColor: "#1b1b1b",
    borderRadius: 50,
    marginHorizontal: 2,
  },
  visaCardText: {
    color: "#1b1b1b",
  },
  eyeIconContainer: {
    height: 16,
    width: 16,
  },
});
