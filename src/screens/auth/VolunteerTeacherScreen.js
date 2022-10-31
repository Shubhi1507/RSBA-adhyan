import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Header, Input, PageIndicator, RadioButtons} from '../../components';
import {COLORS} from '../../utils/colors';
import {screenWidth} from '../../libs';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {STRINGS} from '../../constants/strings';

export default function VolunteerTeacherScreen() {
  const [teacherInfo, setTeacherInfo] = useState({
    teacher_name: ' ',
    phone_number: ' ',
    class_frequency: ' ',
    class_duration: ' ',
  });

  const [miscControllers, sermisControllers] = useState({
    CLASS_FREQUENCY: [
      {
        key: 'Daily',
        value: 'Daily',
      },
      {
        key: 'BiWeekly',
        value: 'Biweekly',
      },
      {
        key: 'Weekly',
        value: 'Weekly',
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
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 20}}>
            Survey
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
      <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <PageIndicator index={2} />
        <View>
          <Text style={styles.headingInput}>Teacher Name</Text>
          <Input
            placeholder="Enter Here"
            name="first_name"
            OnChangeText={text =>
              setTeacherInfo({...teacherInfo, teacher_name: text})
            }
            value={teacherInfo.teacher_name}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headingInput}> Enter Phone Number</Text>
          <Input
            placeholder="Phone"
            name="phone"
            OnChangeText={text =>
              setTeacherInfo({...teacherInfo, phone_number: text})
            }
            type={'numeric'}
            number={10}
            value={teacherInfo.phone_number}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>

        <View>
          <Text style={styles.headingInput}>
            {STRINGS.LOGIN.CLASS_FREQUENCY}
          </Text>
          <RadioButtons
          data ={miscControllers.CLASS_FREQUENCY}
           onValueChange = {item => setTeacherInfo({...teacherInfo , class_frequency: item})}
          
          />

          

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

    // alignItems: 'center',
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
    marginTop: 8,
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
