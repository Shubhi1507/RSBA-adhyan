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
import {COLORS} from '../../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import {goBack, navigate} from '../../navigation/NavigationService';
import {useState} from 'react';
import {STRINGS} from '../../constants/strings';
import DatePicker from 'react-native-datepicker';
import {ROUTES} from '../../navigation/RouteConstants';
import { ADIcons, FAIcons } from '../../libs/VectorIcons';

export default function SelectAudienceScreen() {
  const [teacherInfo, setteacherInfo] = useState({
    teacher_name: '',
    phone_number: '',
    class_frequency: '',
    class_duration: '',
    place_used: '',
    audience: '',
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
    CENTRES: [
     
      {
        key: `Student's Parents (Past Students)`,
        value: `Student's Parents (Past Students)`,
      },
      {
        key: `Student's Parents (Current Students)`,
        value: `Student's Parents (Current Students)`,
      },
      {
        key: 'Past Student',
        value: 'Past Student',
      },
      {
        key: 'Current Student',
        value: 'Current Student',
      },
      {
        key: 'Teacher',
        value: 'Teacher',
      },
      {
        key: 'Kendra Sanchalak',
        value: 'Kendra Sanchalak',
      },
      {
        key: 'Basti',
        value: 'Basti',
      },
      {
        key: 'Prabuddha Jan',
        value: 'Prabuddha Jan',
      },
    ],
  });

  const [classControllers, setclassControllers] = useState({
    DURATION: [
      {
        key: '1 Hour',
        value: ' 1 Hour ',
      },
      {
        key: '1.5 Hours',
        value: '1.5 Hours',
      },
      {
        key: '2 Hours',
        value: '2 Hours',
      },

      {
        key: '2.5 Hours',
        value: '2.5 Hours',
      },
      {
        key: '3 Hours or more than 3 Hours',
        value: '3 Hours or more than 3 Hours',
      },
    ],
  });

  const [placeContainer, setplaceContainer] = useState({
    PLACE_USED: [
      {key: 'Smalll Room', value: 'Small Room '},
      {
        key: ' Hall',
        value: 'Hall',
      },
      {
        key: 'Study Room',
        value: 'Study Room',
      },

      {
        key: 'Ground or etc',
        value: ' Ground or etc',
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
            {STRINGS.LOGIN.AUDIENCE}
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
        <View>
          <TextHandler
            style={{
              color: 'black',
              fontWeight: '600',
              marginVertical: 20,
              fontSize: 20,
              textAlign: 'left',
            }}>
            {STRINGS.LOGIN.AUDIENCE}
          </TextHandler>
          <RadioButtons
            data={miscControllers.CENTRES}
            onValueChange={item => {
              setteacherInfo({...teacherInfo, audience: item});
            }}
          />
        </View>

        <Button
          title={'Next'}
          onPress={() => navigate(ROUTES.AUTH.SURVEYSCREEN)}
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
    fontWeight: '600',
    marginTop: 16,
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
