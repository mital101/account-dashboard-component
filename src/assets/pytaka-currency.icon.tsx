import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const PytakaCurrencyIcon: React.FC<Props> = ({ width, height,color="white" }) => {
  return (
    <SvgCss
      xml={`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.796 0.505999C7.21 0.505999 8.316 0.806999 9.114 1.409C9.912 1.997 10.437 2.83 10.689 3.908H11.802V5.357H10.878C10.892 5.441 10.899 5.525 10.899 5.609C10.899 5.679 10.899 5.749 10.899 5.819C10.899 5.959 10.892 6.099 10.878 6.239C10.878 6.365 10.871 6.484 10.857 6.596H11.802V8.045H10.563C10.353 8.703 10.017 9.291 9.555 9.809C9.093 10.327 8.484 10.733 7.728 11.027C6.972 11.321 6.041 11.468 4.935 11.468H4.536V15.5H1.407V8.045H0.21V6.596H1.407V5.357H0.21V3.908H1.407V0.505999H5.796ZM7.287 8.045H4.536V8.948H4.872C5.446 8.948 5.936 8.878 6.342 8.738C6.748 8.598 7.063 8.367 7.287 8.045ZM7.749 5.357H4.536V6.596H7.749C7.763 6.484 7.77 6.379 7.77 6.281C7.77 6.169 7.77 6.05 7.77 5.924C7.77 5.826 7.77 5.735 7.77 5.651C7.77 5.553 7.763 5.455 7.749 5.357ZM5.649 3.026H4.536V3.908H7.413C7.259 3.628 7.035 3.411 6.741 3.257C6.461 3.103 6.097 3.026 5.649 3.026Z" fill="${color}"/>
</svg>`}
      width={width}
      height={height}
    />
  );
};
export { PytakaCurrencyIcon };
