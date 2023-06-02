import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import NavigationButton from '../components/NavigationButton';

function Login({navigation}) {
  /*TODO:
    - modify binding fields to match the serverInfos and code (backend)
  */
  const [serverInfos, setServerInfos] = useState('');
  const [code, setCode] = useState('');

  const consoleLog = () => {
    console.log('serverInfos : ' + serverInfos + ' \n code : ' + code);
    clearInput();
  };

  const clearInput = () => {
    setServerInfos('');
    setCode('');
  };

  return (
    <View style={styles.container}>
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
          onChangeText={code => setCode(code)}
        />
      </View>
      {/* TODO: A supprimer lorsque la récup baie et serveur sera faite via le backend (sprint 4) */}
      {/* <NavigationButton text={'Accéder'} onPress={consoleLog} /> */}

      {/* TODO: récupérer info serveur et baie via requète au backend 
        Pour le moment j'ai récupéré les infos du serveur et le code transmis au composant MapsInfo
        qui affichera seulement serverInfos pour la baie et un nombre choisi est attribué au serveur
      */}
      <NavigationButton
        text={'Accéder'}
        onPress={() => navigation.navigate('Maps', {serverInfos, code})}
      />
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
    marginTop: 40,
  },
  inputInfos: {
    height: 40,
    borderColor: '#D9D9D9',
    borderWidth: 2.76,
    borderRadius: 3,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 20,
  },
  codeContainer: {
    width: '80%',
    marginTop: '20%',
    marginBottom: '20%',
  },
});

export default Login;
