import * as React from 'react';
import { useContext } from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import LocalizationContext from '../context/LanguageContext';
import {COLORS} from '../utils/colors';
import {TextHandler} from './TextHandler';

export const RadioButtons = ({data, onValueChange, radioStyle, valueProp}) => {
  const [value, setValue] = React.useState('');
  const {t} = useContext(LocalizationContext);
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
              // onValueChange(item.value);
              setValue(item.value);
            }}
            value={valueProp && valueProp.value ? valueProp.value : value}>
            <TouchableOpacity
              onPress={() => {
                onValueChange(item);
                setValue(item.value);
              }}
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                },
                radioStyle || {},
              ]}>
              <RadioButton
                disabled={item?.disabled}
                value={item.value}
                color={COLORS.blue}
                uncheckedColor={COLORS.black}
              />

              <Text
                style={{
                  marginHorizontal: 10,
                  color: 'black',
                  flexWrap: 'wrap',
                }}>

                {/* {StringModifier(`${t(item?.label || item.value)}`)} */}
                {item?.label ? t(item?.label) : item.value}
              </Text>
            </TouchableOpacity>
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
