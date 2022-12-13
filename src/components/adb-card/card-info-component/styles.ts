import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { VirtualCardInfoStyle } from "../types";
const useMergeStyles = (style?: VirtualCardInfoStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: VirtualCardInfoStyle = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingHorizontal: 24,
    },
    titleContainerStyle: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingTop: 24,
    },
    titleStyle: {
      fontSize: 24,
      fontWeight: "600",
      color: "#1b1b1b",
      marginBottom: 8,
    },
    subTitleStyle: {
      fontSize: 14,
      color: "#1b1b1b",
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
