import React, { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { CloseEyesIcon } from "../../../../../assets/close-eyes.icon";
import {CopyIcon} from '../../../../../assets/copy.icon'
import { EyesIcon } from "../../../../../assets/eyes.icon";
import { LockIcon } from "../../../../../assets/lock-icon";
import VisaIcon from "../common/visa-icon";
import Clipboard from '@react-native-clipboard/clipboard';


export interface VirtualCardProps {
  cardHolderName: string;
  showEyeIcon?: boolean;
  showCardType?: boolean;
  cardBottomText?: string;
  isCardLock?:boolean;
}

const VirtualCard: React.FC<VirtualCardProps> = (props) => {
  const { cardHolderName, showEyeIcon, showCardType, cardBottomText, isCardLock } = props;
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cardNumber] = useState("1234567895639044");
  const { colors } = useContext(ThemeContext);

  return (
    <View style={{ marginVertical: 32 }} pointerEvents={isCardLock ? "none" : "auto"}>
      <View style={[[styles.container,  {borderColor: isCardLock ? "#00000030" : "#000"}]]}>
        <View style={[styles.upperContainer,  {opacity: isCardLock ? 0.3 : 1}]}>
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
           {showCardNumber && <TouchableOpacity 
            onPress={() => {
              Clipboard.setString(cardNumber);
            }}
            style={styles.marginLeft}>
              <CopyIcon color={colors.black} width={20} height={20}/>
            </TouchableOpacity>}
          
          </View>
         
        </View>
        <View style={[styles.lowerContainer,  {opacity: isCardLock ? 0.3 : 1}]}>
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
        {isCardLock && <View style={{position: "absolute", alignSelf:'center', top: '35%', height: 56, width:56, borderRadius: 100, backgroundColor: "#9b9b9b", justifyContent:'center', alignItems:'center'}}>
             <LockIcon/> 
        </View>}
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
  marginLeft :{marginLeft :'30%'},
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
