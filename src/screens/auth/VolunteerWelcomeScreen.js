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
  TextHandler,
} from '../../components/index';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import {goBack, navigate} from '../../navigation/NavigationService';
import {useState} from 'react';
import {ROUTES} from '../../navigation/RouteConstants';
import FAIcons from 'react-native-vector-icons/FontAwesome';

export default function VolunteerWelcomeScreen() {
  const [volunteerInfo, setvolunteerInfo] = useState({
    state_pranth: '',
    city_nagar: '',
    district_jila: '',
    town_basti: '',
  });
  const [miscControllers, setMiscControllers] = useState({
    state_pranth: false,
    city_nagar: false,
    district_jila: false,
    town_basti: false,
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
    cityArr: [
      {
        key: 'city1',
        value: 'city1',
      },
      {
        key: 'city2',
        value: 'city2',
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
        <TextHandler
          style={{
            color: 'black',
            fontWeight: '600',
            marginTop: 40,
            fontSize: 20,
            textAlign: 'left',
          }}>
          Welcome , Shubhi Singh
        </TextHandler>
        <View>
          <Text style={styles.headingInput}>State/ Pranth</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, state_pranth: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, state_pranth: false});
            }}
            isFocused={miscControllers.state_pranth}
            isVisible={miscControllers.state_pranth}
            title={''}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, state_pranth: item.value});
            }}
            optionsArr={miscControllers.pranthArr}
            error={'Pranth'}
            value={volunteerInfo.state_pranth}
          />
        </View>
        <View>
          <Text style={styles.headingInput}>City / Nagar</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, city_nagar: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, city_nagar: false});
            }}
            isFocused={miscControllers.city_nagar}
            isVisible={miscControllers.city_nagar}
            title={''}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, city_nagar: item.value});
            }}
            optionsArr={miscControllers.cityArr}
            error={'City'}
            value={volunteerInfo.city_nagar}
          />
        </View>
        <View>
          <Text style={styles.headingInput}>District / Jilla</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, district_jila: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, district_jila: false});
            }}
            isFocused={miscControllers.district_jila}
            isVisible={miscControllers.district_jila}
            title={''}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, district_jila: item.value});
            }}
            optionsArr={miscControllers.jilArr}
            error={'Jila'}
            value={volunteerInfo.district_jila}
          />
        </View>

        <View>
          <Text style={styles.headingInput}>Town/Basti</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, town_basti: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, town_basti: false});
            }}
            isFocused={miscControllers.town_basti}
            isVisible={miscControllers.town_basti}
            title={''}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, town_basti: item.value});
            }}
            optionsArr={miscControllers.bastiArr}
            error={'Jila'}
            value={volunteerInfo.town_basti}
          />
        </View>

        <Button
          title={'Next'}
          onPress={() => navigate(ROUTES.AUTH.VOLUNTEERPARENTALORGSCREEN)}
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
    marginTop: 10,
    justifyContent: 'flex-start',
  },

  headingInput: {
    color: 'black',
    fontWeight: '500',
    marginTop: 15,
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
