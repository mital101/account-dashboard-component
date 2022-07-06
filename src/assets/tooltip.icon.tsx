import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

const TooltipIcon: React.FC<Props> = ({ width, height }) => {
  return (
    <SvgCss
      xml={`<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2092_12555)">
      <path d="M6 12.5C9.31371 12.5 12 9.81371 12 6.5C12 3.18629 9.31371 0.5 6 0.5C2.68629 0.5 0 3.18629 0 6.5C0 9.81371 2.68629 12.5 6 12.5Z" fill="#DDD9E4"/>
      <path d="M4.254 4.7C4.39506 4.299 4.67349 3.96086 5.03997 3.74548C5.40645 3.5301 5.83734 3.45136 6.2563 3.52323C6.67527 3.59509 7.05529 3.81291 7.32904 4.13812C7.6028 4.46332 7.75263 4.87491 7.752 5.3C7.752 6.5 5.952 7.1 5.952 7.1" stroke="#3E2D68" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 9.5H6.00397" stroke="#3E2D68" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_2092_12555">
      <rect width="12" height="12" fill="white" transform="translate(0 0.5)"/>
      </clipPath>
      </defs>
      </svg>
  `}
      width={width}
      height={height}
    />
  );
};
export { TooltipIcon };
