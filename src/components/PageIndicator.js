import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {COLORS} from '../utils/colors';

export const PageIndicator = ({index}) => {
  return (
    <View style={{}}>
      {/* <View
        style={{
          marginVertical: 20,
          position: 'absolute',
          top: 0,
          alignSelf: 'center',
          height: 2,
          width: Dimensions.get('window').width,

          backgroundColor: COLORS.black,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      /> */}
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          height: 80,
          marginTop: 10,
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
              minHeight: 20,
              minWidth: 20,
              borderRadius: 10,
              borderColor: COLORS.orange,
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {index == 1 && (
              <View
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
            {index == 2 && (
              <View
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
            {index == 3 && (
              <View
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
    </View>
  );
};
