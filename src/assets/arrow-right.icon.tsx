import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowRightIcon: React.FC<Props> = ({ width, height, color = 'white' }) => {
  return (
    <SvgCss
      xml={`<svg width="19" height="19" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.52344 3.33594L14.0015 8.0026L9.52344 12.6693" stroke="#FCFCFC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="13.0703" y1="8.10156" x2="2.74827" y2="8.10156" stroke="#FCFCFC" stroke-width="1.5" stroke-linecap="round"/>
      </svg>      
      `}
      width={width}
      height={height}
    />
  );
};
export { ArrowRightIcon };
