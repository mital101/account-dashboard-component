import { defaultsDeep } from "lodash";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface ReplaceCardComponentStyles {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  reasonText?: StyleProp<TextStyle>;
  reasonTitle?: StyleProp<TextStyle>;
  radioButtonContainerStyle?: StyleProp<ViewStyle>;
  buttonContainer?: StyleProp<ViewStyle>;
  reasonContainer?: StyleProp<ViewStyle>;
}

const useMergeStyles = (
  style?: ReplaceCardComponentStyles
): ReplaceCardComponentStyles => {
  const defaultStyles: ReplaceCardComponentStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: "#fff",
      paddingHorizontal: 24,
      flex: 1,
    },
    titleStyle: {
      fontSize: 24,
      fontWeight: "600",
      color: "#1b1b1b",
      marginBottom: 8,
      width: "90%",
    },
    subTitleStyle: {
      fontSize: 14,
      color: "#1b1b1b",
    },
    buttonContainer: {
      position: "absolute",
      bottom: 20,
      width: "100%",
      alignSelf: "center",
    },
    radioButtonContainerStyle: {
      marginTop: 30,
    },
    reasonContainer: {
      marginVertical: 30,
    },
    reasonTitle: {
      fontSize: 14,
      color: "#1b1b1b",
      fontWeight: "600",
      marginVertical: 4,
    },
    reasonText: {
      fontSize: 14,
      color: "#1b1b1b",
      marginVertical: 4,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
