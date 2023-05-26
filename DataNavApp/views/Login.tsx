import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import NavigationButton from '../components/NavigationButton';

function Login(navigation: any) {
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

      <NavigationButton text={'Accéder'} onPress={consoleLog} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -100,
  },
  infos: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
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
    marginTop: '30%',
    marginBottom: '20%',
  },
});
export default Login;
