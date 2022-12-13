import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { WalletItemStyle } from "../../types";

const useMergeStyles = (style?: WalletItemStyle): WalletItemStyle => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: WalletItemStyle = StyleSheet.create({
    containerStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#dddddd",
      borderRadius: 24,
      height: (Dimensions.get("screen").height * 20) / 100,
      paddingHorizontal: 20,
      marginRight: 16,
    },
    rightContainerStyle: {
      marginLeft: 16,
    },
    titleStyle: {
      fontFamily: fonts.semiBold,
      fontSize: 14,
      lineHeight: 16,
      marginBottom: 5,
      color: "#1b1b1b",
    },
    subTitleStyle: {
      fontSize: 12,
      fontFamily: fonts.regular,
      width: "70%",
      color: "#1b1b1b",
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
