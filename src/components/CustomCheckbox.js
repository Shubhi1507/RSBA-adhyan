import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Checkbox} from 'react-native-paper';

export function CustomCheckbox({
  label,
  onPress,
  completed,
  attempted,
  status,
  customTextStyle,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={status || attempted ? 'checked' : 'unchecked'}
          color={attempted && completed ? 'green' : 'red'}
          disabled={attempted && completed}
        />
        <Text style={[{marginHorizontal: 10, color: 'black'},customTextStyle || {}]}>
          {label || ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
