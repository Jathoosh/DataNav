import React from 'react';
import {View, Text} from 'react-native';

import Loader from '../Loader';

function MapsTest(navigation) {
  // Supposons que vous avez les données JSON disponibles dans une variable appelée jsonData
  /*const jsonData = [
    {
      path: 'M116.50,457.50 L116.50,60.50',
      fill: 'none',
      stroke: 'rgb(0, 0, 0)',
      strokeWidth: '5.00',
      strokeOpacity: '1.00',
      strokeLinejoin: 'round',
    },
    // Autres objets de chemin SVG
  ];*/

  return (
    //<View>
    //<SvgComponent jsonData={jsonData} />
    //</View>

    /*<Svg width={300} height={300}>
      <Polygon points="215,225, 225,215, 228,228" fill="green" />
    </Svg>*/
    <View>
      <Text> Test </Text>
      <Loader />
    </View>
  );
}

export default MapsTest;
