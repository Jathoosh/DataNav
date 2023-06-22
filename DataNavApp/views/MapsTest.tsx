import React from 'react';
import {StyleSheet, View} from 'react-native';
import SvgComponent from './Maps_scheme/map_layout';

function MapsTest(navigation: any) {
  return (
    <View style={styles.container}>
      <SvgComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '0deg'}],
  },
});

export default MapsTest;
