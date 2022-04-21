import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  height?: number;
  color?: string;
}

const DashlineIcon: React.FC<Props> = ({ height, color = '#D8D8D8' }) => {
  return (
    <SvgCss
      xml={`<svg width="292" height="1" viewBox="0 0 292 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="0.5" x2="292" y2="0.5" stroke="${color}" stroke-dasharray="2 2"/>
      </svg>
      `}
      height={height}
      width='100%'
      preserveAspectRatio='xMinYMin slice'
    />
  );
};
export { DashlineIcon };
