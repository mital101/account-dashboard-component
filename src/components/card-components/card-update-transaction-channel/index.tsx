import { CardUpdateTransactionChannelComponentProps } from './types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Switch, Text, View } from 'react-native';
import useMergeStyles from './styles';
import { Button } from 'react-native-theme-component';
import AlertModal from '../../alert-model';
import RowSelection from '../../row-selection';
import { WalletContext } from '../../../context/wallet-context';

const CardUpdateTransactionChannelComponent = ({
  props,
  style,
}: CardUpdateTransactionChannelComponentProps) => {
  const styles = useMergeStyles(style);
  const { isEnableTransactionChannel } = useContext(WalletContext);
  const { onConfirm, isShowConfirmALert, onCancelUpdateTransactionChannel, onDismissAlert } = props;
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(isEnableTransactionChannel);


  useEffect(() => {
    setStatus(isEnableTransactionChannel);
  }, [isEnableTransactionChannel]);
  
  const onChanged = () => {
    setStatus(!status);
    setIsUpdated(true);
  }

  console.log('CardUpdateTransactionChannelComponent -> isEnableTransactionChannel', isEnableTransactionChannel)
  
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{'Transaction Channels'}</Text>
      <View style={styles.content}>
      <RowSelection props={{
        title: 'E-commerce transactions',
        subtitle: `Enable/disable online transactions`,
        rightIcon: <Switch
          trackColor={{ false: "red", true: "#40916C" }}
          thumbColor={status ? "#FFFFFF" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onChanged}
          value={status}
        />,
      }}
      style={{
        container: {
          backgroundColor: 'transparent',
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderTopWidth: 0,
          paddingHorizontal: 0,
          marginTop: 30
        }
      }}
      
      />
      </View>
      <View style={styles.actionWrapper}>
        <Button
          label="Confirm"
          onPress={() => onConfirm(status)}
          isLoading={false}
          disabled={!isUpdated}
          disableColor={'#ECECEC'}
        />
      </View>
      <AlertModal 
        isVisible={isShowConfirmALert} 
        title={'Cancel changes?'}
        onConfirmed={onCancelUpdateTransactionChannel}
        onCancel={onDismissAlert} 
        iconColor={'#FBC02D'}
        subtitle={'Do you wish to cancel the changes made? All changes will not be saved once cancelled.'}
        btnLabel={'Yes, cancel the changes made'} 
        secondaryBtnLabel={'No, continue with the changes'}
      />
    </View>
  );
};

export default CardUpdateTransactionChannelComponent;
