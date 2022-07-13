import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const ContactGlobeIcon: React.FC<Props> = ({
  width,
  height,
  color = '#F8981D',
}) => {
  return (
    <SvgCss
      xml={`<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.50008 15.5834C12.4121 15.5834 15.5834 12.412 15.5834 8.50002C15.5834 4.588 12.4121 1.41669 8.50008 1.41669C4.58806 1.41669 1.41675 4.588 1.41675 8.50002C1.41675 12.412 4.58806 15.5834 8.50008 15.5834Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1.41675 8.5H15.5834" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.50008 1.41669C10.2718 3.35635 11.2787 5.87354 11.3334 8.50002C11.2787 11.1265 10.2718 13.6437 8.50008 15.5834C6.72834 13.6437 5.72146 11.1265 5.66675 8.50002C5.72146 5.87354 6.72834 3.35635 8.50008 1.41669V1.41669Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `}
      width={width ?? 19}
      height={height ?? 14}
    />
  );
};

export { ContactGlobeIcon };
