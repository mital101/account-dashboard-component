import { ReportCardComponentProps } from './types';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import useMergeStyles from './styles';
import { Button, RadioButtonGroup, RadioButtonItem } from 'react-native-theme-component';
import AlertModal from '../../alert-model';
import { CardReport } from '../../../types';

const cardReportOptions: CardReport[] = [
  {id: '1', reason: 'My virtual card has been compromised.', reasonCode: 'LOST'},
  {id: '2', reason: 'My UnionDigital Bank account got hacked.', reasonCode: 'LOST'},
  {id: '3', reason: 'There are unauthorized transactions being done on my UnionDigital Bank Virtual Card.', reasonCode: 'LOST'},
  {id: '4', reason: 'My phone has been stolen.', reasonCode: 'LOST'},
];

const ReportCardComponent = ({
  props,
  style,
}: ReportCardComponentProps) => {
  const styles = useMergeStyles(style);
  const { onConfirm, initStatus, isShowConfirmALert, onCancelReportCard, onDismissAlert } = props;
  const [selectedReason, setSelectedReason] = useState<string>();

  const onSelectedReason = (values: string) => {
    setSelectedReason(values);
  }

  const convertToListRadioBtn = (listReportOptions: CardReport[]): RadioButtonItem[] => {
    const listOptions: RadioButtonItem[] = [];

    listReportOptions.forEach((o: CardReport) => {
      listOptions.push({
        title:  o.reason,
        value: o.id
      })
    })

    return listOptions;
  }

  const onConfirmHanlder = () => {
    const indexSelectedOptions = cardReportOptions.findIndex(itm => itm.id === selectedReason);
    if(indexSelectedOptions >= 0) {
      onConfirm(cardReportOptions[indexSelectedOptions]);
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{'Report A Card Issue'}</Text>
      <Text style={styles.pageSubtite}>{'What issue would you like to report?'}</Text>
      <View style={styles.content}>
      <RadioButtonGroup
        data={convertToListRadioBtn(cardReportOptions)}
        onSelect={onSelectedReason}
        selectedValue={selectedReason}
        style={{
          container: {
            marginBottom: 10
          },
          rowInfo: {
            justifyContent: 'space-around',
            transform: [{translateX: -10}],
          },
          mainTitle: {
            fontSize: 12,
            fontWeight: 'normal'
          }
        }}
      />
      </View>
      <View style={styles.actionWrapper}>
        <Button
          label="Confirm"
          onPress={onConfirmHanlder}
          isLoading={false}
          disabled={!selectedReason}
          disableColor={'#ECECEC'}
        />
      </View>
      <AlertModal 
        isVisible={isShowConfirmALert} 
        title={'Cancel changes?'}
        onConfirmed={onCancelReportCard}
        onCancel={onDismissAlert} 
        iconColor={'#FBC02D'}
        subtitle={'Do you wish to cancel the changes made? All changes will not be saved once cancelled.'}
        btnLabel={'Yes, cancel the changes made'} 
        secondaryBtnLabel={'No, continue with the changes'}
      />
    </View>
  );
};

export default ReportCardComponent;
