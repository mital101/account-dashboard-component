import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const BWarningIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg width={size ? size : 18} height={size ? size : 17} viewBox='0 0 18 17' fill={'none'}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.931 1.21c.908-1.614 3.231-1.614 4.138 0l6.623 11.774c.89 1.584-.253 3.537-2.068 3.537H2.377c-1.816 0-2.959-1.953-2.069-3.537L6.931 1.212zm3.256 11.752a1.187 1.187 0 11-2.374 0 1.187 1.187 0 012.374 0zM9 3.467a1.187 1.187 0 00-1.187 1.187v3.56a1.187 1.187 0 102.374 0v-3.56A1.187 1.187 0 009 3.467z'
        fill={color ? color : '#FCAA0A'}
      />
    </Svg>
  );
};

export { BWarningIcon };
