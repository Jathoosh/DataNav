import React from 'react';
import {Text, StyleSheet} from 'react-native';

function App(): React.JSX.Element {
  return (
    <Text style={styles.text}>Hello World !</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    font : 'Arial',
    position: 'absolute',
    top: 100,
    left: 100,
  },
});

export default App;
