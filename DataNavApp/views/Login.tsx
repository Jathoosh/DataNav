import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NavigationButton from '../components/NavigationButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Accelerator: undefined;
  Maps: {serverInfos: string; serverN: string};
  Login: undefined;
  MapsTest: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: Props) {
  /*TODO:
    - modify binding fields to match the serverInfos and code (backend)
  */
  const [serverInfos, setServerInfos] = useState('');
  const [code, setCode] = useState('');

  //TODO: Voir si nécessaire par la suite
  /*const clearInput = () => {
    setServerInfos('');
    setCode('');
  };*/

  const handleNavigateToMaps = () => {
    if (serverInfos && code) {
      navigation.navigate('Maps', {serverInfos: serverInfos, serverN: code});
    } else {
      console.log('Veuillez remplir les champs');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={require('../asset/logo.png')} style={styles.logo} />
          <Image
            source={require('../asset/Datanav_Texte.png')}
            style={styles.logo_datanav}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.infos}>
            Entrez les informations de votre
            {'\n'}baie serveur :
          </Text>
          <TextInput
            style={styles.inputInfos}
            value={serverInfos}
            onChangeText={info => setServerInfos(info)}
          />
        </View>
        <View style={styles.codeContainer}>
          <Text style={styles.infos}>Entrez le code confidentiel :</Text>
          <TextInput
            style={styles.inputInfos}
            value={code}
            onChangeText={textCode => setCode(textCode)}
          />
        </View>
        {/* TODO: A supprimer lorsque la récup baie et serveur sera faite via le backend (sprint 4) */}
        {/* <NavigationButton text={'Accéder'} onPress={consoleLog} /> */}

        {/* TODO: récupérer info serveur et baie via requète au backend
        Pour le moment j'ai récupéré les infos du serveur et le code transmis au composant MapsInfo
        qui affichera seulement serverInfos pour la baie et un nombre choisi est attribué au serveur
      */}
        <NavigationButton text={'Accéder'} onPress={handleNavigateToMaps} />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:
      Platform.OS === 'ios'
        ? Dimensions.get('window').height * 0.01
        : Dimensions.get('window').height * 0.0005,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  logo: {
    width: 70,
    height: 90,
    left: 13,
    top: 30,
  },
  logo_datanav: {
    width: 140,
    height: 30,
    left: 70,
  },
  infos: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  inputContainer: {
    width: '80%',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  inputInfos: {
    height: 40,
    borderColor: '#D9D9D9',
    borderWidth: 2.76,
    borderRadius: 3,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  codeContainer: {
    width: '80%',
    marginTop: '20%',
    marginBottom: '20%',
  },
});

export default Login;
