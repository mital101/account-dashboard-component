import { HelpOptionItem } from '../../types';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowRightIcon } from '../../../../assets/images';
import { ThemeContext } from 'react-native-theme-component';
import { ThemeContextData } from 'react-native-theme-component/src/theme-context/context';

export type HelpOptionComponentParams = {
  data: HelpOptionItem;
};

const HelpOptionComponent = ({ data }: HelpOptionComponentParams) => {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);

  return (
    <TouchableOpacity style={styles.container} onPress={data.onSelect}>
      <>{data.icon}</>
      <View style={styles.row}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{data.title}</Text>
          <ArrowRightIcon width={15} height={15} color={'#F8981D'} />
        </View>
        <View style={styles.rowWrap}>
          <Text style={styles.subTitle}>{data.subTitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = ({ fonts }: ThemeContextData) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 15,
      paddingVertical: 20,
      marginVertical: 10,
      width: '100%',
      borderRadius: 8,
      flexDirection: 'row',
    },
    row: { flex: 1 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
    rowWrap: { flexWrap: 'wrap' },
    title: {
      color: '#020000',
      fontFamily: fonts.semiBold,
      fontSize: 16,
    },
    subTitle: {
      maxWidth: '100%',
      fontFamily: fonts.regular,
      fontSize: 10,
      marginVertical: 12,
      color: '#7F7B82',
    },
  });

export default HelpOptionComponent;
