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
import {goBack} from '../../navigation/NavigationService';
import {useState} from 'react';
import {STRINGS} from '../../constants/strings';

export default function VolunteerParentalOrgScreen() {
  const [volunteerInfo, setvolunteerInfo] = useState({
    parent_org: '',
    address: '',
    city: '',
    pincode: '',
    type_of_center: '',
    date_of_establishment: '',
  });
  const [miscControllers, setMiscControllers] = useState({
    CENTRES: [
      {
        key: 'Balsankar Kendra',
        value: 'Balsankar Kendra',
      },
      {
        key: 'Abhyasika',
        value: 'Abhyasika',
      },
      {
        key: 'Pathdaan Centre',
        value: 'Pathdaan Centre',
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
      <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <PageIndicator index={1} />
        <View>
          <Text style={styles.headingInput}>Parental Organisation</Text>
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
        <View>
          <Text style={styles.headingInput}>Address</Text>
          <Input
            placeholder="Enter here"
            name="first_name"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, address: text})
            }
            value={volunteerInfo.address}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.headingInput}>City</Text>
            <Input
              placeholder="Enter here"
              name="first_name"
              onChangeText={text =>
                setvolunteerInfo({...volunteerInfo, city: text})
              }
              value={volunteerInfo.city}
              message={'error'}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.4,
              }}
            />
          </View>
          <View>
            <Text style={styles.headingInput}>Pincode</Text>
            <Input
              placeholder="Enter here"
              name="first_name"
              onChangeText={text =>
                setvolunteerInfo({...volunteerInfo, pincode: text})
              }
              value={volunteerInfo.pincode}
              message={'error'}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.4,
              }}
            />
          </View>
        </View>

        <View>
          <Text style={styles.headingInput}>
            {STRINGS.LOGIN.TYPES_OF_CENTERS}
          </Text>
          <RadioButtons
            data={miscControllers.CENTRES}
            onValueChange={item => {
              setvolunteerInfo({...volunteerInfo, type_of_center: item});
            }}
          />
        </View>

        <Button
          title={'Next'}
          onPress={() => {}}
          ButtonContainerStyle={{
            marginVertical: 20,
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
