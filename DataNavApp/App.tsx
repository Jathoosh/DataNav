import { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { accelerometer } from 'react-native-sensors';
import { Subscription } from 'rxjs';


function App(): React.JSX.Element {
  const [accelerometerData, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let subscription: Subscription | null = null;
    
    if (accelerometer) {
      subscription = accelerometer.subscribe(({ x, y, z }) => {
        setData({ x, y, z });
      });
    }
  
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [accelerometer]);
  
    

  return (
    <View>
      <Text style={styles.text}>
        Xo: {accelerometerData.x}, Y: {accelerometerData.y}, Z: {accelerometerData.z}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontSize: 24,
    top: 100,
    left: 100,
  },
});

export default App;
