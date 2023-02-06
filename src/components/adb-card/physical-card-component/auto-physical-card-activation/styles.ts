import { defaultsDeep } from "lodash";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useContex } from "react";
import { ThemeContext } from "react-native-theme-component";
export interface AutoPhysicalCardStyles {
  containerStyle?: StyleProp<ViewStyle>;
  bgImageStyle?: StyleProp<ViewStyle>;
  buttonContainer?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
}

const useMergeStyles = (
  style?: AutoPhysicalCardStyles
): AutoPhysicalCardStyles => {
  const { colors } = useContex(ThemeContext);

  const defaultStyles: AutoPhysicalCardStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: "#fff",
      flex: 1,
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
    bgImageStyle: {
      flex: 0.8,
      paddingHorizontal: 24,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    buttonContainer: {
      flex: 0.2,
      backgroundColor: colors.black,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
      position: "absolute",
      width: "100%",
      bottom: 50,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
