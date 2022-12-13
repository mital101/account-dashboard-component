import { defaultsDeep } from "lodash";
import { Dimensions, StyleSheet } from "react-native";
import { CardManagementStyles } from "../physical-card-component";

const useMergeStyles = (style?: CardManagementStyles): CardManagementStyles => {
  const defaultStyles: CardManagementStyles = StyleSheet.create({
    navContainerStyle: {
      backgroundColor: "#dddddd",
      height: (Dimensions.get("screen").height * 45) / 100,
      borderBottomEndRadius: 24,
      borderBottomStartRadius: 24,
      justifyContent: "center",
      paddingHorizontal: 30,
      marginBottom: 12,
    },
    navContainerTextStyle: {
      textAlign: "center",
      color: "#1b1b1b",
    },
    navContainerSubTitleStyle: {
      textAlign: "center",
      color: "#1b1b1b",
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
