import * as React from 'react';

import {Button, Text, StyleSheet, View, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {Subscription} from 'rxjs';

if (Platform.OS === 'android') {
  setUpdateIntervalForType(SensorTypes.accelerometer, 100);
}

function HomeScreen({navigation}) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Accelator Infos"
        onPress={() => navigation.navigate('Accelerator')}
      />
    </View>
  );
}

function AcceleratorInfos({navigation}){
  const [accelerometerData, setData] = React.useState({x: 0, y: 0, z: 0});
  let error_message = 'Accelerometer data available';
  if (Platform.OS === 'android') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
      // eslint-disable-next-line react-native/no-inline-styles
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
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Maps" onPress={() => navigation.navigate('Maps')} />
    </View>
  );
}

function MapsInfo() {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Maps Info</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'DATANAV'}}
        />
        <Stack.Screen name="Accelerator" component={AcceleratorInfos} />
        <Stack.Screen name="Maps" component={MapsInfo} />
      </Stack.Navigator>
    </NavigationContainer>
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
