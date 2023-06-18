import React from 'react';
import {View} from 'react-native';

import SvgComponent from './Maps_scheme/scheme_1';

function MapsTest(navigation) {
  return (
    <View style={styles.container}>
      <SvgComponent jsonData={jsonData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '180deg'}],
  },
});

export default MapsTest;
