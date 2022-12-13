import { defaultsDeep } from "lodash";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface CircularImageViewStyles {
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const useMergeStyles = (
  style?: CircularImageViewStyles
): CircularImageViewStyles => {
  const defaultStyles: CircularImageViewStyles = StyleSheet.create({
    containerStyle: {
      justifyContent: "center",
      alignItems: "center",
    },
    iconContainerStyle: {
      backgroundColor: "#a5a5a5",
      height: 56,
      width: 56,
      borderRadius: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    labelStyle: { marginTop: 5, color: "#1b1b1b" },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
