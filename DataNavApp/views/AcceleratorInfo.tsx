import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {accelerometer} from 'react-native-sensors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Subscription} from 'rxjs';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type RootStackParamList = {
  Home: undefined;
  Accelerator: undefined;
  Maps: {serverInfos: string; serverN: string};
  Login: undefined;
  MapsTest: undefined;
  UnityPage: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Accelerator'>;

function AcceleratorInfos({navigation}: Props) {
  // let gyroscopeSubscription: Subscription | undefined;

  const [accelerationData, setAcceleration] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });
  // const [gyroscopeData, setGyroscope] = React.useState({
  //   x: 0,
  //   y: 0,
  //   z: 0,
  // });

  const [velocity, setVelocity] = React.useState([0, 0, 0]);
  const getVelocity = () => velocity;
  const [distance, setDistance] = React.useState([0, 0, 0]);
  const getDistance = () => distance;

  useEffect(() => {
    let accelerometerSubscription: Subscription | undefined;
    const startTracking = () => {
      accelerometerSubscription = accelerometer.subscribe(({x, y, z}) =>
        setAcceleration({x, y, z}),
      );

      // gyroscopeSubscription = gyroscope.subscribe(({x, y, z}) =>
      //   setGyroscope({x, y, z}),
      // );
    };

    const stopTracking = () => {
      accelerometerSubscription && accelerometerSubscription.unsubscribe();
      // gyroscopeSubscription && gyroscopeSubscription.unsubscribe();
    };

    const alpha = 0.8;
    let gravity = [0, 0, 0];
    let linear_acceleration = [0, 0, 0];

    const processAccelerationData = ({
      x,
      y,
      z,
    }: {
      x: number;
      y: number;
      z: number;
    }) => {
      gravity[0] = alpha * gravity[0] + (1 - alpha) * x;
      gravity[1] = alpha * gravity[1] + (1 - alpha) * y;
      gravity[2] = alpha * gravity[2] + (1 - alpha) * z;

      linear_acceleration[0] = x - gravity[0];
      linear_acceleration[1] = y - gravity[1];
      linear_acceleration[2] = z - gravity[2];
    };

    let lastTimestamp = Date.now();
    let velocityTemp = getVelocity();
    let distanceTemp = getDistance();

    const calculateDistanceAndSpeed = (
      acceleration: number[],
      timestamp: number,
    ) => {
      let dt = (timestamp - lastTimestamp) / 1000; // in seconds
      lastTimestamp = timestamp;

      for (let i = 0; i < 3; ++i) {
        velocityTemp[i] += acceleration[i] * dt; // v = u + at
        distanceTemp[i] += velocityTemp[i] * dt; // s = ut + 1/2at^2 (u=0 here)
      }

      setDistance(distanceTemp);
      setVelocity(velocityTemp);
    };

    startTracking();

    // processAccelerationData({
    //   x: accelerationData.x,
    //   y: accelerationData.y,
    //   z: accelerationData.z,
    // });

    calculateDistanceAndSpeed(
      [accelerationData.x, accelerationData.y, accelerationData.z],
      Date.now(),
    );

    return () => {
      stopTracking();
    };
  }, [accelerationData, getDistance, getVelocity]);

  return (
    <View style={{padding: 20}}>
      <Text>Acceleration:</Text>
      <Text>X: {accelerationData.x}</Text>
      <Text>Y: {accelerationData.y}</Text>
      <Text>Z: {accelerationData.z}</Text>
      <Text>Distance:</Text>
      <Text>X: {distance[0]}</Text>
      <Text>Y: {distance[1]}</Text>
      <Text>Z: {distance[2]}</Text>
      <Text>Speed:</Text>
      <Text>X: {velocity[0]}</Text>
      <Text>Y: {velocity[1]}</Text>
      <Text>Z: {velocity[2]}</Text>
    </View>
  );
}

export default AcceleratorInfos;
