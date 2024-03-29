import React, {useRef, useEffect} from 'react';
import {BackHandler, PermissionsAndroid, Platform, View} from 'react-native';
import UnityView from '@azesmway/react-native-unity';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import mapJson from './Maps_scheme/data.json';

//TODO: retreive the list containing the path (nodes and racks) once it has been calculated

type RootStackParamList = {
  Home: undefined;
  Accelerator: undefined;
  Maps: {serverInfos: string; serverN: string};
  Login: undefined;
  MapsTest: undefined;
  UnityPage: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'UnityPage'>;

function UnityPage({navigation}: Props) {
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  const unityRef = useRef<UnityView>(null);

  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(
      granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted'); //TODO: Changer totalement les conditions afin de charger le module unity uniquement si les permissions sont accordées et sinon afficher un pop-up avec confirmation de l'utilisateur sur les permissions de la camera avant de changer de page
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Camera permission denied');
          //navigation.navigate('Login');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          //Display some message that user has denied permission permanently
          console.log('Temporary');
        }
      },
    );
  } else {
    console.log('Camera permission not asked for iOS'); //TODO: Update this pour IOS
  }

  const mapText = JSON.stringify(mapJson);

  useEffect(() => {
    if (unityRef?.current) {
      const message = {
        gameObject: 'arrow', //TODO: Changer le nom du gameObject si nécessaire
        methodName: 'loadMap',
        message: mapText,
      };
      unityRef.current.postMessage(
        message.gameObject,
        message.methodName,
        message.message,
      );
    }
  }, [mapText]); //TODO: Peut ne pas être mapText mais la liste des nodes et rack

  return (
    <View style={{flex: 1}}>
      <UnityView
        ref={unityRef}
        style={{flex: 1}}
        onUnityMessage={result => {
          console.log('onUnityMessage', result.nativeEvent.message);
        }}
      />
    </View>
  );
}

export default UnityPage;
