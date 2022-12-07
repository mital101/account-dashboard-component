import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { BalanceStyle } from "../types";
const useMergeStyles = (style?: BalanceStyle) => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: BalanceStyle = StyleSheet.create({
    containerStyle: {
      backgroundColor: "#dddddd",
      width: "100%",
      paddingVertical: 12,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 8,
    },
    accountBalanceText: {
      // ...palette.highlight,
      fontSize: 14,
    },
    accountBalance: {
      // ...palette.bigTitle,
      padding: 8,
      fontSize: 32,
      fontWeight: "600",
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
