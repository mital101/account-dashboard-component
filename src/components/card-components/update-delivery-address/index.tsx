import { UpdateDeliveryAddressComponentProps } from './types';
import React, { useState } from 'react';
import { View } from 'react-native';
import useMergeStyles from './styles';
import AlertModal from '../../alert-model';
import { AddressDetailsComponent } from 'customer-invoke-component';

const UpdateDeliveryAddressComponent = ({
  props,
  style,
}: UpdateDeliveryAddressComponentProps) => {
  const styles = useMergeStyles(style);
  const [isShowSuccessUpdatedDeliveryAddressAlert, setIsShowSuccessUpdatedDeliveryAddressAlert] = useState<boolean>(false);
  const {onSuccess} = props;

  return (
    <View style={styles.container}>
      <AddressDetailsComponent header={{
        data: {
          id: '',
          title: 'Edit delivery address',
          subTitle: 'Enter details for the receiving address. Keep in mind that your saved present address will not change even when you updated the receiving delivery address for your physical card purchase.',
          progress: 0
        },
        style: undefined
      }} 
      onContinue={() => setIsShowSuccessUpdatedDeliveryAddressAlert(true) }   
      isEditMode={true}   
      />


      <AlertModal 
        isVisible={isShowSuccessUpdatedDeliveryAddressAlert} 
        title={'Successfully updated'}
        subtitle={'Your receiving address has been successfully updated.'}
        onConfirmed={() => { 
          setIsShowSuccessUpdatedDeliveryAddressAlert(false);
          onSuccess();
        }}
        iconColor={'#F8981D'}
        btnLabel={'OK'} 
      />    
    </View>
  );
};

export default UpdateDeliveryAddressComponent;
