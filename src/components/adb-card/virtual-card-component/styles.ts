import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { ActivateVirtualCardStyle } from "../types";
const useMergeStyles = (style?: ActivateVirtualCardStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ActivateVirtualCardStyle = StyleSheet.create({
    containerStyle: {
      backgroundColor: "#1b1b1b",
      width: "100%",
      flexDirection: "row",
      padding: 16,
      borderRadius: 12,
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 8,
    },
    virtualCardTextStyle: {
      color: "#ffffff",
      fontSize: 12,
      width: "90%",
    },
    virtualCardIconContainerStyle: {
      height: 20,
      backgroundColor: "white",
      width: 20,
      borderRadius: 100,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
