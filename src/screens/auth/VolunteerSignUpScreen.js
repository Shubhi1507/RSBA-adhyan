import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Header, TextHandler, Button, DropDown} from '../../components/index';
import {screenWidth} from '../../libs';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import {Input} from '../../components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation/RouteConstants';
import {useEffect} from 'react';
import {
  getListofColonies,
  getListofDistricts,
} from '../../networking/API.controller';
import {useDispatch, useSelector} from 'react-redux';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import LoaderIndicator from '../../components/Loader';
import FAIcons from 'react-native-vector-icons/FontAwesome';

export default function VolunteerSignUpScreen() {
  const store = useSelector(state => state.BastiListReducer);
  const dispatch = useDispatch();
  const [volunteerInfo, setvolunteerInfo] = useState({
    first_name: '',
    pranth: '',
    jila: '',
    basti: '',
    phone: '',
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [miscControllers, setMiscControllers] = useState({
    pranth: false,
    jila: false,
    basti: false,
    pranthArr: [],
    bastiArr: [],
    jilArr: [],
  });

  useEffect(() => {
    getListOfDistricts();
  }, []);

  useEffect(() => {}, [store.bastiList]);

  const getListOfDistricts = async () => {
    setDataLoading(true);
    const data = await getListofDistricts();
    if (data && data.data && Array.isArray(data.data)) {
      let temp = data.data;
      let emptyJila = [];
      temp.forEach(el => {
        emptyJila.push({key: el.id, value: el.name});
      });
      setMiscControllers({
        ...miscControllers,
        jilArr: emptyJila,
        jila: false,
      });
    } else {
      setMiscControllers({
        ...miscControllers,
        jilArr: [],
        jila: false,
      });
    }
    setDataLoading(false);
  };

  const getColoniesBasedUponDistrictID = async id => {
    try {
      const data = await getListofColonies(id);

      if (data && data.data && Array.isArray(data.data)) {
        console.log('data basti', data);
        let temp = data.data;
        let emptyNagar = [];
        temp.forEach(el => {
          emptyNagar.push({key: el.id, value: el.name});
        });
        console.log('temp', temp);
        dispatch({
          type: ACTION_CONSTANTS.UPDATE_BASTI_LIST,
          payload: emptyNagar,
        });
      } else {
        dispatch({
          type: ACTION_CONSTANTS.CLEAR_BASTI_LIST,
        });
      }
      setDataLoading(false);
    } catch (error) {
      console.log(error);
      setDataLoading(false);
    }
  };

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
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 19}}>
            Volunteer SignUp
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />

      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
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
          <Text style={styles.headingInput}>Pranth</Text>
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
              setMiscControllers({...miscControllers, pranth: false});
            }}
            optionsArr={miscControllers.pranthArr}
            error={'Pranth'}
            value={volunteerInfo.pranth}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Jilla</Text>
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
              setvolunteerInfo({...volunteerInfo, jila: item.value, basti: ''});
              setMiscControllers({...miscControllers, jila: false});
              dispatch({
                type: ACTION_CONSTANTS.CLEAR_BASTI_LIST,
              });
              setDataLoading(true);
              getColoniesBasedUponDistrictID(item.key);
            }}
            optionsArr={miscControllers.jilArr}
            error={'Pranth'}
            value={volunteerInfo.jila}
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Nagar/Basti</Text>
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
              setvolunteerInfo({...volunteerInfo, basti: item.value});
              setMiscControllers({...miscControllers, basti: false});
            }}
            optionsArr={store.bastiList}
            error={'Basti'}
            value={volunteerInfo.basti}
          />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Phone Number</Text>
          <Input
            placeholder="Phone"
            name="phone"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, phone: text})
            }
            type={'numeric'}
            number={10}
            value={volunteerInfo.phone}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>
        <Button
          title={'Done'}
          onPress={() => navigate(ROUTES.AUTH.VOLUNTEERWELCOMESCREEN)}
          ButtonContainerStyle={{marginVertical: 20}}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textBox: {
    // flex: 0.21,
    // alignItems: 'flex-start',
    // padding: 6,
    // justifyContent: 'flex-start',
    // textAlign: '',
  },

  headingInput: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 3,
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
    marginTop: 2,
  },
});
