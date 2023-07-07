import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Svg, Polygon} from 'react-native-svg';

function Pointeur({x, y}) {
  const containerStyle = {
    ...styles.container,
    transform: [{translateX: x}, {translateY: y}, {rotate: `${x}deg`}],
  };

  return (
    <View style={containerStyle}>
      <Svg width="20" height="20">
        <Polygon points="0,0 10,20 20,0" fill="blue" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Pointeur;