import * as React from 'react';

import {Platform, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';

if (Platform.OS === 'android') {
  setUpdateIntervalForType(SensorTypes.accelerometer, 100);
}

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <>
      <Image style={styles.logo} source={require('./asset/logo.png')} />
      <Image
        style={styles.logo_datanav}
        source={require('./asset/Datanav_Texte.png')}
      />
    </>
  );
}

function App(): React.JSX.Element{
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
        />
        <Stack.Screen
          name="Login"
          component={require('./views/Login').default}
          options={({navigation, route}) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: (props) => <LogoTitle {...props} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  logo_datanav: {
    width: 100,
    height: 20,
  },
});

export default App;
