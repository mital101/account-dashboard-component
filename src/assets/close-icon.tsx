import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function CloseIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6 6l12.774 12.774M6 18.773L18.774 6"
        stroke="#14142B"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CloseIcon;
