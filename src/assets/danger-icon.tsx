import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DangerIcon(props) {
  return (
    <Svg
      width={14}
      height={13}
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.385.943c.72-1.258 2.533-1.257 3.252 0l4.791 8.377c.715 1.25-.188 2.804-1.627 2.804H2.213C.773 12.124-.13 10.57.586 9.32L5.385.943zm2.384.497a.874.874 0 00-1.516 0L1.454 9.816a.874.874 0 00.759 1.308H11.8a.874.874 0 00.76-1.307L7.768 1.44z"
        fill="#1B1B1B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.008 4.375a.5.5 0 01.5.5v2.067a.5.5 0 11-1 0V4.875a.5.5 0 01.5-.5zM6.336 9.003c0-.369.298-.667.667-.667h.006a.667.667 0 110 1.333h-.006a.667.667 0 01-.667-.666z"
        fill="#1B1B1B"
      />
    </Svg>
  );
}

export default DangerIcon;
