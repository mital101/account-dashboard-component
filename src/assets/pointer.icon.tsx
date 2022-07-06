import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const PointerIcon: React.FC<Props> = ({ width, height }) => {
  return (
    <SvgCss
      xml={`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 0H0V40H40V0Z" fill="white" fill-opacity="0.01"/>
<path d="M34.1667 31.6667H15.8333V36.6667H34.1667V31.6667Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.8334 31.6668C10.401 25.731 7.2838 22.2911 6.48193 21.347C5.27911 19.9308 5.78419 18.3302 8.79435 18.3302C11.8044 18.3302 13.5404 22.7347 15.8334 22.7347C15.8471 22.7375 15.848 17.1049 15.8362 5.83686C15.8348 4.45574 16.9532 3.33495 18.3344 3.3335H18.3369C19.7196 3.3335 20.8404 4.45434 20.8404 5.83696V12.5115C27.4844 13.5189 31.0965 14.0746 31.6769 14.1788C32.5473 14.3351 34.1668 15.166 34.1668 17.5569C34.1668 19.1508 34.1668 23.2985 34.1668 31.6668H15.8334Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
</svg>`}
      width={width}
      height={height}
    />
  );
};
export { PointerIcon };
