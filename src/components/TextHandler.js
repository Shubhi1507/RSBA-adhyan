import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const TextHandler = ({children, style}) => {
  return (
    <Text style={[styles.text, style ? style : {}]}>{children ?? ''} </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    // fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
});
