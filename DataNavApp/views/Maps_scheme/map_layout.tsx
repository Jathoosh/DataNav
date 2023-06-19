import React from 'react';
import {Svg, Path} from 'react-native-svg';
import jsonData from './data.json';

function SvgComponent() {
  return (
    <Svg width="100%" height="100%">
      {jsonData.paths.map(item => (
        <Path
          key={item.id}
          d={item.path}
          fill={item.fill}
          stroke={item.stroke}
          strokeWidth={item.strokeWidth}
          strokeOpacity={item.strokeOpacity}
        />
      ))}
    </Svg>
  );
}

export default SvgComponent;
