import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {accelerometer} from 'react-native-sensors';
import {Subscription} from 'rxjs';
import Pointeur from '../components/Pointeur';

function AcceleratorInfos() {
  const [accelerationData, setAcceleration] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [pointerPosition, setPointerPosition] = React.useState({x: 0, y: 0});

  useEffect(() => {
    let accelerometerSubscription: Subscription | undefined;

    const startTracking = () => {
      accelerometerSubscription = accelerometer.subscribe(({x, y, z}) => {
        // Inverser les sens de mouvement pour le pointeur
        setPointerPosition(prevPosition => ({
          x: prevPosition.x - x, // Inverser le mouvement gauche-droite
          y: prevPosition.y + y, // Conserver le mouvement haut-bas
        }));

        setAcceleration({x, y, z});
      });
    };

    const stopTracking = () => {
      accelerometerSubscription && accelerometerSubscription.unsubscribe();
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
    </View>
  );
}

export default AcceleratorInfos;
