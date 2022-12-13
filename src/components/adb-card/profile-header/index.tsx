import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import BarcodeIcon from "../../../assets/barcode-icon";
import AccountBalanceCard from "../balance-component";
import CircularImageView from "../core/circular-image-view";
import { ActivateVirtualCardStyle, BalanceStyle } from "../types";
import VirtualCardComponent from "../virtual-card-component";

export interface ProfileInterface {
  BalanceStyles?: BalanceStyle;
  ActivateCardStyles?: ActivateVirtualCardStyle;
  onActivateVirtualCardPress: () => void;
}
const data = [
  {
    id: "1",
    label: "Transfer",
  },
  {
    id: "2",
    label: "Goals",
  },
  {
    id: "3",
    label: "Rewards",
  },
  {
    id: "4",
    label: "More",
  },
];
const ProfileHeader: React.FC<ProfileInterface> = (props) => {
  const { BalanceStyles, ActivateCardStyles, onActivateVirtualCardPress } =
    props;
  const { i18n } = useContext(ThemeContext);
  return (
    <>
      <View style={styles.profileNameContainer}>
        <Text style={styles.usernameText}>Hi, 101</Text>
        <CircularImageView />
      </View>
      <View style={styles.membershipContainer}>
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.type}>
            {i18n?.t("adb_card.lbl_mem_id") ?? "Membership ID"}
          </Text>
          <View style={styles.row}>
            <Text style={styles.value}>2022 0302 1992 1120</Text>
            <TouchableOpacity style={styles.barcodeIconContainer}>
              <BarcodeIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginBottom: 24, alignItems: "flex-end" }}>
          <Text style={styles.type}>
            {i18n?.t("adb_card.lbl_mem_point") ?? "Membership Plus Point"}
          </Text>
          <Text style={styles.value}>1,000 pts</Text>
        </View>
      </View>
      <VirtualCardComponent
        style={ActivateCardStyles}
        onActivateVirtualCardPress={onActivateVirtualCardPress}
      />
      <AccountBalanceCard balance={630} style={BalanceStyles} />
      <View style={styles.listContainer}>
        {data.map((res) => (
          <CircularImageView key={res.id} label={res.label} />
        ))}
      </View>
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "600",
    //   fontFamily: fonts.semiBold,
    color: "#1b1b1b",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    color: "#1b1b1b",
  },
  imageContainer: {
    marginVertical: 32,
  },
  lowerContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  profileNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membershipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  type: {
    //   fontFamily: fonts.medium,
    fontSize: 12,
    color: "#858585",
  },
  value: {
    //   fontFamily: fonts.regular,
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  barcodeIconContainer: {
    marginLeft: 10,
    paddingTop: 8,
  },
  listContainer: {
    backgroundColor: "#DDDDDD",
    width: "100%",
    padding: 16,
    borderRadius: 24,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
  },
});
