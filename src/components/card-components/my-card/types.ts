import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type MyCardComponentProps = {
    style?: MyCardComponentStyles;
    props?: {
      isShowWalkThrough?: boolean;
    }
  };
  
  export type MyCardComponentStyles = {
    container?: StyleProp<ViewStyle>;
    rowSpaceBetween?: StyleProp<ViewStyle>;
    row?: StyleProp<ViewStyle>;
    pageTitle?: StyleProp<TextStyle>;
    vcCardContainer?: StyleProp<ViewStyle>;
    cardText?: StyleProp<TextStyle>;
    title?: StyleProp<TextStyle>;
    rowSubTitle?: StyleProp<ViewStyle>;
    rowCardNumber?: StyleProp<ViewStyle>;
    cvvSection?: StyleProp<ViewStyle>;
    subTitle?: StyleProp<TextStyle>;
    titleSection?: StyleProp<TextStyle>;
    pointerText?: StyleProp<TextStyle>;
    skipText?: StyleProp<TextStyle>;
    sliderContainerStyle?: StyleProp<ViewStyle>;
    dashboardCarousel?: StyleProp<ViewStyle>;
    learnSection?: StyleProp<ViewStyle>;
    optionsSection?: StyleProp<ViewStyle>;
    pointerView?: StyleProp<ViewStyle>;
    skipBtn?: StyleProp<ViewStyle>;
    ttContent?: StyleProp<ViewStyle>;
    ttCardContainer?: StyleProp<ViewStyle>;
    marginLeft?: StyleProp<ViewStyle>;
    column?: StyleProp<ViewStyle>;
    skipView?: StyleProp<ViewStyle>;
  };
  