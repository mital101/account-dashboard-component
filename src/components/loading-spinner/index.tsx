import React from 'react';
import * as Progress from 'react-native-progress';

export type LoadingSpinnerProps = {
  props?: {
    size?: number;
    indeterminate?: boolean;
    borderWidth?: number;
    borderColor?: string;
  };
};

const LoadingSpinner = ({ props }: LoadingSpinnerProps) => {
  const {size = 60, indeterminate = true, borderWidth = 6, borderColor =  '#3E2D68'} = props || {};

  return (
    <Progress.Circle size={size} indeterminate={indeterminate} borderWidth={borderWidth} borderColor={borderColor} />
  );
};

export default LoadingSpinner;
