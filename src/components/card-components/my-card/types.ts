import { TransactionLimit } from "../../../types";
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";

export type MyCardComponentProps = {
    style?: MyCardComponentStyles;
    props: {
      isShowWalkThrough: boolean;
      isShowSensitiveData: boolean;
      isInProgressStatus: boolean;
      isShowLoadingSensitiveData: boolean;
      setIsShowLoadingSensitiveData: (isShow: boolean) => void;
      transactionLimitValue?: number;
      isVCActive: boolean;
      onToggleShowingSensitiveData: () => void;
      onToggleActiveCard: () => void;
      onUpdateTransactionLimits: () => void;
      onUpdateTransactionChannel: () => void;
      onReportCard: () => void;
      onSuccessUpdatedStatus?: () => void;
      onFailedUpdatedStatus?: () => void;
      onSuccessUpdateTransactionLimit?: (transaction: TransactionLimit) => void;
      onFailedUpdateTransactionLimit?: () => void;
      onSuccessUpdateTransactionChannel?: (isEnable: boolean) => void;
      onFailedUpdateTransactionChannel?: () => void;
      onSuccessReportCard?: () => void;
      onFailedReportCard?: () => void;
      onSelectPhysicalCard?: () => void;
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
    noteWrapper?: StyleProp<ViewStyle>;
    noteDescription?: StyleProp<TextStyle>;
    note?: StyleProp<TextStyle>;
    cardProgressContainer?: StyleProp<ViewStyle>;
    cardProgressTitle?: StyleProp<TextStyle>;
    cardProgressSubTitle?: StyleProp<TextStyle>;
    imageUD?: StyleProp<ViewStyle>;
    image?: StyleProp<ImageStyle>;
    pcCardContentView?: StyleProp<ViewStyle>;
    pcCardContentImageView?: StyleProp<ViewStyle>;
    pcCardContentWrapper?: StyleProp<ViewStyle>;
    imagePC?: StyleProp<ViewStyle>;
    getACardBtn?: StyleProp<ViewStyle>;
    pcCardTitle?: StyleProp<TextStyle>;
    pcCardSubTitle?: StyleProp<TextStyle>;
  };
  