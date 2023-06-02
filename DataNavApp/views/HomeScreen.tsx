import {View, StyleSheet, Image} from 'react-native';
import NavigationButton from '../components/NavigationButton';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../asset/logo.png')} style={styles.logo} />
        <Image
          source={require('../asset/Datanav_Texte.png')}
          style={styles.logo_datanav}
        />
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
          text={'Go to Accelator Infos'}
          onPress={() => navigation.navigate('Accelerator')}
          style={{
            marginVertical: 10,
            marginTop: 20,
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
