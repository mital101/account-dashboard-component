import { defaultsDeep } from "lodash";
import { Dimensions, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface LockCardSheetStyles {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  crossContainer?: StyleProp<ViewStyle>;
  listContainerStyle?: StyleProp<ViewStyle>;
}
export const SCREEN_HEIGHT = Dimensions.get('screen').height
const useMergeStyles = (
  style?: LockCardSheetStyles
): LockCardSheetStyles => {
  const defaultStyles: LockCardSheetStyles = StyleSheet.create({
    containerStyle: {
        padding: 24,
        height: (SCREEN_HEIGHT * (SCREEN_HEIGHT > 700 ? 70 : 80)) / 100, 
    },
    titleStyle: {
        fontWeight: "600",
        fontSize: 24,
        width: "90%",
        color: "#1b1b1b",
    },
    subtitleStyle: {
        fontSize: 14,
        color: "#1b1b1b",
        marginTop: 10,
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
        borderTopWidth: 1,
        borderColor: "#DDDDDD",
      }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
