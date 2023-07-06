import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {gyroscope, accelerometer} from 'react-native-sensors';

const AcceleratorInfo = () => {
  const [motionData, setMotionData] = useState({
    gyroscope: {x: 0, y: 0, z: 0},
    accelerometer: {x: 0, y: 0, z: 0},
    direction: 'Stationary',
  });

  useEffect(() => {
    const gyroscopeSubscription = gyroscope.subscribe(({x, y, z}) => {
      // Update the gyroscope data in the state
      setMotionData(prevData => ({
        ...prevData,
        gyroscope: {x, y, z},
      }));
    });

    // Subscribe to the accelerometer data
    const accelerometerSubscription = accelerometer.subscribe(({x, y, z}) => {
      // Update the accelerometer data in the state
      setMotionData(prevData => ({
        ...prevData,
        accelerometer: {x, y, z},
      }));

      // Detect user movement direction
      const {x: ax, y: ay} = motionData.accelerometer;
      let direction = 'Stationary';

      if (ax > 0.2) {
        direction = 'Moving Forward';
      } else if (ax < -0.2) {
        direction = 'Moving Backward';
      } else if (ay > 0.2) {
        direction = 'Moving Right';
      } else if (ay < -0.2) {
        direction = 'Moving Left';
      }

      // Update the direction in the state
      setMotionData(prevData => ({
        ...prevData,
        direction,
      }));
    });

    // Clean up the subscriptions when the component unmounts
    return () => {
      gyroscopeSubscription.unsubscribe();
      accelerometerSubscription.unsubscribe();
    };
  });

  // You can use the motionData to update your view and render the movements here
  // For example, you can use the gyroscope and accelerometer values to animate a shape or update the position of an element in the view
  // You can also display the direction information in your view

  return (
    <View style={styles.container}>
      {/* Render your view elements here */}
      <Animated.View
        style={{transform: [{translateX: motionData.gyroscope.x}]}}
      />

      {/* Display the direction information */}
      <Text>Direction: {motionData.direction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AcceleratorInfo;
