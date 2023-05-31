import {View, Text, Button} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View
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
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default HomeScreen;
