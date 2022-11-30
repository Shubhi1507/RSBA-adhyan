import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {COLORS} from '../../utils/colors';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {goBack} from '../../navigation/NavigationService';
import {screenWidth} from '../../libs';
import {Header} from '../../components';

export default function SavedSurveysScreen() {
  const store = useSelector(state => state);

  useEffect(() => {
    console.log('saved', store);
  }, [store]);

  const HeaderContent = () => {
    return (
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: screenWidth,
        }}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 0.33,
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <ADIcons name="left" color={COLORS.white} size={21} />
          </TouchableOpacity>
          <FAIcons name="user-circle-o" color={COLORS.white} size={21} />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 18}}>
            Review Surveys
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
