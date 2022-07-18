import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type SelectTransactionTypeModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initValue?: string;
  style?: SelectTransactionTypeModalStyles;
};

export type SelectTransactionTypeModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const SelectTransactionTypeModal = ({
  style,
  isVisible,
  onClose,
  initValue,
}: SelectTransactionTypeModalProps) => {
  const styles: SelectTransactionTypeModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>Hi welcome! Please pick your preferred language</Text>
      </View>
    </BottomSheet>
  );
};

export default SelectTransactionTypeModal;
