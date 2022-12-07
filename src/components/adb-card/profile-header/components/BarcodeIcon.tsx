import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function BarcodeIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5zM6 8v8M9 8v4M9 15v1M15 8v1M12 8v8M15 12v4M18 8v8"
        stroke="#1B1B1B"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BarcodeIcon;
