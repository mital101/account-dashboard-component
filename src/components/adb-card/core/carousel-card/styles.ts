import { defaultsDeep } from "lodash";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface CarouselCardStyles {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  buttonLabelStyle?:StyleProp<TextStyle>;
}

const useMergeStyles = (
  style?: CarouselCardStyles
): CarouselCardStyles => {
  const defaultStyles: CarouselCardStyles = StyleSheet.create({
    containerStyle: {
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 16,
      backgroundColor:'#1b1b1b',
      borderRadius: 12,
      width:'100%'
    },
    titleStyle: {
        color:'#fff',
        fontWeight:'500'
    },
    subTitleStyle: {
        color:'#fff',
        paddingTop: 5,
    },
    buttonLabelStyle: {
        fontWeight:'600',
        color:'#fff',
    },
    buttonContainerStyle: {
        marginVertical: 12,
        flexDirection:'row',
        alignItems:'center',
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
