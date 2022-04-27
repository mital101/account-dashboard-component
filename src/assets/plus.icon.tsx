import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const BPlusIcon: React.FC<Props> = ({ width, height, color = '#007ef2' }) => {
  return (
    <SvgCss
      xml={`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20pt" height="20pt" viewBox="0 0 20 20">
  <g enable-background="new">
  <path transform="matrix(1,0,0,1,-.5,-.5)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="${color}" d="M 10.229308 7.1528708 L 10.229308 10.229308 L 10.229308 7.1528708 Z M 10.229308 10.229308 L 10.229308 13.305745 L 10.229308 10.229308 Z M 10.229308 10.229308 L 13.305745 10.229308 L 10.229308 10.229308 Z M 10.229308 10.229308 L 7.1528708 10.229308 L 10.229308 10.229308 Z M 19.458619 10.229308 C 19.458619 11.441323 19.219885 12.641439 18.75606 13.761263 C 18.292239 14.880982 17.612446 15.89836 16.755454 16.755454 C 15.89836 17.612446 14.880982 18.292239 13.761263 18.75606 C 12.641439 19.219885 11.441323 19.458619 10.229308 19.458619 C 9.017295 19.458619 7.8171565 19.219885 6.697405 18.75606 C 5.5776555 18.292239 4.560226 17.612446 3.7032028 16.755454 C 2.8461793 15.89836 2.1663588 14.880982 1.7025347 13.761263 C 1.2387211 12.641439 .9999998 11.441323 .9999998 10.229308 C .9999998 7.781542 1.972369 5.4340364 3.7032028 3.7032028 C 5.4340364 1.972369 7.781542 .9999998 10.229308 .9999998 C 12.677025 .9999998 15.0245499 1.972369 16.755454 3.7032028 C 18.486258 5.4340364 19.458619 7.781542 19.458619 10.229308 Z "/>
  </g>
  </svg>`}
      width={width}
      height={height}
    />
  );
};
export { BPlusIcon };
