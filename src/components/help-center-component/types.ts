import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type HelpCenterComponentProps = {
  Root?: {
    style?: HelpCenterComponentStyles;
    props?: {
      onSelectFAQs?: () => void;
      onSelectSubmitTicket?: () => void;
    };
  };
};

export type HelpCenterComponentStyles = {
  container?: StyleProp<ViewStyle>;
  pageTitle?: StyleProp<TextStyle>;
  title?: StyleProp<TextStyle>;
  subTitle?: StyleProp<TextStyle>;
  contactContainer?: StyleProp<ViewStyle>;
  scrollView?: StyleProp<ViewStyle>;
};

export type HelpOptionItem = {
  icon?: ReactNode;
  title: string;
  subTitle?: string;
  onSelect?: () => void;
};

export type ContactInfoItem = {
  icon?: React.FC<{
    width?: number;
    height?: number;
    color?: string;
  }>;
  title: string;
  subTitle?: string;
  showCopyToClipboardOption?: boolean;
};

export enum SupportTypes {
  FAQs,
  SubmitTicket,
}
