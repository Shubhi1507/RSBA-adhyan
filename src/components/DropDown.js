import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/colors';
import {Menu} from 'react-native-paper';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {KeyLiteralMapper} from '../libs/ErrorHandler';
import {screenWidth} from '../libs';

export function DropDown({
  openAnchor,
  isFocused,
  value,
  isVisible,
  closeAnchor,
  onSelect,
  optionsArr,
  key,
  title,
  error,
}) {
  return (
    <View
      style={{
        minWidth: screenWidth * 0.8,
        minHeight: 50,
        marginVertical: 7,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={openAnchor}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 20,
          borderColor: isFocused ? COLORS.blue : COLORS.orange,
        }}>
        <View
          style={{
            minHeight: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{textAlign: 'left', paddingRight: 20, color: COLORS.black}}>
            {value}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Menu
              contentStyle={{
                backgroundColor: COLORS.blue,
              }}
              visible={isVisible}
              onDismiss={closeAnchor}
              anchor={
                isFocused ? (
                  <TouchableOpacity onPress={closeAnchor}>
                    <ADIcons name="up" size={18} color={COLORS.black} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => openAnchor}>
                    <ADIcons name="down" size={18} color={COLORS.black} />
                  </TouchableOpacity>
                )
              }>
              <FlatList
                data={optionsArr}
                contentContainerStyle={{}}
                keyExtractor={() => Math.random().toFixed(5)}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <Menu.Item
                        style={{
                          backgroundColor: COLORS.blue,
                        }}
                        onPress={() => {
                          onSelect(item);
                          closeAnchor();
                        }}
                        title={item.value}
                        titleStyle={{
                          color: COLORS.white,
                        }}
                      />
                    </>
                  );
                }}
                ListEmptyComponent={
                  <Text
                    style={[
                      styles.errorMessage,
                      {textAlign: 'center', paddingHorizontal: 10},
                    ]}>
                    No Data
                  </Text>
                }
              />
            </Menu>
          </View>
        </View>
      </TouchableOpacity>
      {error != '' && error == key ? (
        <Text style={styles.errorMessage}>
          Please select a {KeyLiteralMapper(key)}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: COLORS.red,
  },
});
