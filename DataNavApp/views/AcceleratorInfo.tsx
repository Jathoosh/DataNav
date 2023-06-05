import React from 'react';
import {Button, Text, View, Platform, StyleSheet} from 'react-native';
import {Subscription} from 'rxjs';
import {accelerometer} from 'react-native-sensors';

function AcceleratorInfos({navigation}) {
  const [accelerometerData, setData] = React.useState({x: 0, y: 0, z: 0});
  let error_message = 'Accelerometer data available';
  if (Platform.OS === 'android') {
    React.useEffect(() => {
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Accelerator Infos</Text>
      <Text style={styles.error}> {error_message}</Text>
      <Text style={styles.textX}>X: {accelerometerData.x.toFixed(2)}</Text>
      <Text style={styles.textY}>Y: {accelerometerData.y.toFixed(2)}</Text>
      <Text style={styles.textZ}>Z: {accelerometerData.z.toFixed(2)}</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
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
    color: 'red',
  },
  textY: {
    position: 'absolute',
    fontSize: 24,
    top: 150,
    left: 100,
    color: 'red',
  },
  textZ: {
    position: 'absolute',
    fontSize: 24,
    top: 200,
    left: 100,
    color: 'red',
  },
});

export default AcceleratorInfos;
