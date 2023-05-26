import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const NavigationButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0390BF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: 235.24,
    height: 51.01,
  },
  textStyles: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default NavigationButton;
