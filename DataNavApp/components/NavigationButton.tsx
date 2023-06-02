import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const NavigationButton = ({
  text,
  onPress,
  style,
}: {
  text: string;
  onPress: () => void;
  style?: object;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
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
  },
  textStyles: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default NavigationButton;
