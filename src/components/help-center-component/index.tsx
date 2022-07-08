import React, { forwardRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  HelpCenterComponentProps,
  HelpOptionItem,
  SupportTypes,
} from './types';
import useMergeStyles from './styles';
import HelpOptionComponent from './components/help-option-card';
import ContactInfoItemComponent from './components/contact-item';
import {
  HelpCenterFAQIcon,
  HelpCenterSubmitTicketIcon,
} from '../../assets/images';
import { contactInfos } from '../../constants/common';

const HelpCenterComponent = forwardRef(({ Root }: HelpCenterComponentProps) => {
  const { props, style } = Root || {};
  const { onSelectFAQs, onSelectSubmitTicket } = props || {};

  const styles = useMergeStyles(style);

  const helpOptions = {
    [SupportTypes.FAQs]: {
      icon: <HelpCenterFAQIcon width={50} height={40} />,
      title: 'Find an answer quickly',
      subTitle:
        'Everything you need to know about UnionDigital Bank. See all Frequently Asked Questions (FAQs).',
      onSelect: onSelectFAQs,
    },
    [SupportTypes.SubmitTicket]: {
      icon: <HelpCenterSubmitTicketIcon width={50} height={30} />,
      title: 'Submit a ticket',
      subTitle:
        'Report your concern by leaving a message and we’ll respond as soon as we can.',
      onSelect: onSelectSubmitTicket,
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Text style={styles.pageTitle}>Help Center</Text>
        <Text style={styles.subTitle}>
          We’re here to help you for better understanding.
        </Text>
        {Object.values(helpOptions).map((val: HelpOptionItem) => (
          <HelpOptionComponent key={val.title} data={val} />
        ))}
        <Text style={styles.title}>Contact us</Text>
        <View style={styles.contactContainer}>
          {contactInfos.map((itm) => (
            <ContactInfoItemComponent data={itm} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
});

export default HelpCenterComponent;
