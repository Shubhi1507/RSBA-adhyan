import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/colors';
import {TextHandler} from './TextHandler';

export function Button(props) {
  return (
    <TouchableOpacity
      style={[Styles.ButtonContainer, props?.ButtonContainerStyle || {}]}
      onPress={() => (props.onPress ? props.onPress() : {})}>
      {props?.icon && props.icon}
      <TextHandler style={[props.textstyle, Styles.localtextstyle]}>
        {props.title}
      </TextHandler>
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  ButtonContainer: {
    backgroundColor: COLORS.blue,
    // alignSelf: 'baseline',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 5,
    shadowRadius: 10,
  },
  localtextstyle: {
    marginHorizontal: 5,
    textAlign: 'center',
    color: COLORS.white,
  },
  inner: {},
});
