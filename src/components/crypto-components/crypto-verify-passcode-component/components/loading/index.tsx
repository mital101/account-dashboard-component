import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { ThemeContext } from 'react-native-theme-component';

type LoadingTransactionProps = {
  percent?: number;
  label?: string;
  color?: string;
  width?: number;
};

const LoadingTransaction: React.FC<LoadingTransactionProps> = ({
  percent = 0,
  color,
  width,
  label,
}) => {
  const { fonts, colors } = useContext(ThemeContext);
  const diameter = width ? width / 2 : 100;
  const radius = diameter / 2;
  const circleStrokeWidth = 7;
  const viewBox = radius + circleStrokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const strokeColor = color || colors.primaryButtonColor || '#000000';
  const activeStrokeSizePercentage =
    (circleCircumference * (100 - percent)) / 100;

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    valueContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    valueProgress: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: strokeColor,
    },
  });

  return (
    <View style={styles.container}>
      <Svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${viewBox * 2} ${viewBox * 2}`}
      >
        <G rotation={'-90'} origin={`${viewBox}, ${viewBox}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={strokeColor}
            strokeWidth={circleStrokeWidth}
            r={radius}
          />
          <Circle
            cx="50%"
            cy="50%"
            strokeWidth={circleStrokeWidth}
            stroke={'#E7DBF5'}
            r={radius}
            strokeDasharray={circleCircumference}
            strokeDashoffset={activeStrokeSizePercentage}
          />
        </G>
      </Svg>
      <View style={[StyleSheet.absoluteFillObject, styles.valueContainer]}>
        <Text style={styles.valueProgress}>{`${label}`}</Text>
      </View>
    </View>
  );
};

export default LoadingTransaction;
