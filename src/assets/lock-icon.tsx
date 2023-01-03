import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const LockIcon: React.FC<Props> = ({ width, height, color = '#1B1B1B' }) => {
  return (
    <SvgCss
      xml={`<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 5.99662H5.5C4.74911 5.95468 4.01212 6.21158 3.45002 6.71122C2.88792 7.21087 2.54638 7.91266 2.5 8.66329V11.9966C2.54638 12.7473 2.88792 13.449 3.45002 13.9487C4.01212 14.4483 4.74911 14.7052 5.5 14.6633H11.5C12.2509 14.7052 12.9879 14.4483 13.55 13.9487C14.1121 13.449 14.4536 12.7473 14.5 11.9966V8.66329C14.4536 7.91266 14.1121 7.21087 13.55 6.71122C12.9879 6.21158 12.2509 5.95468 11.5 5.99662Z" stroke=${color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.8307 6.0026V4.66927C11.8307 3.78522 11.4795 2.93738 10.8544 2.31226C10.2293 1.68713 9.38145 1.33594 8.4974 1.33594C7.61334 1.33594 6.76549 1.68713 6.14037 2.31226C5.51525 2.93738 5.16406 3.78522 5.16406 4.66927V6.0026" stroke=${color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `}
      width={width ?? 20}
      height={height ?? 20}
    />
  );
};

export { LockIcon };
