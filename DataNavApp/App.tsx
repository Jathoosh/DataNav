import * as React from 'react';

import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';

if (Platform.OS === 'android') {
  setUpdateIntervalForType(SensorTypes.accelerometer, 100);
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          contentStyle: {backgroundColor: 'F0F0F0'},
        }}>
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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={require('./views/Login').default}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
