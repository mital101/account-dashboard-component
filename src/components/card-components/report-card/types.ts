import { CardReport } from '../../../types';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ReportCardComponentProps = {
  style?: ReportCardComponentStyles;
  props: {
    onCancelReportCard: () => void;
    onDismissAlert: () => void;
    isShowConfirmALert: boolean;
    onConfirm: (report: CardReport) => void;
    initStatus: boolean;
  };
};

export type ReportCardComponentStyles = {
  container?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  pageSubtite?: StyleProp<TextStyle>;
  actionWrapper?: StyleProp<ViewStyle>; 
  titleSection?: StyleProp<ViewStyle>; 
  dragSection?: StyleProp<ViewStyle>; 
  amountRow?: StyleProp<ViewStyle>; 
  processRow?: StyleProp<ViewStyle>; 
  title?: StyleProp<TextStyle>; 
  subTitle?: StyleProp<TextStyle>;
  amountNumber?: StyleProp<TextStyle>; 
  lineAmount?: StyleProp<ViewStyle>; 
  circleAmount?: StyleProp<ViewStyle>; 
  viewAmountNumber?: StyleProp<ViewStyle>; 
  bigLineAmount?: StyleProp<ViewStyle>; 
  amountLineSection?: StyleProp<ViewStyle>; 
  bigLineColumnAmount?: StyleProp<ViewStyle>; 
  row?: StyleProp<ViewStyle>; 
};
