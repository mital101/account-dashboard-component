import React, { ReactNode } from 'react';
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
import { ArrowRightIcon } from '@banking-component/wallet-component/src/assets/arrow-right.icon';

export type RowSelectionProps = {
  props: {
    title: string;
    subtitle?: string;
    value?: string;
    onPress?: () => void;
    rightIcon?: ReactNode;
    disabled?: boolean;
  };
  style?: RowSelectionStyle;
};

export type RowSelectionStyle = {
  container?: StyleProp<ViewStyle>;
  verticalHeight?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  subtitle?: StyleProp<TextStyle>;
  value?: StyleProp<TextStyle>;
  row?: StyleProp<ViewStyle>;
  rowBetween?: StyleProp<ViewStyle>;
};

const RowSelection = ({ props, style }: RowSelectionProps) => {
  const { title, subtitle, onPress, rightIcon, disabled = false, value } = props || {};
  const styles = useMergeStyles(disabled, style);

  const renderContent = () => <View style={styles.rowBetween}>
  <View>
   <Text style={styles.title}>{title}</Text>
   <View style={styles.verticalHeight} />
   <View style={styles.row}>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={[styles.subtitle, styles.value]}>{value}</Text>
   </View>
  </View>
  {rightIcon ? <>{rightIcon}</> : <ArrowRightIcon width={12} height={15} color={disabled ? '#CCCCCC' : '#020000'} />}
</View>

  return onPress && !disabled ? (
    <TouchableOpacity style={styles.container} onPress={onPress || undefined}>
      {renderContent()}
    </TouchableOpacity>
  ) : <View style={styles.container}>{renderContent()}</View>;
};

const useMergeStyles = (isDisabled: boolean, style?: RowSelectionStyle): RowSelectionStyle => {
  const { fonts } = useContext(ThemeContext);

  const defaultStyles = StyleSheet.create({
    container: {
      marginBottom: 15,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#ECECEC',
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: isDisabled ? '#ECECEC' : '#FFFFFF'
    },
    title: {
      color: isDisabled ? '#CCCCCC' : '#020000',
      fontSize: 12,
      fontFamily: fonts.medium,
      lineHeight: 17,
    
    },
    subtitle: {
      color: isDisabled ? '#CCCCCC' : '#676666',
      fontSize: 10,
      fontFamily: fonts.regular,
    },
    value: {
      fontFamily: fonts.medium,
    },
    row: {
      flexDirection: 'row'
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    verticalHeight: {
      height: 7
    }
  });
  return defaultsDeep(style, defaultStyles);
};

export default RowSelection;
