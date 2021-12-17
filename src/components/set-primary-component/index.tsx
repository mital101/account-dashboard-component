import { BTickIcon } from '../../assets/images';
import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SetPrimaryComponentStyle } from '../../types';
import useMergeStyles from './styles';

export type SetPrimaryComponentProps = {
  i18n?: any;
  isSelected: boolean;
  disabled: boolean;
  style?: SetPrimaryComponentStyle;
  setPrimaryLabel?: string;
  tickIcon?: ReactNode;
  onPressed: () => void;
};

const SetPrimaryComponent = (props: SetPrimaryComponentProps) => {
  const { isSelected, style, setPrimaryLabel, tickIcon, onPressed, disabled, i18n } = props;
  const styles = useMergeStyles(style);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.containerStyle}
      activeOpacity={1}
      onPress={onPressed}
    >
      <View style={styles.checkBoxStyle}>{isSelected && (tickIcon ?? <BTickIcon />)}</View>
      <Text style={styles.titleTextStyle}>
        {setPrimaryLabel ?? i18n?.t('wallet_component.lbl_set_as_primary') ?? 'Set as primary'}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(SetPrimaryComponent);
