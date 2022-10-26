import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import {Header, TextHandler, Button} from '../../components/index';
import {screenWidth} from '../../libs';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';

export default function VolunteerSignUpScreen() {
  const [text, onChangeText] = React.useState('');

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
          <Image
            source={require('../../assets/user.png')}
            style={{tintColor: COLORS.white}}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 18}}>
            Volunteer SignUp
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
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Full Name</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}>

            </TextInput>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Select Pranth</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}>

            </TextInput>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Select Jilla</Text>

          <TextInput
            style={styles.input}
            onChangeText={onChangeText}></TextInput>
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Select Nagar/Basti</Text>

          <TextInput style={styles.input}onChangeText={onChangeText}>

          </TextInput>
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Enter Phone Number</Text>
          <TextInput style={styles.input}
            onChangeText={onChangeText}
            value={Number}>
          </TextInput>
        </View>
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
    textAlign: '',
  },

  headingInput: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },

  input: {
    height: 55,
    margin: 5,
    borderWidth: 1,
    padding: 20,
    textAlign: 'left',
    color: 'black',
  },
});
