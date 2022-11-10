import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenWidth} from '../../libs';
import {
  Button,
  CustomSnackBar,
  DropDown,
  Header,
  Input,
  TextHandler,
} from '../../components/index';
import {COLORS} from '../../utils/colors';
import {goBack, navigate} from '../../navigation/NavigationService';
import {useState} from 'react';
import {ROUTES} from '../../navigation/RouteConstants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListofColonies,
  getListofDistricts,
  getListofStates,
} from '../../networking/API.controller';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import LoaderIndicator from '../../components/Loader';
import { ADIcons, FAIcons } from '../../libs/VectorIcons';

export default function CenterDetailsOneScreen() {
  const store = useSelector(state => state.RegionReducer);
  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState({visible: false, message: ''});

  const [volunteerInfo, setvolunteerInfo] = useState({
    state_pranth: '',
    district_jila: '',
    town_basti: '',
    address: '',
  });
  const [miscControllers, setMiscControllers] = useState({
    state_pranth: false,
    district_jila: false,
    town_basti: false,
    pranthArr: [],
    jilArr: [],
    bastiArr: [],
    cityArr: [],
  });

  useEffect(() => {
    getListofStatesFunction();
  }, []);

  useEffect(() => {}, [store.bastiList, store.stateList, store.districtList]);

  const getListofStatesFunction = async () => {
    setDataLoading(true);
    const data = await getListofStates();
    if (data && data.data && Array.isArray(data.data)) {
      let temp = data.data;
      let states = [];
      temp.forEach(el => {
        states.push({key: el.id, value: el.name});
      });
      console.log('states>', states);
      dispatch({
        type: ACTION_CONSTANTS.UPDATE_STATE_LIST,
        payload: states,
      });
    } else {
      dispatch({type: ACTION_CONSTANTS.CLEAR_STATE_LIST});
    }
    setDataLoading(false);
  };

  const getListOfDistrictsfunc = async id => {
    setDataLoading(true);
    const data = await getListofDistricts(id);
    if (data && data.data && Array.isArray(data.data)) {
      let temp = data.data;
      let districts = [];
      temp.forEach(el => {
        districts.push({key: el.id, value: el.name});
      });
      console.log('districts', districts);
      dispatch({
        type: ACTION_CONSTANTS.UPDATE_DISTRICTS_LIST,
        payload: districts,
      });
    } else {
      dispatch({type: ACTION_CONSTANTS.CLEAR_DISTRICTS_LIST});
    }
    setDataLoading(false);
  };

  const getColoniesBasedUponDistrictID = async id => {
    setDataLoading(true);
    try {
      const data = await getListofColonies(id);

      if (data && data.data && Array.isArray(data.data)) {
        let temp = data.data;
        let towns = [];
        temp.forEach(el => {
          towns.push({key: el.id, value: el.name});
        });
        console.log('towns', temp);
        dispatch({
          type: ACTION_CONSTANTS.UPDATE_BASTI_LIST,
          payload: towns,
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
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 18}}>
            Center Details
          </Text>
        </View>
      </View>
    );
  };

  const pageValidator = () => {
    const {address, district_jila, state_pranth, town_basti} = volunteerInfo;
    // if (!state_pranth) {
    //   return setError({
    //     visible: true,
    //     message: 'Please select a State/ Pranth',
    //   });
    // }
    // if (!district_jila) {
    //   return setError({
    //     visible: true,
    //     message: 'Please select a District/ Jila',
    //   });
    // }
    // if (!town_basti) {
    //   return setError({
    //     visible: true,
    //     message: 'Please select a Town/ Basti',
    //   });
    // }
    // if (!address) {
    //   return setError({
    //     visible: true,
    //     message: 'Please add address',
    //   });
    // }
    dispatch({
      type: ACTION_CONSTANTS.UPDATE_SURVEY_FORM,
      payload: volunteerInfo,
    });
    navigate(ROUTES.AUTH.VOLUNTEERPARENTALORGSCREEN);
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <TextHandler
          style={{
            color: 'black',
            fontWeight: '600',
            marginTop: 40,
            fontSize: 20,
            textAlign: 'left',
          }}>
          Center Details
        </TextHandler>
        <View>
          <Text style={styles.headingInput}>Pranth</Text>
          {/* states */}
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
              getListOfDistrictsfunc(item.key);
            }}
            optionsArr={store?.stateList || []}
            error={'Pranth'}
            value={volunteerInfo.state_pranth}
          />
        </View>
        <View>
          <Text style={styles.headingInput}>District/ Jilla</Text>
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
              setvolunteerInfo({
                ...volunteerInfo,
                district_jila: item.value,
                town_basti: '',
              });
              getColoniesBasedUponDistrictID(item.key);
            }}
            optionsArr={store?.districtList || []}
            error={'Jila'}
            value={volunteerInfo.district_jila}
          />
        </View>
        <View>
          <Text style={styles.headingInput}>Centre ID</Text>
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
            optionsArr={store?.bastiList || []}
            error={'City'}
            value={volunteerInfo.town_basti}
          />
        </View>

        {/* <Text style={styles.headingInput}>Address</Text>
        <Input
          placeholder="Enter here"
          name="first_name"
          onChangeText={text =>
            setvolunteerInfo({...volunteerInfo, address: text})
          }
          value={volunteerInfo.address}
          message={'error'}
          containerStyle={{alignItems: 'center'}}
        /> */}

        <Button
          title={'Next'}
          onPress={pageValidator}
          ButtonContainerStyle={{
            marginVertical: 20,
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
