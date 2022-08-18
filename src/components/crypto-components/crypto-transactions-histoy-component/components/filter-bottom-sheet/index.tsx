import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
  BottomSheet,
  Button,
  CheckBox,
  DatePicker,
} from 'react-native-theme-component';
import useMergeStyles from './styles';
import {
  FilterTransactionModalProps,
  FilterTransactionModalStyles,
} from './types';
import moment from 'moment';

const FilterTransactionModal = ({
  style,
  isVisible,
  onClose,
  initValue,
  dataTransactionStatus,
  onSubmitFilter,
}: FilterTransactionModalProps) => {
  const styles: FilterTransactionModalStyles = useMergeStyles(style);
  const initStatusIndex = initValue
    ? dataTransactionStatus.findIndex((s) => s.id === initValue.id)
    : 0;
  const [selectedStatusIndex, setSelectedStatusIndex] =
    useState<number>(initStatusIndex);
  const [isSelectedAllTime, setIsSelectedAllTime] = useState<boolean>(true);
  const [isOpenDateTimePicker, setIsOpenDateTimePicker] =
    useState<boolean>(false);
  const [isSelectFromDate, setIsSelectFromDate] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const isValidToSubmit = !!isSelectedAllTime || (fromDate && toDate);

  const onSelectAllTime = () => {
    setIsSelectedAllTime(!isSelectedAllTime);
  };

  const onSelectFromDate = () => {
    setIsSelectFromDate(true);
    setIsOpenDateTimePicker(true);
  };

  const onSelectToDate = () => {
    setIsSelectFromDate(false);
    setIsOpenDateTimePicker(true);
  };

  const onChangeDate = (date: Date) => {
    if (isSelectFromDate) {
      setFromDate(date);
      setIsSelectedAllTime(false);
    } else {
      setToDate(date);
      setIsSelectedAllTime(false);
    }
  };

  const onReset = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedStatusIndex(0);
    setIsSelectedAllTime(true);
  };

  const onSubmitValues = () => {
    onSubmitFilter &&
      onSubmitFilter(
        dataTransactionStatus[selectedStatusIndex],
        isSelectedAllTime,
        fromDate,
        toDate
      );
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
          <Text style={styles.title}>Filter</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeTitle}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.statusSection}>
            <Text style={styles.statusTitle}>Status</Text>
            <View style={styles.rowStatusBtn}>
              {dataTransactionStatus.map((itm, index) => (
                <TouchableOpacity
                  style={[
                    styles.statusBtn,
                    selectedStatusIndex === index && styles.statusBtnSelected,
                  ]}
                  key={itm.id}
                  onPress={() => setSelectedStatusIndex(index)}
                >
                  <Text style={styles.statusLabel}>{itm.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.startEndDateTitle}>Start and End Date</Text>
          <View style={styles.row}>
            <Text style={styles.allTimeTitle}>All-time</Text>
            <CheckBox
              title={''}
              isSelected={isSelectedAllTime}
              onChanged={onSelectAllTime}
              style={{
                containerStyle: styles.rowSelect,
                selectedBoxStyle: styles.selectedBox,
                unSelectedBoxStyle: styles.unSelectedBox,
                titleStyle: styles.titleRowSelect,
              }}
            />
          </View>
        </View>
        <View style={styles.datePickerSection}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.selectDateBtn}
              onPress={onSelectFromDate}
            >
              <Text style={styles.selectDateTitle}>
                {fromDate && !isSelectedAllTime
                  ? moment(fromDate).format('MM/DD/YYYY')
                  : 'MM / DD / YYYY'}
              </Text>
            </TouchableOpacity>
            <View style={styles.horizontalMargin} />
            <TouchableOpacity
              style={styles.selectDateBtn}
              onPress={onSelectToDate}
            >
              <Text style={styles.selectDateTitle}>
                {toDate && !isSelectedAllTime
                  ? moment(toDate).format('MM/DD/YYYY')
                  : 'MM / DD / YYYY'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.actionsView}>
          <Button
            label={'Confirm'}
            disabled={!isValidToSubmit}
            disableColor={'#BAB7BB'}
            onPress={onSubmitValues}
          />
          <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
            <Text style={styles.resetTitle}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DatePicker
        isVisible={isOpenDateTimePicker}
        pickedDate={isSelectFromDate ? fromDate : toDate}
        minDate={isSelectFromDate ? undefined : fromDate}
        onClose={() => setIsOpenDateTimePicker(false)}
        onChange={onChangeDate}
      />
    </BottomSheet>
  );
};

export default FilterTransactionModal;
