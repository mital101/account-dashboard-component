import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { AppPasscodeCompStyle } from "../types";
const useMergeStyles = (style?: AppPasscodeCompStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: AppPasscodeCompStyle = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    titleContainerStyle: {
      flex: 0.2,
      backgroundColor: "#ffffff",
      paddingHorizontal: 24,
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
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
