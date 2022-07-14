import { ContactInfoItem } from '../../types';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ThemeContextData } from 'react-native-theme-component/src/theme-context/context';
import { ContactCopyIcon } from '../../../../assets/images';
import Clipboard from '@react-native-clipboard/clipboard';

export type ContactInfoItemParams = {
  data: ContactInfoItem;
};

const ContactInfoItemComponent = ({ data }: ContactInfoItemParams) => {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);

  const copyToClipboard = () => {
    Clipboard.setString(`${data.subTitle}`);
  };

  return (
    <View style={styles.container}>
      <>{<data.icon width={20} height={20} />}</>
      <View style={styles.horizontalPadding} />
      <View style={styles.row}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.subTitle}>{data.subTitle}</Text>
          {data.showCopyToClipboardOption && (
            <TouchableOpacity onPress={copyToClipboard}>
              <ContactCopyIcon width={20} height={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const makeStyles = ({ colors, fonts }: ThemeContextData) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 15,
      paddingVertical: 2,
      marginVertical: 10,
      width: '100%',
      borderRadius: 8,
      flexDirection: 'row',
    },
    horizontalPadding: {
      width: 12,
    },
    row: { flex: 1 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
    rowWrap: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      color: '#7F7B82',
      fontFamily: fonts.regular,
      fontSize: 12,
    },
    subTitle: {
      maxWidth: '100%',
      fontFamily: fonts.regular,
      fontSize: 12,
      marginTop: 5,
      color: '#1D1C1D',
    },
  });

export default ContactInfoItemComponent;
