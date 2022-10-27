import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {screenWidth} from '../../libs';
import {Header} from '../../components/index';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import {goBack} from '../../navigation/NavigationService';

export default function VolunteerWelcomeScreen() {
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
          <TouchableOpacity onPress={() => goBackk()}>
            <ADIcons name="left" color={COLORS.white} size={21} />
          </TouchableOpacity>
          <Image
            source={require('../../assets/user.png')}
            style={{tintColor: COLORS.white}}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 18}}>
            Survey
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.40}}>
        <Header children={HeaderContent()} />
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            marginTop: 40,
            fontSize: 20,
          }}>
          Welcome , Shubhi Singh
        </Text>
        <View>
          <Text style={styles.headingInput}>Pranth</Text>
          <TextInput style={styles.textInput}>Please enter pranth</TextInput>
        </View>
        <View>
          <Text style={styles.headingInput}>City / Nagar</Text>
          <TextInput style={styles.textInput}>Please mention City</TextInput>
        </View>
        <View>
          <Text style={styles.headingInput}>
            Please mention District / Jilla
          </Text>
          <TextInput style={styles.textInput}> PLease mention District / Jilla</TextInput>
        </View>

        <View>
          <Text style={styles.headingInput}>Town/Basti</Text>
          <TextInput style={styles.textInput}> Please Town/Basti</TextInput>
        </View>

        <View></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:"teal"
  },
  textBox: {
    flex: 0.45,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 12,
    justifyContent: 'flex-start',
  },

  headingInput: {
    color: 'black',
    fontWeight: '500',
    marginTop: 30,
    fontSize: 16,
    margin: 6,
  },

  textInput: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    textAlign: 'left',
    color: 'grey',
  },
});
