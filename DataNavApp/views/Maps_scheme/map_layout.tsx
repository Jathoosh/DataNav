import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {accelerometer, gyroscope} from 'react-native-sensors';
import {Subscription} from 'rxjs';
import Pointeur from '../../components/Pointeur';

function AcceleratorInfos() {
  const [accelerationData, setAcceleration] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [gyroscopeData, setGyroscope] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [pointerPosition, setPointerPosition] = React.useState({x: 0, y: 0});

  useEffect(() => {
    let accelerometerSubscription: Subscription | undefined;
    let gyroscopeSubscription: Subscription | undefined;

    const startTracking = () => {
      accelerometerSubscription = accelerometer.subscribe(({x, y, z}) => {
        setAcceleration({x, y, z});
        // Mise à jour de la position du pointeur en fonction de l'accélération
        setPointerPosition(prevPosition => ({
          x: prevPosition.x - x,
          y: prevPosition.y + y,
        }));
      });

      gyroscopeSubscription = gyroscope.subscribe(({x, y, z}) => {
        setGyroscope({x, y, z});
      });
    };

    const stopTracking = () => {
      accelerometerSubscription && accelerometerSubscription.unsubscribe();
      gyroscopeSubscription && gyroscopeSubscription.unsubscribe();
    };

    startTracking();

    return () => {
      stopTracking();
    };
  }, []);

  return (
    <View style={{padding: 20}}>
      <Pointeur x={pointerPosition.x} y={pointerPosition.y} />
      <Text>Acceleration:</Text>
      <Text>X: {accelerationData.x}</Text>
      <Text>Y: {accelerationData.y}</Text>
      <Text>Z: {accelerationData.z}</Text>
      <Text>Gyroscope:</Text>
      <Text>X: {gyroscopeData.x}</Text>
      <Text>Y: {gyroscopeData.y}</Text>
      <Text>Z: {gyroscopeData.z}</Text>
    </View>
  );
}

export default AcceleratorInfos;
