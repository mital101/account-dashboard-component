import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const TransactionFilterIcon: React.FC<Props> = ({ size, color = '#383838' }) => {
  return (
    <SvgCss
      xml={`<svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.6667 1H1L7.66667 8.88333V14.3333L11 16V8.88333L17.6667 1Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>      
`}
      width={size}
      height={size}
    />
  );
};
export { TransactionFilterIcon };
