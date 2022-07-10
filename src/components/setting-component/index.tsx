import React, { forwardRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SettingComponentProps, SettingItem, SettingOptions } from './types';
import useMergeStyles from './styles';
import {
  SettingAccountLimitIcon,
  SettingDataPrivacyIcon,
  SettingLanguageIcon,
  SettingLoginSecureIcon,
  SettingTermAndConditionIcon,
} from '../../../src/assets/images';
import ProfileCardComponent from './profile-card';
import SettingOptionCard from './setting-option-card';
import { Button } from 'react-native-theme-component';

const SettingComponent = forwardRef(({ Root }: SettingComponentProps) => {
  const { props, style } = Root || {};
  const {
    onSelectAccountLimits,
    onSelectLoginAndSecure,
    onSelectHelpCenter,
    onSelectTermAndConditions,
    onSelectPrivacyStatement,
    onViewProfile,
    onLogout,
  } = props || {};

  const styles = useMergeStyles(style);

  const settingOptions = {
    [SettingOptions.Language]: {
      icon: <SettingLanguageIcon width={35} height={35} />,
      title: 'Language',
      subTitle: 'Select your language',
      onSelect: onSelectAccountLimits,
    },
    [SettingOptions.LoginAndSecure]: {
      icon: <SettingLoginSecureIcon width={35} height={35} />,
      title: 'Login and Security',
      subTitle: 'Password, Biometrics, One-Time Password',
      onSelect: onSelectLoginAndSecure,
    },
    [SettingOptions.HelpCenter]: {
      icon: <SettingLoginSecureIcon width={35} height={35} />,
      title: 'Help Center',
      subTitle: 'FAQs, Submit a ticket, Contact Us',
      onSelect: onSelectHelpCenter,
    },
    [SettingOptions.TermsAndConditions]: {
      icon: <SettingTermAndConditionIcon width={35} height={35} />,
      title: 'Terms & Conditions',
      subTitle: 'UnionDigital Bank’s Terms and Conditions',
      onSelect: onSelectTermAndConditions,
    },
    [SettingOptions.AccountLimit]: {
      icon: <SettingAccountLimitIcon width={35} height={35} />,
      title: 'Crypto Account Limits',
      subTitle: 'Account transfer-in & transfer out limits',
      onSelect: onSelectAccountLimits,
    },
    [SettingOptions.DataPrivacy]: {
      icon: <SettingDataPrivacyIcon width={35} height={35} />,
      title: 'Data Privacy Statement',
      subTitle: 'UnionDigital Bank’s Data Privacy Statement',
      onSelect: onSelectPrivacyStatement,
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Text style={styles.title}>Settings</Text>
        <ProfileCardComponent
          username="Ben Santos"
          lastLoginDateTime="Last Login: Nov 11, 2022 3:35 PM"
          onViewProfile={onViewProfile}
        />
        {Object.values(settingOptions).map((itm: SettingItem) => (
          <SettingOptionCard data={itm} />
        ))}
        <Button label="Logout" onPress={onLogout} />
      </ScrollView>
      <View></View>
    </View>
  );
});

export default SettingComponent;
