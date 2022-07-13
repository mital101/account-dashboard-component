import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type SettingComponentProps = {
  Root?: {
    style?: SettingComponentStyles;
    props?: {
      onSelectLanguage?: () => void;
      onSelectLoginAndSecure?: () => void;
      onSelectHelpCenter?: () => void;
      onSelectTermAndConditions?: () => void;
      onSelectAccountLimits?: () => void;
      onSelectPrivacyStatement?: () => void;
      onViewProfile?: () => void;
      onLogout?: () => void;
    };
  };
};

export type SettingComponentStyles = {
  container?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  scrollView?: StyleProp<ViewStyle>;
  paddingBottomView?: StyleProp<ViewStyle>;
};

export type SettingItem = {
  icon?: ReactNode;
  title: string;
  subTitle?: string;
  onSelect?: () => void;
};

export enum SettingOptions {
  Language,
  LoginAndSecure,
  HelpCenter,
  TermsAndConditions,
  AccountLimit,
  DataPrivacy,
}
