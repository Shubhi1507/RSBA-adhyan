import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Header, TextHandler, Button, DropDown} from '../../components/index';
import {screenWidth} from '../../libs';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import {Input} from '../../components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { goBack } from '../../navigation/NavigationService';

export default function VolunteerSignUpScreen() {
  const [volunteerInfo, setvolunteerInfo] = useState({
    first_name: '',
    pranth: '',
    jila: '',
    basti: '',
    phone: '',
  });

  const [miscControllers, setMiscControllers] = useState({
    pranth: false,
    jila: false,
    basti: false,
    pranthArr: [
      {
        key: 'pranth1',
        value: 'pranth1',
      },
      {
        key: 'pranth2',
        value: 'pranth2',
      },
    ],
    jilArr: [
      {
        key: 'jila1',
        value: 'jila1',
      },
      {
        key: 'jila2',
        value: 'jila2',
      },
    ],
    bastiArr: [
      {
        key: 'basti1',
        value: 'basti1',
      },
      {
        key: 'basti2',
        value: 'basti2',
      },
    ],
  });

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
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 19}}>
            Volunteer SignUp
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{backgroundColor: COLORS.blue}}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.container}
        scrollEnabled={true}>
        <View style={{flex: 0.4}}>
          <Header children={HeaderContent()} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Full Name</Text>
          <Input
            placeholder="First Name"
            name="first_name"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, first_name: text})
            }
            value={volunteerInfo.first_name}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Select Pranth</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, pranth: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, pranth: false});
            }}
            isFocused={miscControllers.pranth}
            isVisible={miscControllers.pranth}
            title={'Pranth'}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, pranth: item});
            }}
            optionsArr={miscControllers.pranthArr}
            error={'Pranth'}
            value={volunteerInfo.pranth}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Select Jilla</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, jila: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, jila: false});
            }}
            isFocused={miscControllers.jila}
            isVisible={miscControllers.jila}
            title={'Jila'}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, jila: item});
            }}
            optionsArr={miscControllers.jilArr}
            error={'Pranth'}
            value={volunteerInfo.jila}
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Select Nagar/Basti</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, basti: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, basti: false});
            }}
            isFocused={miscControllers.basti}
            isVisible={miscControllers.basti}
            title={'Basti'}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, basti: item});
            }}
            optionsArr={miscControllers.bastiArr}
            error={'Basti'}
            value={volunteerInfo.basti}
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Enter Phone Number</Text>
          <Input
            placeholder="Phone"
            name="phone"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, phone: text})
            }
            type={"numeric"}
            number={10}
            value={volunteerInfo.phone}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>
        <Button 
          title={'Next'}
          onPress={() => {}}
          ButtonContainerStyle={{marginVertical: 20}}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',

    // justifyContent: 'center',
    // backgroundColor:"teal"
  },
  textBox: {
    flex: 0.21,
    alignItems: 'flex-start',
    padding: 6,
    justifyContent: 'flex-start',
    textAlign: '' ,
  
  },

  headingInput: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    marginTop:3
  },

  input: {
    height: 55,
    margin: 5,
    borderWidth: 1,
    padding: 20,
    textAlign: 'left',
    color: 'black',
  },

  textInput: {
    height: 40,
    margin: 3,
    borderWidth: 1,
    padding: 10,
    textAlign: 'left',
    color: 'grey',
    marginTop: 2
  },
});
