import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ThemeContext } from "react-native-theme-component";

export interface ADBReportCardComponentStyles {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  radioButtonContainerStyle?: StyleProp<ViewStyle>;
  buttonContainer?: StyleProp<ViewStyle>;
  copyContainer?: StyleProp<ViewStyle>;
  copyContainerText?: StyleProp<TextStyle>;
}

const useMergeStyles = (
  style?: ADBReportCardComponentStyles
): ADBReportCardComponentStyles => {
  const { fonts } = useContext(ThemeContext);
  const defaultStyles: ADBReportCardComponentStyles = StyleSheet.create({
    containerStyle: {
      backgroundColor: "#fff",
      paddingHorizontal: 24,
      flex: 1,
    },
    titleStyle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: "#1b1b1b",
      marginBottom: 8,
      width: "90%",
    },
    subTitleStyle: {
      fontSize: 14,
      color: "#1b1b1b",
      fontFamily: fonts.regular,
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
    copyContainer: {
      backgroundColor: "#dddddd",
      width: "100%",
      borderRadius: 3,
      padding: 16,
      marginVertical: 16,
    },
    copyContainerText: {
      fontSize: 12,
      color: "#1b1b1b",
      fontFamily: fonts.regular,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
