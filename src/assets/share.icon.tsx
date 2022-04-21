import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const BShareIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg width={size ? size : 13.641} height={size ? size : 14.55} viewBox='0 0 13.641 14.55'>
      <Path
        fill={color ? color : '#646876'}
        d='M11.083 9.435a2.548 2.548 0 00-2.051 1.045L5 8.416a2.413 2.413 0 00-.075-1.67l4.219-2.539a2.544 2.544 0 10-.619-1.649 2.534 2.534 0 00.178.92L4.472 6.023a2.553 2.553 0 10.161 3.161l4.018 2.057a2.523 2.523 0 00-.125.751 2.558 2.558 0 102.558-2.558z'
      />
    </Svg>
  );
};

export { BShareIcon };
