import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { CryptoTransferOutDetailComponentStyles } from "./types";
import { ThemeContext } from "react-native-theme-component";

const useMergeStyles = (
  style?: CryptoTransferOutDetailComponentStyles
): CryptoTransferOutDetailComponentStyles => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    header: {
      flexDirection: "row",
      marginHorizontal: 25,
      justifyContent: "space-between",
      marginTop: 14,
      alignItems: "center"
    },
    pageHeaderName: {
      fontWeight: "500",
      fontSize: 10,
      color: "#4E4B50",
      lineHeight: 18
    },
    safeArea: {
      flex: 1
    },
    container: {
      paddingHorizontal: 25,
      flex: 1
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: "#3E2D68"
    },
    formWrapper: { marginTop: 10 },
    label: {
      fontSize: 12,
      fontWeight: "700",
      lineHeight: 21,
      color: "#1D1C1D",
      marginTop: 20
    },
    actionWrapper: {
      paddingHorizontal: 23
    },
    qrIconWrapper: { height: 30, width: 35 },
    amountWrapper: {
      backgroundColor: "#fff",
      borderRadius: 5,
      paddingVertical: 10
    },
    amountContent: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#EEEEEE"
    },
    amountTextWrapper: { flex: 1 },
    amountTextLabel: {
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 21,
      color: "#000000",
      textAlign: "right",
      paddingRight: 5
    },
    amountTextMessage: {
      fontSize: 10,
      fontWeight: "500",
      lineHeight: 18,
      color: "#7F7B82",
      textAlign: "right",
      paddingRight: 5
    },
    balanceLabel: {
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 21,
      color: "#7F7B82"
    },
    balanceValue: {
      fontSize: 12,
      fontWeight: "500",
      lineHeight: 21,
      color: "#000000"
    },
    linkText: {
      color: "#F8981D",
      fontWeight: "700",
      fontSize: 14,
      lineHeight: 16,
      textDecorationLine: "underline"
    },
    balanceContentWrapper: {
      flexDirection: "row",
      paddingTop: 10,
      paddingHorizontal: 10,
      justifyContent: "space-between"
    },
    balanceContainer: {
      flexDirection: "row"
    },
    sendLinkWrapper: {
      flexDirection: "row",
      alignItems: "center"
    },
    noteView: {
      padding: 20,
      marginTop: 10,
      borderRadius: 8,
      backgroundColor: "#DDD9E4"
    },
    noteLabel: {
      color: "#1D1C1D",
      // fontFamily: fonts.regular,
      fontSize: 10
    },
    dailyLimit: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      padding: 20,
      marginTop: 28
    },
    dailyLimitLabel: {
      fontSize: 12,
      color: "#020000",
      fontFamily: fonts.regular
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    },
    row: {
      flexDirection: "row",
      alignItems: "center"
    },
    aboutLimitLabel: {
      color: "#F8981D",
      textDecorationLine: "underline",
      fontFamily: fonts.medium,
      marginRight: 5
    },
    remainingWrapper: {
      alignItems: "center",
      marginTop: 10
    },
    remainLabel: {
      color: "#BAB7BB",
      fontSize: 10,
      fontFamily: fonts.regular
    },

    pageHeaderMessage: {
      fontWeight: "500",
      fontSize: 12,
      lineHeight: 21,
      color: "#4E4B50",
      fontFamily: fonts.regular,
      marginVertical: 15
    }
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
