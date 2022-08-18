import React, { useState } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { BottomSheet, Button, CheckBox } from 'react-native-theme-component';
import useMergeStyles from './styles';
import { TransactionTypes } from '../../types';

export type SelectTransactionTypeModalProps = {
  isVisible: boolean;
  onClose: () => void;
  style?: SelectTransactionTypeModalStyles;
  initialValue?: TransactionTypes[];
  onSelectTransactionTypes?: (types: TransactionTypes[]) => void;
  dataTransactionTypes: TransactionTypes[];
};

export type SelectTransactionTypeModalStyles = {
  container?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  closeTitle?: StyleProp<TextStyle>;
  titleRowSelect?: StyleProp<TextStyle>;
  header?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  rowSelect?: StyleProp<ViewStyle>;
  selectedBox?: StyleProp<ViewStyle>;
  unSelectedBox?: StyleProp<ViewStyle>;
  actionsView?: StyleProp<ViewStyle>;
};

const SelectTransactionTypeModal = ({
  style,
  isVisible,
  onClose,
  dataTransactionTypes,
  onSelectTransactionTypes,
}: SelectTransactionTypeModalProps) => {
  const styles: SelectTransactionTypeModalStyles = useMergeStyles(style);
  const [selectedTypes, setSelectedTypes] = useState<TransactionTypes[]>([]);
  const [selectedAllTypes, setSelectedAllTypes] = useState<boolean>(true);
  const isValidToSubmit = !!selectedAllTypes || selectedTypes.length > 0;

  const onSelectItem = (id?: string) => {
    const cloneSelectedTypes = [...selectedTypes];
    const indexSelected = cloneSelectedTypes.findIndex((i) => i.id === id);
    if (indexSelected >= 0) {
      cloneSelectedTypes.splice(indexSelected, 1);
    } else {
      cloneSelectedTypes.push(
        dataTransactionTypes[dataTransactionTypes.findIndex((t) => t.id === id)]
      );
    }
    setSelectedAllTypes(false);
    setSelectedTypes(cloneSelectedTypes);
    if (cloneSelectedTypes.length === dataTransactionTypes.length) {
      setSelectedAllTypes(true);
    }
  };

  const onSelectAllTypes = () => {
    if (!selectedAllTypes) {
      setSelectedTypes(dataTransactionTypes);
    } else {
      setSelectedTypes([]);
    }
    setSelectedAllTypes(!selectedAllTypes);
  };

  const onSelect = () => {
    onSelectTransactionTypes && onSelectTransactionTypes(selectedTypes);
    onClose();
  };

  return (
    <BottomSheet
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      isVisible={isVisible}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Type of Transaction</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeTitle}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <CheckBox
            title={'All type of transactions'}
            isSelected={selectedAllTypes}
            onChanged={onSelectAllTypes}
            style={{
              containerStyle: styles.rowSelect,
              selectedBoxStyle: styles.selectedBox,
              unSelectedBoxStyle: styles.unSelectedBox,
              titleStyle: styles.titleRowSelect,
            }}
          />
          {dataTransactionTypes.map((itm) => (
            <CheckBox
              key={itm.id}
              title={itm.title}
              isSelected={
                selectedTypes.some((i) => i.id === itm.id) || selectedAllTypes
              }
              onChanged={() => onSelectItem(itm.id)}
              style={{
                containerStyle: styles.rowSelect,
                selectedBoxStyle: styles.selectedBox,
                unSelectedBoxStyle: styles.unSelectedBox,
                titleStyle: styles.titleRowSelect,
              }}
            />
          ))}
        </View>
        <View style={styles.actionsView}>
          <Button
            label={'Select'}
            onPress={onSelect}
            disabled={!isValidToSubmit}
            disableColor={'#BAB7BB'}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default SelectTransactionTypeModal;
