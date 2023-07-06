import {
  View,
  StyleSheet,
  Image,
  useColorScheme,
  Text,
  BackHandler,
  Alert,
} from 'react-native';
import NavigationButton from '../components/NavigationButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import React from 'react';

type RootStackParamList = {
  Home: undefined;
  Accelerator: undefined;
  Maps: {serverInfos: string; serverN: string};
  Login: undefined;
  MapsTest: undefined;
  UnityPage: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props) {
  const colorScheme = useColorScheme();
  //const logoStyle = colorScheme === 'dark' ? {tintColor: 'white'} : null;
  //const logoDatanavStyle = colorScheme === 'dark' ? {tintColor: 'white'} : null;
  //TODO: add the BackHandler to go back to the login screen, as it is in Login.tsx
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../asset/logo.png')} style={styles.logo} />
        <Image
          source={require('../asset/Datanav_Texte.png')}
          style={styles.logo_datanav}
        />
        {colorScheme === 'dark' ? (
          <Text style={{color: 'white'}}>
            Le théme actuel est dark et n'est pas pris en compte
          </Text>
        ) : null}
      </View>
      <View>
        <NavigationButton
          text={'Lancer une recherche'}
          onPress={() => navigation.navigate('Login')}
          style={{
            // A garder si on veut inclure le boutons test Accelator
            marginVertical: 10,
            marginTop: 50,
            // A garder quand le bouton test du bas seront supprimés
            // marginVertical: 130,
            // marginBottom: 40,
          }}
        />
        <NavigationButton
          text={'Accelator Infos'}
          onPress={() => navigation.navigate('Accelerator')}
          style={{
            marginVertical: 10,
            marginTop: 30,
          }}
        />
        <NavigationButton
          text={'Unity Integration'}
          onPress={() => navigation.navigate('UnityPage')}
          style={{
            marginVertical: 10,
            marginTop: 5,
          }}
        />
        <NavigationButton
          text={'Maps Infos'}
          onPress={() => navigation.navigate('MapsTest')}
          style={{
            marginVertical: 10,
            marginTop: 5,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 136,
    height: 189,
  },
  logo_datanav: {
    width: 270,
    height: 45,
  },
});

export default HomeScreen;
