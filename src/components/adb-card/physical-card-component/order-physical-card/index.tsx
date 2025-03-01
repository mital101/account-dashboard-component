import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Button, ThemeContext } from "react-native-theme-component";
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
  onPressSettings: () => void;
}

export const addressRadioGroup = [
  {
    id: "rd-1",
    title: "Mailing address",
    desc: "{Olive P5-20, Empire Residence, 40170, Damansara Perdana, Selangor}",
    selected: false,
  },
  // {
  //   id: "rd-2",
  //   title: "MyKad address",
  //   desc: "{B10, D’Aman Residence, Jalan Perdana 5, Taman Perdana 5, Puchong, Selangor}",
  //   selected: false,
  // },
];

const OrderPhysicalCardComponent: React.FC<OrderPhysicalCardProps> = (
  props
) => {
  const { style, onPressGotoHome, onPressTrackCard, onPressSettings } = props;
  const { i18n, fonts ,colors} = useContext(ThemeContext);
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


const innerStyles = StyleSheet.create({
  subTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title :{
fontFamily : fonts.bold
  },
  desc : { color: colors.btnColor ,
fontFamily : fonts.regular},
  deliverText: {
    marginRight: 10,
    color: colors.btnColor,
    fontFamily : fonts.semiBold
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
    backgroundColor: colors.btnColor,
    borderRadius: 24,
  },
  radioBtnTitle: {
    fontWeight: "600",
    marginBottom: 4,
    color: colors.btnColor,
  },
  greyContainer: {
    backgroundColor: colors.disableTransparent,
    width: "100%",
    borderRadius: 3,
    padding: 16,
    marginVertical: 16,
  },
  greyContainerText: {
    fontSize: 12,
    color: colors.btnColor,
    fontFamily : fonts.regular
  },
});


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
          <Text style={[styles.titleStyle,innerStyles.title]}>
            {i18n?.t("adb_card.lbl_get_physical_card_today") ??
              "Get your physical card today!"}
          </Text>
          <VirtualCard
            showEyeIcon
            cardHolderName="{Nur Aeolanda Binti Mahmud}"
            showCardType
            cardBottomText="{ADB} VISA Debit Card"
          />
          <View style={innerStyles.subTitleContainer}>
            <Text style={innerStyles.deliverText}>
              {i18n?.t("adb_card.lbl_deliver_to") ?? "Deliver to"}
            </Text>  
          </View>
          {radioData.map((item, index) => (
                <Text style={innerStyles.desc}>{item.desc}</Text> 
          ))}
           <View style={innerStyles.greyContainer}>
            <Text style={innerStyles.greyContainerText}>
              { i18n?.t("adb_card.lbl_get_physical_card_delivery")}
            
            </Text>
          </View>
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
            bgColor={colors.btnColor}
            variant="primary"
            label={i18n?.t("adb_card.btn_continue") ?? "Continue"}
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
        onPressSettings={onPressSettings}
      />
      <AlertModal
        isVisible={showAlert}
        position="bottom"
        title={
          error
            ? i18n?.t("adb_card.lbl_unsuccessful") ?? "Unsuccessful!"
            : i18n?.t("adb_card.lbl_success") ?? "Success!"
        }
        subtitle={
          error
            ? i18n?.t("adb_card.lbl_error_req") ??
              "Error when performing request. Please try again later."
            : i18n?.t("adb_card.lbl_odr_placed") ??
              "Your order has been placed. Enjoy hassle free payments, ATM withdrawals and pay in-store merchants."
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
                  {i18n?.t("adb_card.lbl_will_deliver_address") ??
                    "Your Visa debit card will be delivered to your selected address."}
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
                    borderColor: colors.btnColor,
                  },
                  primaryLabelStyle: {
                    color: colors.btnColor,
                  },
                }}
                bgColor={colors.backgroundTextColor}
                variant="primary"
                label={i18n?.t("adb_card.btn_go_home") ?? "Go to Home"}
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
              bgColor={colors.btnColor}
              variant="primary"
              label={
                error
                  ? i18n?.t("adb_card.btn_retry") ?? "Retry"
                  : i18n?.t("adb_card.btn_track_card") ?? "Track Your Card"
              }
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
