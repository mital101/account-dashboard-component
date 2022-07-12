import { SettingItem } from '../types';
import React, { useContext } from 'react';
import {
  StyleProp,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import { ThemeContextData } from 'react-native-theme-component/src/theme-context/context';
import { ArrowRightIcon } from '../../../assets/arrow-right.icon';

export type SettingOptionCardStyles = {
  containerStyle?: StyleProp<ViewStyle>;
};

export type SettingOptionCardProps = {
  data: SettingItem;
};

const SettingOptionCard = ({ data }: SettingOptionCardProps) => {
  const styles = makeStyles(useContext(ThemeContext));

  return (
    <TouchableOpacity onPress={data.onSelect} style={styles.containerStyle}>
      <View style={styles.content}>
        <>{data.icon}</>
        <View style={styles.infoSection}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subTitle}>{data.subTitle}</Text>
        </View>
        <ArrowRightIcon width={15} height={15} color={'#F8981D'} />
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (theme: ThemeContextData) =>
  StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 8,
      marginBottom: 10,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoSection: {
      marginLeft: 10,
      height: '100%',
      justifyContent: 'space-between',
      flex: 1,
    },
    title: {
      fontFamily: theme.fonts.regular,
      fontSize: 14,
      color: '#000000',
    },
    subTitle: {
      fontFamily: theme.fonts.regular,
      fontSize: 10,
      color: '#7F7B82',
    },
  });

export default SettingOptionCard;
