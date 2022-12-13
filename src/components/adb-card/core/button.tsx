import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { colors, palette } from '../../assets';

interface IButton {
  background?: string;
  label: string;
  onPress?: () => void;
  labelColor?: string;
}
const Button: React.FC<IButton> = (props: IButton) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, { backgroundColor: props.background ?? '#1b1b1b' }]}
    >
      <Text style={[styles.label, { color: props.labelColor ?? '#ffffff' }]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 100,
    padding: 16,
    borderWidth: 3,
    borderColor: '#1b1b1b',
  },
  label: {
    // ...palette.subtitle,
    fontSize: 14,
    textAlign: 'center',
  },
});
