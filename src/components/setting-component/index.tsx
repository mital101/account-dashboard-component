import React, { forwardRef, useContext } from 'react';
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
import { AuthContext } from 'react-native-auth-component';
import moment from 'moment';

const SettingComponent = forwardRef(({ Root }: SettingComponentProps) => {
  const { props, style } = Root || {};
  const { profile, logout } = useContext(AuthContext);
  const {
    onSelectAccountLimits,
    onSelectLoginAndSecure,
    onSelectHelpCenter,
    onSelectTermAndConditions,
    onSelectPrivacyStatement,
    onViewProfile,
    onLogout,
  } = props || {};
  console.log('profile', profile);
  const styles = useMergeStyles(style);
  moment.locale('en');

  const fullName = `${profile?.firstName} ${profile?.lastName}`.trim();
  const lastLoginDateTime = moment(profile?.lastLoginAt).format('LLL');

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

  const onLogoutHandler = () => {
    logout();
    onLogout && onLogout();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Text style={styles.title}>Settings</Text>
        <ProfileCardComponent
          username={fullName}
          lastLoginDateTime={`Last Login: ${lastLoginDateTime}`}
          onViewProfile={onViewProfile}
        />
        {Object.values(settingOptions).map((itm: SettingItem) => (
          <SettingOptionCard
            key={`SettingOptionCard-${itm.title}`}
            data={itm}
          />
        ))}
        <View style={styles.paddingBottomView} />
        <Button label="Logout" onPress={onLogoutHandler} />
      </ScrollView>
    </View>
  );
});

export default SettingComponent;
