import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const ArrowRightIcon: React.FC<Props> = ({ size, color = 'white' }) => {
  return (
    <SvgCss
      xml={`<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.37619 1L4.229 3.69554L1.37619 6.39107" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `}
      width={size}
      height={size}
    />
  );
};
export { ArrowRightIcon };
