import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {COLORS} from '../utils/colors';
import {TextHandler} from './TextHandler';

export const RadioButtons = ({data, onValueChange}) => {
  const [value, setValue] = React.useState('');
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data || []}
      keyExtractor={() => Math.random().toFixed(5)}
      renderItem={({item, index}) => {
        return (
          <RadioButton.Group
            key={index}
            onValueChange={newValue => {
              onValueChange(item.value);
              setValue(item.value);
            }}
            value={value}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton
                value={item.value}
                color={COLORS.blue}
                uncheckedColor={COLORS.black}
              />

              <TextHandler>{item.value}</TextHandler>
            </View>
          </RadioButton.Group>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.blue,
    justifyContent: 'center',
    // alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
