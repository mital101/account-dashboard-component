import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type CardTermAndConditionsProps = {
    style?: CardTermAndConditionsStyles;
    onAccept?: () => void
  };
  
  export type CardTermAndConditionsStyles = {
    container?: StyleProp<ViewStyle>;
    row?: StyleProp<ViewStyle>;
    loadingView?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
    tabbarBtn?: StyleProp<ViewStyle>;
    tabbarBtnTitle?: StyleProp<TextStyle>;
    contentTitle?: StyleProp<TextStyle>;
    contentSubTitle?: StyleProp<TextStyle>;
    spacingnVertical?: StyleProp<ViewStyle>;
    iconInfoWrapper?: StyleProp<ViewStyle>;
    contentScrollView?: StyleProp<ViewStyle>;
    paddingBottom?: StyleProp<ViewStyle>;
    secondaryBtn?: StyleProp<ViewStyle>;
    secondaryTitle?: StyleProp<TextStyle>;
  };
  