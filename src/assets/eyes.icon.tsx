import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

// const xml = ``;
//
// const EyesIcon: React.FC<Props> = ({ width, height, color="#DDD9E4" }) => {
//   return <SvgCss xml={xml} width={width} height={height} fill={'white'} />;
// };

const EyesIcon: React.FC<Props> = ({ width, height,color="#DDD9E4" }) => {
  return (
    <SvgCss
      xml={`<?xml version="1.0" encoding="UTF-8"?>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2092_12567)">
      <path d="M0.75 9C0.75 9 3.75 3 9 3C14.25 3 17.25 9 17.25 9C17.25 9 14.25 15 9 15C3.75 15 0.75 9 0.75 9Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_2092_12567">
      <rect width="18" height="18" fill="white"/>
      </clipPath>
      </defs>
      </svg>`}
      width={width}
      height={height}
    />
  );
};
export { EyesIcon };
