import * as React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {goBack} from '../navigation/NavigationService';
import {COLORS} from '../utils/colors';

export const PageIndicator = ({index}) => {
  return (
    <View
      style={{
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
        marginTop: 3,
      }}>
      <View
        style={{
          flex: 1,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            minHeight: 18,
            minWidth: 18,
            borderRadius: 10,
            borderColor: COLORS.orange,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {index == 1 && (
            <TouchableOpacity
              onPress={() => goBack()}
              style={{
                minHeight: 10,
                minWidth: 10,
                borderRadius: 5,
                padding: 5,
                backgroundColor: COLORS.orange,
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            minHeight: 20,
            minWidth: 20,
            borderRadius: 10,
            borderColor: COLORS.orange,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {index == 1 || index == 2 && (
            <TouchableOpacity
              onPress={() => goBack()}
              style={{
                minHeight: 10,
                minWidth: 10,
                borderRadius: 5,
                padding: 5,
                backgroundColor: COLORS.orange,
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            minHeight: 20,
            minWidth: 20,
            borderRadius: 10,
            borderColor: COLORS.orange,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          { index == 3 && (
            <TouchableOpacity
              onPress={() => goBack()}
              style={{
                minHeight: 10,
                minWidth: 10,
                borderRadius: 5,
                padding: 5,
                backgroundColor: COLORS.orange,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
