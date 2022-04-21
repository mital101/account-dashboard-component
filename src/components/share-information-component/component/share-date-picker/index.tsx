import { BCalendar } from '../../../../assets/images';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { DatePicker } from 'react-native-theme-component';
import useMergeStyle from './styles';

export type ShareDatePickerStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  dateTextStyle?: StyleProp<TextStyle>;
};

export type ShareDatePickerProps = {
  label: string;
  date: Date;
  maxDate: Date;
  format?: string;
  onSelected: (date: Date) => void;
  style?: ShareDatePickerStyle;
};

const ShareDatePicker = (props: ShareDatePickerProps) => {
  const { label, date, maxDate, onSelected, format, style } = props;
  const _format = format ?? 'DD-MM-YYYY';
  const [isShowDatePicker, setShowDatePicker] = useState(false);
  const styles: ShareDatePickerStyle = useMergeStyle(style);

  return (
    <>
      <View style={styles.containerStyle}>
        <Text style={styles.labelTextStyle}>{label}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.contentContainerStyle}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateTextStyle}>{moment(date).format(_format)}</Text>
          <BCalendar size={18} />
        </TouchableOpacity>
      </View>
      <DatePicker
        pickedDate={date}
        isVisible={isShowDatePicker}
        maxDate={maxDate}
        onChange={(_date) => {
          setShowDatePicker(false);
          onSelected(_date);
        }}
        onClose={() => setShowDatePicker(false)}
      />
    </>
  );
};

export default ShareDatePicker;
