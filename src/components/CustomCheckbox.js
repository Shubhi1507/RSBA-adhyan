import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Checkbox} from 'react-native-paper';

export function CustomCheckbox({label, status, onPress, disabled}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={status || disabled ? 'checked' : 'unchecked'}
          disabled={disabled}
        />
        <Text style={{marginHorizontal: 10}}>{label || ''}</Text>
      </View>
    </TouchableOpacity>
  );
}
