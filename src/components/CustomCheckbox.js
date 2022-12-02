import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={status || attempted ? 'checked' : 'unchecked'}
          color={
            color
              ? color
              : attempted && completed
              ? COLORS.success
              : COLORS.error
          }
          disabled={attempted && completed}
        />
        <Text
          style={[
            {marginHorizontal: 10, color: 'black'},
            customTextStyle || {},
          ]}>
          {label || ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
