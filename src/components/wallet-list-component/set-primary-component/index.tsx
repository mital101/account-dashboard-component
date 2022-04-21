import { BTickIcon } from '../../../assets/images';
import React, { ReactNode, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SetPrimaryComponentStyle } from '../../../types';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';

export type SetPrimaryComponentProps = {
  isSelected: boolean;
  disabled: boolean;
  style?: SetPrimaryComponentStyle;
  tickIcon?: ReactNode;
  onPressed: () => void;
};

const SetPrimaryComponent = (props: SetPrimaryComponentProps) => {
  const { isSelected, style, tickIcon, onPressed, disabled } = props;
  const { i18n } = useContext(ThemeContext);
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
        {i18n?.t('wallets_list_component.lbl_set_as_primary') ?? 'Set as primary'}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(SetPrimaryComponent);
