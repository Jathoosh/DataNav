import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {Subscription} from 'rxjs';
import {accelerometer, gyroscope} from 'react-native-sensors';

function AcceleratorInfos({navigation}) {
  const [accelerometerData, setAccelerometerData] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [gyroscopeData, setGyroscopeData] = React.useState({x: 0, y: 0, z: 0});
  // TODO : remove if statement at the end of SPRINT 3
  //if (Platform.OS === 'android') {
  //TODO: add the BackHandler to go back to the login screen, as it is in Login.tsx
  React.useEffect(() => {
    let subscriptionAccel: Subscription | null = null;
    let subscriptionGyro: Subscription | null = null;
    if (accelerometer) {
      subscriptionAccel = accelerometer.subscribe(({x, y, z}) => {
        setAccelerometerData({x, y, z});
      });
    }
    if (gyroscope) {
      subscriptionGyro = gyroscope.subscribe(({x, y, z}) => {
        setGyroscopeData({x, y, z});
      });
    }

    return () => {
      if (subscriptionAccel) {
        subscriptionAccel.unsubscribe();
      }
      if (subscriptionGyro) {
        subscriptionGyro.unsubscribe();
      }
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={styles.accelerometer}>
        <Text>Accelerator Infos</Text>
        <Text>X: {accelerometerData.x.toFixed(2)}</Text>
        <Text>Y: {accelerometerData.y.toFixed(2)}</Text>
        <Text>Z: {accelerometerData.z.toFixed(2)}</Text>
      </View>
      <View style={styles.gyroscope}>
        <Text>Gyroscope Infos</Text>
        <Text>X: {gyroscopeData.x.toFixed(2)}</Text>
        <Text>Y: {gyroscopeData.y.toFixed(2)}</Text>
        <Text>Z: {gyroscopeData.z.toFixed(2)}</Text>
      </View>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  accelerometer: {
    position: 'absolute',
    fontSize: 15,
    top: 20,
    left: 20,
    color: 'red',
  },
  gyroscope: {
    position: 'absolute',
    fontSize: 15,
    top: 100,
    left: 20,
    color: 'green',
  },
});

export default AcceleratorInfos;
