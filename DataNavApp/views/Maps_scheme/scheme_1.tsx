import React from 'react';
import {Svg, Path} from 'react-native-svg';

function SvgComponent({jsonData}) {
  return (
    <Svg width="100%" height="100%">
      {jsonData.map((item, index) => (
        <Path
          key={index}
          d={item.path}
          fill={item.fill}
          stroke={item.stroke}
          strokeWidth={item.strokeWidth}
          strokeOpacity={item.strokeOpacity}
          strokeLinejoin={item.strokeLinejoin}
        />
      ))}
    </Svg>
  );
}

export default SvgComponent;
