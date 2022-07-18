import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { BottomSheet, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type FilterTransactionModalProps = {
  isVisible: boolean;
  onClose: () => void;
  initValue?: string;
  style?: FilterTransactionModalStyles;
};

export type FilterTransactionModalStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
};

const FilterTransactionModal = ({
  style,
  isVisible,
  onClose,
  initValue,
}: FilterTransactionModalProps) => {
  const styles: FilterTransactionModalStyles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  return (
    <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
      <View style={styles.containerStyle}>
        <Text style={styles.modalTitleStyle}>Hi welcome! Please pick your preferred language</Text>
      </View>
    </BottomSheet>
  );
};

export default FilterTransactionModal;
