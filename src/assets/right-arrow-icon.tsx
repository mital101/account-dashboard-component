import * as React from "react";
import { SvgCss } from "react-native-svg";
interface Props {
  size?: number;
  color?: string;
}
const RightArrowIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <SvgCss
      xml={`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.2812 5L20.9983 12L14.2812 19" stroke="#14142B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="19.9844" y1="11.7812" x2="3.75131" y2="11.7812" stroke="#14142B" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    
    `}
      width={size}
      height={size}
      fill={color}
    />
  );
};

export default RightArrowIcon;
