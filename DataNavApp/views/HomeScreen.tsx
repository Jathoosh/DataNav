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
    </View>
  );
}

export default HomeScreen;
