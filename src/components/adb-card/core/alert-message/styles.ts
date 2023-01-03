import { defaultsDeep } from "lodash";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface AlertMessageStyles {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  closeIconContainer?:StyleProp<ViewStyle>;
}

const useMergeStyles = (
  style?:AlertMessageStyles 
): AlertMessageStyles => {
  const defaultStyles: AlertMessageStyles = StyleSheet.create({
    containerStyle: {
        position:"absolute",
        flexDirection:"row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      backgroundColor:'#1b1b1b',
      borderRadius: 3,
      width:'90%',
      alignSelf:'center',
      marginTop: 10
    },
    titleStyle: {
        color:'#fff',
        fontWeight:'500',
        fontSize: 12,
        width: '90%'
    },
    closeIconContainer: {
        width: 20,
        height: 20,
        backgroundColor: '#ffffff',
        borderRadius: 100,
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
