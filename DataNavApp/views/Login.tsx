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

function Login(navigation: any) {
  /*To Do :
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
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        keyboardShouldPersistTaps="handled">
        <View style={styles.logo_Text}>
          <Image style={styles.logo} source={require('../asset/logo.png')} />
          <Image
            style={styles.logo_datanav}
            source={require('../asset/Datanav_Texte.png')}
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

        <NavigationButton text={'Accéder'} onPress={consoleLog} />
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
    marginTop: -Dimensions.get('window').height * 0.1,
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
    marginTop: '30%',
    marginBottom: '20%',
  },
  logo_Text: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '55%',
    marginBottom: Dimensions.get('window').height * 0.05,
  },
  logo: {
    width: 57.57,
    height: 80,
  },
  logo_datanav: {
    width: 115.74,
    height: 20,
  },
});
export default Login;
