import { BPlusIcon } from '../../../assets/images';
import React, { ReactNode, useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { LinkAccountStyle } from '../../../types';
import useMergeStyles from './styles';
import { ThemeContext } from 'react-native-theme-component';

export type LinkAccountComponentProps = {
  onLinkAccountPressed?: () => void;
  addIcon?: ReactNode;
  style?: LinkAccountStyle;
};

const LinkAccountComponent = (props: LinkAccountComponentProps) => {
  const { style, onLinkAccountPressed, addIcon } = props;
  const { colors, i18n } = useContext(ThemeContext);

  const styles = useMergeStyles(style);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.containerStyle}
      onPress={onLinkAccountPressed}
    >
      {addIcon ?? <BPlusIcon width={20} height={20} color={colors.primaryColor} />}
      <Text style={styles.buttonTextStyle}>
        {i18n?.t('wallets_list_component.btn_link_bank_account') ?? 'Link Bank Account'}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(LinkAccountComponent);
