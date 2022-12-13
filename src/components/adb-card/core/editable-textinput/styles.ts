import { defaultsDeep } from "lodash";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

export interface EditableInputStyles {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputValueStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  valueContainer?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

const useMergeStyles = (
  style?: EditableInputStyles
): EditableInputStyles => {
  const defaultStyles: EditableInputStyles = StyleSheet.create({
    containerStyle: {
        justifyContent:'center',
        alignItems: "flex-start",
        marginVertical: 12,
    },
    labelStyle: {
        color: "#858585",
        fontSize: 12,
        lineHeight:16,
    },
    inputStyle: {
        padding: 0,
        width: '85%',
        color: "#000000"
    },
    inputContainerStyle: {
        borderBottomWidth: 1,
        borderColor: '#C2C2C2',
        width: '88%',
        marginLeft: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    valueContainer: {
        width: '88%',
        marginLeft: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    valueStyle: {
        color: "#000000"
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
