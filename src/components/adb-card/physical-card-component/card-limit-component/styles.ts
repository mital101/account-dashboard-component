import { defaultsDeep } from "lodash";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface CardLimitStyles {
    wrapperStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?:StyleProp<TextStyle>;
    subTitleStyle?:StyleProp<TextStyle>;
    cardContainerStyle?:StyleProp<ViewStyle>;
    buttonContainer?:StyleProp<ViewStyle>;
}

const useMergeStyles = (
  style?: CardLimitStyles
): CardLimitStyles => {
  const defaultStyles: CardLimitStyles = StyleSheet.create({
    wrapperStyle: {
        backgroundColor: "#fff",
        paddingHorizontal: 24,
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
    buttonContainer: {
      position:'absolute',
      bottom: 20,
      width:'100%',
      alignSelf:'center'
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
