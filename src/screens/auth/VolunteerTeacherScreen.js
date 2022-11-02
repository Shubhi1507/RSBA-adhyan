import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {screenWidth} from '../../libs';
import {
  Button,
  DropDown,
  Header,
  Input,
  PageIndicator,
  RadioButtons,
  TextHandler,
} from '../../components/index';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import {goBack, navigate} from '../../navigation/NavigationService';
import {useState} from 'react';
import {STRINGS} from '../../constants/strings';
import DatePicker from 'react-native-datepicker';
import {ROUTES} from '../../navigation/RouteConstants';
import FAIcons from 'react-native-vector-icons/FontAwesome';

export default function VolunteerTeacherScreen() {
  const [teacherInfo, setteacherInfo] = useState({
    teacher_name: '',
    phone_number: '',
    class_frequency: '',
    class_duration: '',
  });
  const [miscControllers, setmisControllers] = useState({
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
          <FAIcons name="user-circle-o" color={COLORS.white} size={21} />
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
            placeholder="Enter here"
            name="first_name"
            onChangeText={text =>
              setteacherInfo({...teacherInfo, teacher_name: text})
            }
            value={teacherInfo.teacher_name}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>
        <View>
          <Text style={styles.headingInput}>Enter Phone Number</Text>
          <Input
            placeholder="Enter here"
            name="phone_no"
            onChangeText={text =>
              setteacherInfo({...teacherInfo, phone_number: text})
            }
            type={'numeric'}
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
            data={miscControllers.CLASS_FREQUENCY}
            onValueChange={item =>
              setteacherInfo({...teacherInfo, class_frequency: item})
            }
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headingInput}>
            {STRINGS.SIGNUP.DURATION_OF_CLASS}
          </Text>

          <Input
            placeholder="Select"
            name="class_duration"
            onChangeText={text =>
              setteacherInfo({...teacherInfo, class_duration: text})
            }
            type={'numeric'}
            value={teacherInfo.class_duration}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>

        <Button
          title={'Next'}
          onPress={() => navigate(ROUTES.AUTH.STUDENTENROLLMENTSCREEN)}
          ButtonContainerStyle={{
            marginVertical: 17,
            alignItems: 'center',
            textAlign: 'center',
          }}
        />
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
