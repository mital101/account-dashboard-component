import { ReviewCheckoutDetailsComponentProps } from './types';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import useMergeStyles from './styles';
import AlertModal from '../../alert-model';
import { EditPencilIcon } from '../../../assets/edit-pencil.icon';
import { InformationIcon } from '@banking-component/wallet-component/src/assets/information2.icon';
import { Button } from 'react-native-theme-component';

const ReviewCheckoutDetailsComponent = ({
  props,
  style,
}: ReviewCheckoutDetailsComponentProps) => {
  const styles = useMergeStyles(style);
  const {onConfirm, isShowCancelAlert, onCancelReportCard, onDismissAlert, onCashIn, onEditDeliveryAddress} = props;
  const [isShowEstimateDateTooltip, setIsShowEstimateDateTooltip] = useState<boolean>(false);
  const [isShowCashInAlert, setIsShowCashInAlert] = useState<boolean>(false);

  const onCashInSelect = () => {
    // setIsShowCashInAlert(false);
    onCashIn();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>{'Review checkout details'}</Text>
        <Text style={styles.subTitle}>{'Please make sure all details displayed below are correct before you proceed.'}</Text>
        <View style={styles.cardContainer}>
          <View style={styles.rowBetween}>
            <View style={styles.leftSection}>
              <Text style={styles.cardTitle}>Delivery address</Text>
              <Text style={styles.cardSubTitle}>26 Payapa St., Sto. Cristobal, Caloocan City, Metro Manila, Philippines 1800</Text>
            </View>
            <TouchableOpacity onPress={onEditDeliveryAddress}>
              <EditPencilIcon size={25}/>
            </TouchableOpacity>
          </View>
          
          <View style={styles.noteContainer}>
            <View style={styles.row}>
              <Text style={styles.noteCardContent}><Text style={styles.noteCardTitle}>NOTE: </Text>The pre-filled delivery address was based on your entered present address in the registration process. Your saved present address will not change even when you updated the receiving delivery address for your physical card purchase.</Text>
            </View>
           </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.rowBetween}>
            <View style={styles.leftSection}>
              <Text style={styles.cardTitle}>Estimated delivery schedule</Text>
              <Text style={styles.cardSubTitle}>Receive by Dec 14 - 20, 2021</Text>
            </View>
            <TouchableOpacity onPress={() => setIsShowEstimateDateTooltip(true)}>
             <InformationIcon size={25}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.orderTitleSection}>
          <Text style={styles.orderTitle}>Order details</Text>
          <Text style={styles.noteContent}><Text style={styles.noteTitle}>Note: </Text>Your UD Bank Account will be debited once you proceed.</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.rowBetween}>
            <View style={styles.leftSection}>
              <Text style={styles.cardTitle}>Delivery amount - Metro Manila rate</Text>
              <Text style={styles.cardMoney}>₱ 200.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Button label='Confirm Transaction' onPress={onConfirm}/>
        <AlertModal 
          isVisible={isShowCancelAlert} 
          title={'Cancel Transaction'}
          onConfirmed={onCancelReportCard}
          onCancel={onDismissAlert} 
          iconColor={'#F8981D'}
          subtitle={`Do you wish to cancel this payment?
            All details will be discarded if you cancel this transaction.`}
          btnLabel={'Yes, cancel transaction'} 
          secondaryBtnLabel={'No, continue transaction'}
        />
        <AlertModal 
          isVisible={isShowEstimateDateTooltip} 
          title={'Estimated delivery schedule'}
          iconColor={'#7C6D98'}
          subtitle={`Please expect delivery of your card within 5-10 banking days, depending on your location: \n\nMetro Manila: 3-5 banking days\nProvincial: 5-10 banking days\n\nMake sure you put your exact address to avoid any delivery delays or mishaps.`}
          btnLabel={'OK'} 
          onConfirmed={() => setIsShowEstimateDateTooltip(false)} 
        />
        <AlertModal 
          isVisible={isShowCashInAlert} 
          title={'Insufficient fund'}
          onConfirmed={onCashInSelect}
          onCancel={() => setIsShowCashInAlert(false)} 
          iconColor={'#CC444B'}
          subtitle={`You have insufficient fund in your wallet to continue this transaction.`}
          btnLabel={'Cash In'} 
          secondaryBtnLabel={'Maybe next time'}
        />
    </View>
  );
};

export default ReviewCheckoutDetailsComponent;
