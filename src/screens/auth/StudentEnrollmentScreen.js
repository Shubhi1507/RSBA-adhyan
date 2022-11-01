import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {COLORS} from '../../utils/colors';
import {screenWidth} from '../../libs';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {
  Button,
  DropDown,
  Header,
  Input,
  PageIndicator,
  TextHandler,
} from '../../components/index';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation/RouteConstants';

export default function StudentEnrollmentScreen() {
  const [studentInfo, setstudentInfo] = useState({
    students_enrolled: ' ',
    regular_attendees: ' ',
  });

  const [miscControllers, setMiscControllers] = useState({
    students_enrolled: 'false',
    regular_attendees: 'false',
    studentArr: [
      {key: 'student 1', value: 'student 1'},
      {
        key: ' student 2',
        value: 'student 2 ',
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
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 18}}>
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

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <View>
          <PageIndicator index={3} />
          <View>
            <Text style={styles.headingInput}> No. of Students Enrolled</Text>
            <DropDown
              openAnchor={() => {
                setMiscControllers({
                  ...miscControllers,
                  students_enrolled: true,
                });
              }}
              closeAnchor={() => {
                setMiscControllers({
                  ...miscControllers,
                  students_enrolled: false,
                });
              }}
              isFocused={miscControllers.students_enrolled}
              isVisible={miscControllers.students_enrolled}
              title={''}
              onSelect={item => {
                setstudentInfo({...studentInfo, students_enrolled: item});
              }}
              optionsArr={miscControllers.studentArr}
              value={studentInfo.students_enrolled}
            />
          </View>

          <View>
            <Text style={styles.headingInput}> No. of Regular Attendees </Text>
            <DropDown
              openAnchor={() => {
                setMiscControllers({
                  ...miscControllers,
                  regular_attendees: true,
                });
              }}
              closeAnchor={() => {
                setMiscControllers({
                  ...miscControllers,
                  regular_attendees: false,
                });
              }}
              isFocused={miscControllers.regular_attendees}
              isVisible={miscControllers.regular_attendees}
              title={''}
              onSelect={item => {
                setstudentInfo({...studentInfo, regular_attendees: item});
              }}
              optionsArr={miscControllers.studentArr}
              value={studentInfo.regular_attendees}
            />
          </View>
        </View>

        <Button
          title={'Done'}
          // onPress={() => navigate(ROUTES.AUTH.VOLUNTEERPARENTALORGSCREEN)}
          onPress={() => goBack()}
          ButtonContainerStyle={{
            marginBottom: 40,
            alignItems: 'center',
            textAlign: 'center',
            padding: 20,
          }}
        />
      </View>
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
    marginTop: 20,
    justifyContent: 'flex-start',
  },

  headingInput: {
    color: 'black',
    fontWeight: '500',
    marginTop: 20,
    fontSize: 16,
    margin: 8,
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
