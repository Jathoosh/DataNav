import React from 'react';
import {Svg, Path} from 'react-native-svg';
import jsonData from './data2.json';

type Road = {
  id: Int16Array;
  direction: String;
  start_node: Int16Array;
  end_node: Int16Array;
  length: Int16Array;
}

type Intersection = {
  "id": Int16Array;
  "x": Int16Array;
  "y": Int16Array;
  "roads": Int16Array[];
}

type JSONMap = {
  roads: Road[];
  intersections: Intersection[];
}

function SvgComponent() {

  const jsonMap:JSONMap = jsonData as unknown as JSONMap;

  const handleNavigateToMaps = (jsonData : JSONMap) => {
    for (let index = 0; index < jsonData.roads.length; index++) {
      console.log("HUHO");
      
    }
  };
  console.log(jsonMap);
  handleNavigateToMaps(jsonMap);

  return (
    <Svg width="100%" height="100%">
      {jsonData.roads.map(item => (
        <Path
          key={item.id}
          d={    "M"+ getX(item.start_node)+getY(item.start_node)+item.direction+ item.length}
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
