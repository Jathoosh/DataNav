import * as React from 'react';

import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';

//TODO: Handle the return button to control it depending on the page

if (Platform.OS === 'android') {
  setUpdateIntervalForType(SensorTypes.accelerometer, 100);
  setUpdateIntervalForType(SensorTypes.gyroscope, 100);
}

type RootStackParamList = {
  Home: undefined;
  Accelerator: undefined;
  Maps: {serverInfos: string; serverN: string};
  Login: undefined;
  MapsTest: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  if (__DEV__) {
    // Code to execute only in development mode
    console.log('This is a development build');
    // Add your development-specific code here
  } else {
    // Code to execute in production mode
    console.log('This is a production build');
    // Add your production-specific code here
  }

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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Accelerator"
          component={require('./views/AcceleratorInfo').default}
        />
        <Stack.Screen
          name="Maps"
          component={require('./views/MapsInfo').default}
          options={{headerShown: false}}
          initialParams={{serverInfos: '', serverN: ''}}
        />
        <Stack.Screen
          name="Login"
          component={require('./views/Login').default}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MapsTest"
          component={require('./views/MapsTest').default}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UnityPage"
          component={require('./views/UnityPage').default}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
