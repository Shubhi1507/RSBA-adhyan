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
  const [studentInfo, setstudentInfo] = useState({
    enrolled_students: '',
    regular_students: '',
  });

  const [regularControllers, setregularControllers] = useState({
    REGULAR_STUDENTS: [
      {
        key: 'Less than 10 ',
        value: 'Less than 10',
      },
      {
        key: '11 To 20',
        value: '11 To 20 ',
      },
      {
        key: '21 To 30',
        value: '21 To 30',
      },
      {
        key: '31 + ',
        value: ' 31 +',
      },
    ],
  });

  const [enrolledControllers, setenrolledControllers] = useState({
    ENROLLED_STUDENTS: [
      {
        key: 'Less than 10 ',
        value: 'Less than 10',
      },
      {
        key: '11 To 20',
        value: '11 To 20 ',
      },
      {
        key: '21 To 30',
        value: '21 To 30',
      },
      {
        key: '31 + ',
        value: ' 31 +',
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
        <PageIndicator index={3} />

        <View>
          <Text style={styles.headingInput}>
            {STRINGS.LOGIN.REGULAR_STUDENTS}
          </Text>
          <RadioButtons
            data={regularControllers.REGULAR_STUDENTS}
            onValueChange={item =>
              setstudentInfo({...studentInfo, regular_students: item})
            }
          />
        </View>

        <View>
          <Text style={styles.headingInput}>
            {STRINGS.LOGIN.ENROLLED_STUDENTS}
          </Text>
          <RadioButtons
            data={enrolledControllers.ENROLLED_STUDENTS}
            onValueChange={item =>
              setstudentInfo({...studentInfo, enrolled_students: item})
            }
          />
        </View>










        <View
          style={{
            marginTop: 60,
          }}>
          <Button
            title={'Next'}
            onPress={() => navigate(ROUTES.AUTH.SPLASHSCREEN)}
            ButtonContainerStyle={{
              marginVertical: 17,
              alignItems: 'center',
              textAlign: 'center',
            }}
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
    fontWeight: '600',
    marginTop: 18,
    fontSize: 16,
    margin: 5,
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
