import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

// TODO : A changer par les valeurs qui seront récupérées de la page de login
function MapsInfo({baie = '1000', serveur = '50'}) {

  // TODO : A changer par l'image de la carte qui sera générée
  const backgroundImagePath = require('../asset/map_background.png');
  const [selectedButton, setSelectedButton] = useState('Mode Plan');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImagePath}
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.infoContainer}>
            <View style={styles.posRectangle}>
              <Text style={styles.infoBaie}>
                Baie : {baie} - Serveur : {serveur}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === 'Mode Plan'
                  ? {backgroundColor: 'darkblue'}
                  : null,
              ]}
              onPress={() => setSelectedButton('Mode Plan')}>
              <Text style={styles.textStyles}>Mode Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedButton === 'Mode RA'
                  ? {backgroundColor: 'darkblue'}
                  : null,
              ]}
              onPress={() => setSelectedButton('Mode RA')}>
              <Text style={styles.textStyles}>Mode RA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  // Conteneur principal grisé
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between', // occuper tout l'espace disponible verticalement
  },
  // Style des infos sur numéro baie et serveur
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoBaie: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  posRectangle: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  // Style des boutons
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#0390BF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  textStyles: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapsInfo;
