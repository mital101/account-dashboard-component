import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const BackIconArrow: React.FC<Props> = ({ width, height, color = '#5E0CBC' }) => {
  return (
    <SvgCss
      xml={`<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.96094 1L0.997765 7.96317L7.96094 14.9263" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`}
      width={width ?? 19}
      height={height ?? 14}
    />
  );
};

export { BackIconArrow };
