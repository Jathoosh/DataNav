import {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Platform} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {Subscription} from 'rxjs';

if (Platform.OS === 'android') {
  setUpdateIntervalForType(SensorTypes.accelerometer, 100);
}

function App(): React.JSX.Element {
  const [accelerometerData, setData] = useState({x: 0, y: 0, z: 0});
  let error_message = 'Accelerometer data available';

  if (Platform.OS === 'android') {
    useEffect(() => {
      let subscription: Subscription | null = null;
      if (accelerometer) {
        subscription = accelerometer.subscribe(({x, y, z}) => {
          setData({x, y, z});
        });
      }

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }, []);
  } else {
    error_message = 'accelerometer data not available';
  }

  return (
    <View>
      <Text style={styles.error}> {error_message}</Text>
      <Text style={styles.textX}>X: {accelerometerData.x.toFixed(2)}</Text>
      <Text style={styles.textY}>Y: {accelerometerData.y.toFixed(2)}</Text>
      <Text style={styles.textZ}>Z: {accelerometerData.z.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    fontSize: 15,
    top: 20,
    left: 20,
  },
  textX: {
    position: 'absolute',
    fontSize: 24,
    top: 100,
    left: 100,
  },
  textY: {
    position: 'absolute',
    fontSize: 24,
    top: 75,
    left: 100,
  },
  textZ: {
    position: 'absolute',
    fontSize: 24,
    top: 55,
    left: 100,
  },
});

export default App;
