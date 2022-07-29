import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { defaultsDeep } from 'lodash';
import { useContext } from 'react';
import { ThemeContext } from 'react-native-theme-component';
import { ContactCopyIcon } from '../../assets/images';
import Clipboard from '@react-native-clipboard/clipboard';

export type RowInfoProps = {
  props: {
    title: string;
    value: string;
    copyable?: boolean;
  };
  style?: RowInfoStyle;
};

export type RowInfoStyle = {
  container?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  value?: StyleProp<TextStyle>;
  rowBetween?: StyleProp<ViewStyle>;
};

const RowInfo = ({ props, style }: RowInfoProps) => {
  const { title, value, copyable } = props || {};
  const styles = useMergeStyles(style);

  const copyToClipboard = (value: string) => {
    Clipboard.setString(`${value}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rowBetween}>
        <Text style={styles.value}>{value}</Text>

        {copyable && (
          <TouchableOpacity onPress={() => copyToClipboard(value)}>
            <ContactCopyIcon width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const useMergeStyles = (style?: RowInfoStyle): RowInfoStyle => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      marginBottom: 15,
    },
    title: {
      color: '#7F7B82',
      fontSize: 12,
      fontFamily: fonts.regular,
    },
    value: {
      color: '#1D1C1D',
      fontSize: 14,
      fontFamily: fonts.regular,
      maxWidth: '85%',
      lineHeight: 27,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default RowInfo;
