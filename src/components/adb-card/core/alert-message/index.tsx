import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BRoundedCloseIcon } from '../../../../assets/rounded-close.icon';
import useMergeStyle, { AlertMessageStyles } from './styles';

export interface IAlertMessage {
    style?: AlertMessageStyles;
    title: string;
    onClose: () => void;
    isVisible:boolean;
}

const AlertMessage:React.FC<IAlertMessage> = (props) => {
    const {style, onClose, isVisible, title} = props
    const styles: AlertMessageStyles = useMergeStyle(style);

    if(!isVisible) return null;
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <TouchableOpacity style={styles.closeIconContainer} onPress={onClose}>
      <BRoundedCloseIcon />
      </TouchableOpacity>
    </View>
  )
}

export default AlertMessage