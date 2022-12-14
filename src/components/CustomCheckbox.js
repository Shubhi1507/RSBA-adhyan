import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Checkbox} from 'react-native-paper';
import LocalizationContext from '../context/LanguageContext';
import {COLORS} from '../utils/colors';
import {StringModifier, StringModifierWithFilter} from '../utils/utils';

export function CustomCheckbox({
  label,
  onPress,
  completed,
  attempted,
  status,
  customTextStyle,
  color,
}) {
  let isCompleted = attempted && completed;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={status || attempted ? 'checked' : 'unchecked'}
          color={isCompleted ? COLORS.green : COLORS.error}
          uncheckedColor={COLORS.orange}
        />
        <Text style={[styles.title, customTextStyle || {}]}>{label || ''}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 10,
    color: 'black',
    fontSize: 18,
  },
});
