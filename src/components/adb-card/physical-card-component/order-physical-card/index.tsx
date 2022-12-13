import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-theme-component";
import { InfoIcon } from "../../../../assets/info.icon";
import { BRoundedTickIcon } from "../../../../assets/rounded-tick.icon";
import AlertModal from "../../../alert-model";
import VirtualCard from "../../card-info-component/components/virtual-card";
import DeliverInfoSheet from "./deliver-info-sheet";
import useMergeStyles, { OrderPhysicalCardStyles } from "./styles";
export interface OrderPhysicalCardProps {
  style?: OrderPhysicalCardStyles;
  onPressGotoHome: () => void;
  onPressTrackCard: () => void;
}

export const addressRadioGroup = [
  {
    id: "rd-1",
    title: "Mailing address",
    desc: "{Olive P5-20, Empire Residence, 40170, Damansara Perdana, Selangor}",
    selected: false,
  },
  {
    id: "rd-2",
    title: "MyKad address",
    desc: "{B10, D’Aman Residence, Jalan Perdana 5, Taman Perdana 5, Puchong, Selangor}",
    selected: false,
  },
];

const OrderPhysicalCardComponent: React.FC<OrderPhysicalCardProps> = (
  props
) => {
  const { style, onPressGotoHome, onPressTrackCard } = props;
  const styles: OrderPhysicalCardStyles = useMergeStyles(style);
  const [radioData, setRadioData] = React.useState(addressRadioGroup);
  const [showAlert, setAlert] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showSheet, setShowSheet] = React.useState(false);
  const handlePress = (index: number) => {
    const arr = [...radioData];
    arr.forEach((_, i) => {
      arr[i].selected = false;
    });
    arr[index].selected = !arr[index].selected;
    setRadioData(arr);
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          backgroundColor: "#FFF",
          paddingHorizontal: 24,
          paddingBottom: 24,
        }}
        bounces={false}
      >
        <View>
          <Text style={styles.titleStyle}>Get your physical card today!</Text>
          <VirtualCard
            showEyeIcon
            cardHolderName="{Nur Aeolanda Binti Mahmud}"
            showCardType
            cardBottomText="{ADB} VISA Debit Card"
          />
          <View style={innerStyles.subTitleContainer}>
            <Text style={innerStyles.deliverText}>Deliver to</Text>
            <TouchableOpacity onPress={() => setShowSheet(true)}>
              <InfoIcon height={16} width={16} color={"#000000"} />
            </TouchableOpacity>
          </View>
          {radioData.map((item, index) => (
            <View style={innerStyles.radioButtonContainer}>
              <TouchableOpacity
                style={innerStyles.radioBtnOuterCircle}
                onPress={() => handlePress(index)}
              >
                {item.selected && (
                  <View style={innerStyles.radioBtnInnerCircle} />
                )}
              </TouchableOpacity>
              <View style={innerStyles.radioBtnTextContainer}>
                <Text style={innerStyles.radioBtnTitle}>{item.title}</Text>
                <Text>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
        <View>
          <View style={innerStyles.greyContainer}>
            <Text style={innerStyles.greyContainerText}>
              RM 12.00 fees will be deducted from your main account.
            </Text>
          </View>
          <Button
            style={{
              primaryContainerStyle: {
                borderRadius: 100,
                height: 56,
              },
            }}
            bgColor="#1b1b1b"
            variant="primary"
            label="Continue"
            onPress={() => {
              setAlert(true);
              setError(false);
            }}
          />
        </View>
      </ScrollView>
      <DeliverInfoSheet
        isVisible={showSheet}
        onClose={() => setShowSheet(false)}
      />
      <AlertModal
        isVisible={showAlert}
        position="bottom"
        title={error ? "Unsuccessful!" : "Success!"}
        subtitle={
          error
            ? "Error when performing request. Please try again later."
            : "Your order has been placed. Enjoy hassle free payments, ATM withdrawals and pay in-store merchants. "
        }
        icon={
          <View style={{ height: 55, width: 55 }}>
            {error ? (
              <InfoIcon color="#00000030" />
            ) : (
              <BRoundedTickIcon color="#00000030" />
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
          <View style={{ paddingHorizontal: 24, width: "100%" }}>
            {!error && (
              <View style={innerStyles.greyContainer}>
                <Text style={innerStyles.greyContainerText}>
                  Your Visa debit card will be delivered to your selected
                  address.
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
              bgColor="#1b1b1b"
              variant="primary"
              label={error ? "Retry" : "Track Your Card"}
              onPress={() => {
                setAlert(false);
                if (!error) {
                  onPressTrackCard();
                }
              }}
            />
          </View>
        }
      />
    </>
  );
};

export default OrderPhysicalCardComponent;

const innerStyles = StyleSheet.create({
  subTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  deliverText: {
    fontWeight: "600",
    marginRight: 10,
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
    backgroundColor: "#1b1b1b",
    borderRadius: 24,
  },
  radioBtnTextContainer: {
    marginLeft: 10,
  },
  radioBtnTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  greyContainer: {
    backgroundColor: "#dddddd",
    width: "100%",
    borderRadius: 3,
    padding: 16,
    marginVertical: 16,
  },
  greyContainerText: {
    fontSize: 12,
  },
});
