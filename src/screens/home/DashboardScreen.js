import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React from 'react';
import LoaderIndicator from '../../components/Loader';
import {Button, CustomSnackBar, Header, TextHandler} from '../../components';
import {COLORS} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {screenWidth} from '../../libs';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation/RouteConstants';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {useEffect} from 'react';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

export default function DashboardScreen() {
  const [error, setError] = useState({visible: false, message: ''});
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  const name = store?.authReducer?.userData?.userData?.data[0]?.name;
  const completedSurvey = store?.surveyReducer?.completedSurvey;

  const [CENTER_DATA, SET_CENTRE_DATA] = useState([
    {key: '301', value: '301'},
    {key: '302', value: '302'},
    {key: '303', value: '303'},
    {key: '304', value: '304'},
    {key: '305', value: '305'},

  ]);

  useEffect(() => {
    console.log('survey', completedSurvey);
  }, []);

  useEffect(() => {
    dispatch({type: ACTION_CONSTANTS.CLEAR_BASTI_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_DISTRICTS_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_STATE_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_SURVEY});
  }, []);

  const renderItem = ({item}) => {
    return <Text style={{color: 'black'}}>{'jgv'}</Text>;
  };

  const pageNavigator = () => {
    let CENTRES = [
      {
        key: `Student's Parents (Past Students)`,
        value: `Student's Parents (Past Students)`,
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: `Student's Parents (Current Students)`,
        value: `Student's Parents (Current Students)`,
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Past Student',
        value: 'Past Student',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Current Student',
        value: 'Current Student',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Teacher',
        value: 'Teacher',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Kendra Sanchalak',
        value: 'Kendra Sanchalak',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Basti',
        value: 'Basti',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Prabuddha Jan',
        value: 'Prabuddha Jan',
        disabled: false,
        checked: false,
        completed: false,
      },
    ];

    dispatch({
      type: ACTION_CONSTANTS.UPDATE_SURVEY_STATUS,
      payload: CENTRES,
    });

    navigate(ROUTES.AUTH.VOLUNTEERWELCOMESCREEN);
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
            Volunteer Dashboard
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
      <View style={{flex: 1, justifyContent: 'space-around', paddingHorizontal: 15}}>
        <TextHandler
          style={{fontWeight: '700', fontSize: 23, paddingBottom: 30}}>
          Welcome {name && `, ${name}`}
        </TextHandler>
        <View
          style={{
            flex: 0.12,
            justifyContent: 'space-between',
            flexDirection: 'row',
            
          }}>
          <TextHandler style={{fontWeight: '400', fontSize: 18}}>
            Completed Surveys
          </TextHandler>
          <TextHandler
            style={{
              fontWeight: '400',
              fontSize: 16,
              backgroundColor: 'green',
              color: 'white',
              padding: 8,
            }}>
            {completedSurvey || 2}
          </TextHandler>
        </View>
        <View
          style={{
            flex: 0.12,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TextHandler style={{fontWeight: '400', fontSize: 18}}>
            Incomplete Surveys
          </TextHandler>

          <View
            style={{
              marginTop: 0,
            }}>
            <TextHandler
              style={{
                fontWeight: '400',
                fontSize: 16,
                color: 'white',
                backgroundColor: 'red',
                padding: 8,
              }}>
              2
            </TextHandler>
          </View>
        </View>

        <View
          style={{
            flex: 0.12,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flex: 0.8}}>
            <TextHandler style={{fontWeight: '400', fontSize: 18}}>
              Save & Review Questions
            </TextHandler>
            <Text style={{color: 'grey', fontSize: 12, fontWeight: '400'}}>
              Completed survey will remain in this section for 48 hours to
              review
            </Text>
          </View>
          <View
            style={{
              marginTop: 0,
            }}>
            <TextHandler
              style={{
                fontWeight: '400',
                fontSize: 16,
                backgroundColor: 'red',
                padding: 8,
                color: 'white',
              }}>
              3
            </TextHandler>
          </View>
        </View>

        <View style={styles.headingInput}>
          <TextHandler
            style={{fontWeight: '600', fontSize: 18, paddingBottom: 30}}>
            Assigned Centres
          </TextHandler>
        </View>
        <View style={{flex: 0.25}}>
          <FlatList
            scrollEnabled
            data={CENTER_DATA}
            renderItem={({item, index}) => {
              return (
                <TextHandler style={{color: 'black' , paddingBottom:8, fontSize:17, fontWeight:"400"}}>CENTER ID {item.key}</TextHandler>
              );
            }}
            // keyExtractor={item => item.id}
          />
        </View>

        <Button
          title={'Start Survey'}
          onPress={() => {
            pageNavigator();
          }}
          ButtonContainerStyle={{
             alignItems: 'center',
             textAlign: 'center',
             
          }}
        />
        
        <Button
          title={'Logout'}
          onPress={() => {
            Alert.alert('Logout?', '', [
              {
                text: 'Yes',
                onPress: () =>
                  dispatch({type: ACTION_CONSTANTS.LOGOUT_REQUEST}),
              },
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ]);
          }}
          ButtonContainerStyle={{
            marginVertical: 50,
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: COLORS.error,
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
