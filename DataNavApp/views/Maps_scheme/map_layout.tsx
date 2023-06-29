import React from 'react';
import {Svg, Path} from 'react-native-svg';
import jsonData from './data2.json';

type Road = {
  id: Number;
  direction: String;
  start_node: Number;
  end_node: Number;
  length: Number;
};

type Intersection = {
  id: Number;
  x: Number;
  y: Number;
  roads: Number[];
};

type JSONMap = {
  roads: Road[];
  intersections: Intersection[];
};

function SvgComponent() {
  const jsonMap: JSONMap = jsonData as unknown as JSONMap;

  const getX = (id: Number, json_inter: JSONMap) => {
    const interX = json_inter.intersections.find((item: any) => item.id === id);
    return interX === undefined ? 0 : interX.x;
  };

  const getY = (id: Number, json_inter: JSONMap) => {
    const interY = json_inter.intersections.find((item: any) => item.id === id);
    return interY === undefined ? 0 : interY.y;
  };

  return (
    <Svg width="100%" height="100%">
      {jsonData.roads.map(item => (
        <Path
          key={item.id}
          d={
            'M' +
            getX(item.start_node, jsonMap) +
            ' ' +
            getY(item.start_node, jsonMap) +
            item.direction +
            item.length
          }
          fill="none"
          stroke="#000"
          strokeWidth="5.00"
          strokeOpacity="1.00"
        />
      ))}
    </Svg>
  );
}

export default SvgComponent;
