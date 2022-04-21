import { BTickIcon } from '../../../../assets/images';
import React, { ReactNode, useContext } from 'react';
import { TouchableOpacity, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import useMergeStyle from './styles';

export type CheckBoxStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  boxContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  subLabelTextStyle?: StyleProp<TextStyle>;
};

interface ComponentProps {
  isSelected: boolean;
  activeColor?: string;
  inActiveColor?: string;
  checkedIcon?: ReactNode;
  label: string;
  subLabel?: string;
  style?: CheckBoxStyle;
  onPress: () => void;
}

export type CheckBoxProps = ComponentProps;

const CheckBox = (props: CheckBoxProps) => {
  const {
    isSelected,
    activeColor,
    inActiveColor,
    checkedIcon,
    label,
    subLabel,
    style,
    onPress,
  } = props;
  const { colors } = useContext(ThemeContext);
  const backgroundColor = isSelected ? activeColor ?? colors.primaryColor : 'white';
  const borderColor = isSelected ? colors.primaryColor : inActiveColor ?? '#D1D5DB';
  const styles: CheckBoxStyle = useMergeStyle(style);

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.containerStyle} onPress={onPress}>
      <View
        style={[
          styles.boxContainerStyle,
          {
            backgroundColor,
            borderColor,
          },
        ]}
      >
        {checkedIcon ?? <BTickIcon width={16} height={16} />}
      </View>
      <Text style={styles.labelTextStyle}>{label}</Text>
      {subLabel && <Text style={styles.subLabelTextStyle}>{` (${subLabel})`}</Text>}
    </TouchableOpacity>
  );
};

export default CheckBox;
