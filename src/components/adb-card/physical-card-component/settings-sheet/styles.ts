import { defaultsDeep } from "lodash";
import { Dimensions, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface SettingsSheetStyles {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  crossContainer?: StyleProp<ViewStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
}

const useMergeStyles = (
  style?: SettingsSheetStyles
): SettingsSheetStyles => {
  const defaultStyles: SettingsSheetStyles = StyleSheet.create({
    containerStyle: {
        padding: 24,
        height: (Dimensions.get("screen").height * 70) / 100,
    },
    titleStyle: {
        fontWeight: "600",
        fontSize: 24,
        width: "90%",
        color: "#1b1b1b",
    },
    crossContainer: {
        height: 32,
        width: 32,
        backgroundColor: "#dddddd",
        alignSelf: "flex-end",
        borderRadius: 100,
        marginBottom: 24,
    },
    listContainerStyle: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#DDDDDD",
      }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
