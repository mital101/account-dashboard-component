import * as React from 'react';
import Svg, { Defs, G, Path, Circle } from 'react-native-svg';

interface Props {
  size?: number;
}

const BCalendar: React.FC<Props> = ({ size }) => {
  return (
    <Svg width={size ? size : 16.982} height={size ? size : 17.635} viewBox='0 0 16.982 17.635'>
      <Defs />
      <G id='prefix__calendar' transform='translate(-5.988)'>
        <G id='prefix__Group_7940' transform='translate(5.988)'>
          <Path
            id='prefix__Path_7958'
            d='M8.326 17.635h12.305A2.34 2.34 0 0022.97 15.3V3.644a2.34 2.34 0 00-2.338-2.338H19.7V.653a.653.653 0 00-1.306 0v.653H10.56V.653a.653.653 0 00-1.306 0v.653h-.928a2.34 2.34 0 00-2.338 2.338V15.3a2.34 2.34 0 002.338 2.338zM7.294 3.644a1.034 1.034 0 011.032-1.031h.927v.653a.653.653 0 001.306 0v-.653H18.4v.653a.653.653 0 101.306 0v-.653h.927a1.034 1.034 0 011.032 1.032V15.3a1.034 1.034 0 01-1.032 1.032H8.326A1.034 1.034 0 017.294 15.3z'
            fill='#5d21d2'
            transform='translate(-5.988)'
          />
          <Circle
            id='prefix__Ellipse_132'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(3.919 5.878)'
          />
          <Circle
            id='prefix__Ellipse_133'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(7.511 5.878)'
          />
          <Circle
            id='prefix__Ellipse_134'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(11.103 5.878)'
          />
          <Circle
            id='prefix__Ellipse_135'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(3.919 9.144)'
          />
          <Circle
            id='prefix__Ellipse_136'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(7.511 9.144)'
          />
          <Circle
            id='prefix__Ellipse_137'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(11.103 9.144)'
          />
          <Circle
            id='prefix__Ellipse_138'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(3.919 12.41)'
          />
          <Circle
            id='prefix__Ellipse_139'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(7.511 12.41)'
          />
          <Circle
            id='prefix__Ellipse_140'
            cx={0.816}
            cy={0.816}
            r={0.816}
            fill='#5d21d2'
            transform='translate(11.103 12.41)'
          />
        </G>
      </G>
    </Svg>
  );
};

export { BCalendar };
