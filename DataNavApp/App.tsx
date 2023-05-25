import * as React from 'react';

import {Platform, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';

if (Platform.OS === 'android') {
  setUpdateIntervalForType(SensorTypes.accelerometer, 100);
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={require('./views/HomeScreen').default}
          options={{title: 'DATANAV'}}
        />
        <Stack.Screen
          name="Accelerator"
          component={require('./views/AcceleratorInfo').default}
        />
        <Stack.Screen
          name="Maps"
          component={require('./views/MapsInfo').default}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
