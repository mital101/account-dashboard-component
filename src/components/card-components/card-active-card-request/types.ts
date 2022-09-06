import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type ActiveCardRequestProps = {
    style?: ActiveCardRequestStyles;
    onNavigateToMyCard?: () => void;
    onBackToDashboard?: () => void;
  };
  
  export type ActiveCardRequestStyles = {
    container?: StyleProp<ViewStyle>;
    row?: StyleProp<ViewStyle>;
    containerCenter?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
    subTitleWrapper?: StyleProp<ViewStyle>;
    circleProgressWrapper?: StyleProp<ViewStyle>;
    containerFailed?: StyleProp<ViewStyle>;
    errorContentWrapper?: StyleProp<ViewStyle>;
    columnBetween?: StyleProp<ViewStyle>;
    errorTitleWrapper?: StyleProp<ViewStyle>;
    iconErrorWrapper?: StyleProp<ViewStyle>;
    statusLabel?: StyleProp<TextStyle>;
    btnTransparent?: StyleProp<ViewStyle>;
    labelBtnTransaprent?: StyleProp<TextStyle>;
    errorMessageWrapper?: StyleProp<TextStyle>;
    errorMessageLabel?: StyleProp<TextStyle>;
    title?: StyleProp<TextStyle>;
    subTitle?: StyleProp<TextStyle>;
  };
  