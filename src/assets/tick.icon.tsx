import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

const BTickIcon: React.FC<Props> = ({ width, height }) => {
  return (
    <SvgCss
      xml={`<svg xmlns="http://www.w3.org/2000/svg" width="11.144" height="8.653" viewBox="0 0 11.144 8.653">
      <path id="correct" fill="#fff" d="M4.267 8.893a.569.569 0 0 1-.8 0L.25 5.68a.853.853 0 0 1 0-1.207l.4-.4a.853.853 0 0 1 1.207 0l2.008 2.003 5.42-5.42a.853.853 0 0 1 1.207 0l.4.4a.853.853 0 0 1 0 1.207zm0 0" transform="translate(0 -.406)"/>
  </svg>
  `}
      width={width}
      height={height}
    />
  );
};
export { BTickIcon };
