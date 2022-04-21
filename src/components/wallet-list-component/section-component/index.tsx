import React from 'react';
import { Text, View } from 'react-native';
import { AccountSectionStyle } from '../../../types';
import useMergeStyles from './styles';

export type SectionComponentProps = {
  title: string;
  style?: AccountSectionStyle;
};

const SelectionComponent = (props: SectionComponentProps) => {
  const { title, style } = props;
  const styles = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.sectionTextStyle}>{title}</Text>
    </View>
  );
};

export default React.memo(SelectionComponent);
