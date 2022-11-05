import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenWidth} from '../../libs';
import {
  Button,
  Header,
  Input,
  RadioButtons,
  TextHandler,
} from '../../components/index';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import {goBack, navigate} from '../../navigation/NavigationService';
import {useState} from 'react';
import {STRINGS} from '../../constants/strings';
import DatePicker from 'react-native-datepicker';
import {ROUTES} from '../../navigation/RouteConstants';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function VolunteerParentalOrgScreen() {
  const [volunteerInfo, setvolunteerInfo] = useState({
    parent_org: '',
    type_of_center: '',
    date_of_establishment: new Date(),
    center_head: '',
    center_contact: '',
  });
  const [miscControllers, setMiscControllers] = useState({
    CENTRES: [
      {
        key: 'Balsankar Kendra',
        value: 'Balsankar Kendra',
      },
      {
        key: 'Abyasika',
        value: 'Abyasika',
      },
      {
        key: 'Pathdaan Centre',
        value: 'Pathdaan Centre',
      },
      {
        key: 'Bal Gokuldham',
        value: 'Bal Gokuldham',
      },
      {
        key: 'Balwadi',
        value: 'Balwadi',
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
            Center Details
          </Text>
        </View>
      </View>
    );
  };

  function getAge(fromdate, todate) {
    let doe = fromdate;
    if (todate) todate = new Date(todate);
    else todate = new Date();
    console.log('fromdate', fromdate);
    var age = [],
      fromdate = new Date(fromdate),
      y = [todate.getFullYear(), fromdate.getFullYear()],
      ydiff = y[0] - y[1],
      m = [todate.getMonth(), fromdate.getMonth()],
      mdiff = m[0] - m[1],
      d = [todate.getDate(), fromdate.getDate()],
      ddiff = d[0] - d[1];

    if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) --ydiff;
    if (mdiff < 0) mdiff += 12;
    if (ddiff < 0) {
      fromdate.setMonth(m[1] + 1, 0);
      ddiff = fromdate.getDate() - d[1] + d[0];
      --mdiff;
    }
    if (ydiff > 0) age.push(ydiff + ' year' + (ydiff > 1 ? 's ' : ' '));
    if (mdiff > 0) age.push(mdiff + ' month' + (mdiff > 1 ? 's' : ''));
    if (mdiff < 0) mdiff += 11;
    if (ddiff > 0) age.push(ddiff + ' day' + (ddiff > 1 ? 's' : ''));
    if (age.length > 1) age.splice(age.length - 1, 0, ' and ');
    console.log('age.join("")', ydiff, mdiff, ddiff);
    setvolunteerInfo({
      ...volunteerInfo,
      date_of_establishment: doe,
    });
    return age.join('');
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <TextHandler
          style={{
            color: 'black',
            fontWeight: '600',
            marginVertical: 20,
            fontSize: 20,
            textAlign: 'left',
          }}>
          Center Details
        </TextHandler>
        <View style={{paddingVertical: 5}}>
          <Text style={styles.headingInput}>
            {STRINGS.LOGIN.TYPE_OF_CENTER}
          </Text>
          <RadioButtons
            data={miscControllers.CENTRES}
            onValueChange={item => {
              setvolunteerInfo({...volunteerInfo, type_of_center: item});
            }}
          />
        </View>
        <View style={{paddingVertical: 5}}>
          <Text style={styles.headingInput}>
            {STRINGS.LOGIN.CENTER_HD_NAME}
          </Text>
          <Input
            placeholder="Enter here"
            name="center_head"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, center_head: text})
            }
            value={volunteerInfo.center_head}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>

        <View style={{paddingVertical: 5}}>
          <Text style={styles.headingInput}>
            {STRINGS.LOGIN.CENTER_CONTACT_DETAILS}
          </Text>
          <Input
            placeholder="Enter here"
            name="center_contact"
            type={'numeric'}
            number={10}
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, center_contact: text})
            }
            value={volunteerInfo.center_contact}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>

        <View style={{paddingVertical: 5}}>
          <Text style={styles.headingInput}>{STRINGS.LOGIN.PARENT_ORG}</Text>
          <Input
            placeholder="Enter here"
            name="first_name"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, parent_org: text})
            }
            value={volunteerInfo.parent_org}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>

        {/* <View>
          <Text style={styles.headingInput}>{STRINGS.SIGNUP.DATE_OF_EST}</Text>

          <DatePicker
            date={volunteerInfo.date_of_establishment}
            mode="date"
            placeholder="Date of est."
            format="DD-MM-YYYY"
            minDate="05-10-1950"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
                borderColor: COLORS.backgroundColor,
              },
            }}
            onDateChange={newdate => {
              try {
                let [d, m, y] = newdate.split(/\D/);
                let date = new Date(y, m - 1, d);
                let difference = new Date().getTime() - date.getTime();
                console.log('difference', difference);
                if (difference < 0) {
                  setvolunteerInfo({
                    ...volunteerInfo,
                    date_of_establishment: new Date(),
                  });
                  return alert('Invalid date');
                } else {
                  getAge(date);
                }
              } catch (e) {
                console.log(e);
                return alert('Invalid date');
              }
            }}
          />
        </View> */}
        <Button
          title={'Next'}
          onPress={() => navigate(ROUTES.AUTH.VOLUNTEERTEACHERSCREEN)}
          ButtonContainerStyle={{
            marginVertical: 17,
            alignItems: 'center',
            textAlign: 'center',
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
