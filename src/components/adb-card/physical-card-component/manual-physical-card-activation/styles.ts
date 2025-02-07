import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ThemeContext } from "react-native-theme-component";

export interface ManualCardActivationStyles {
  wrapperStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  sensitiveDataContainer?: StyleProp<ViewStyle>;
  buttonContainer?: StyleProp<ViewStyle>;
}

const useMergeStyles = (
  style?: ManualCardActivationStyles
): ManualCardActivationStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ManualCardActivationStyles = StyleSheet.create({
    wrapperStyle: {
      backgroundColor: colors.primaryButtonLabelColor,
      paddingHorizontal: 24,
      flex: 1,
    },
    titleStyle: {
      fontSize: 28,
      fontWeight: "600",
      color: colors.btnColor,
      marginBottom: 8,
      marginTop: 10,
    },
    subTitleStyle: {
      fontSize: 14,
      color: colors.btnColor,
      fontFamily: fonts.regular,
    },
    inputContainerStyle: {
      marginTop: 24,
    },
    sensitiveDataContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    buttonContainer: {
      position: "absolute",
      bottom: 10,
      width: "100%",
      alignSelf: "center",
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
