import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const BitCoinIcon3: React.FC<Props> = ({ width, height, color = '#FF9800' }) => {
  return (
    <SvgCss
      xml={`<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<circle cx="20" cy="20" r="20" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_2895_9420" transform="scale(0.015625)"/>
</pattern>
<image id="image0_2895_9420" width="64" height="64" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`}
      width={width}
      height={height}
    />
  );
};
export { BitCoinIcon3 };
