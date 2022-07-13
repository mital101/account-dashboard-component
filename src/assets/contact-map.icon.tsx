import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const ContactMapIcon: React.FC<Props> = ({
  width,
  height,
  color = '#F8981D',
}) => {
  return (
    <SvgCss
      xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.4001 7.80002C14.4001 12 9.0001 15.6 9.0001 15.6C9.0001 15.6 3.6001 12 3.6001 7.80002C3.6001 6.36786 4.16902 4.99434 5.18172 3.98165C6.19442 2.96895 7.56793 2.40002 9.0001 2.40002C10.4323 2.40002 11.8058 2.96895 12.8185 3.98165C13.8312 4.99434 14.4001 6.36786 14.4001 7.80002Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.99995 9.6C9.99406 9.6 10.8 8.79411 10.8 7.8C10.8 6.80589 9.99406 6 8.99995 6C8.00584 6 7.19995 6.80589 7.19995 7.8C7.19995 8.79411 8.00584 9.6 8.99995 9.6Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `}
      width={width ?? 19}
      height={height ?? 14}
    />
  );
};

export { ContactMapIcon };
