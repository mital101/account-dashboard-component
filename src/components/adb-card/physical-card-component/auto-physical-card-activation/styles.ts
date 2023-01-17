import { defaultsDeep } from "lodash";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface AutoPhysicalCardStyles {
    containerStyle?: StyleProp<ViewStyle>;
    bgImageStyle?:StyleProp<ViewStyle>;
    buttonContainer?:StyleProp<ViewStyle>;
    titleStyle?:StyleProp<TextStyle>;
    subTitleStyle?:StyleProp<TextStyle>;
}

const useMergeStyles = (
  style?:AutoPhysicalCardStyles
): AutoPhysicalCardStyles => {
  const defaultStyles: AutoPhysicalCardStyles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "#fff",
        flex:1,
    },
    titleStyle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#1b1b1b',
      marginBottom: 8,
    },
    subTitleStyle: {
      fontSize: 14,
      color: '#1b1b1b',
    },
    bgImageStyle: {
        flex: 0.8,
        // paddingHorizontal:24,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonContainer: {
        flex: 0.2,
        // backgroundColor: "#00000060",
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:24,
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
