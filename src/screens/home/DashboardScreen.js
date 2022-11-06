import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LoaderIndicator from '../../components/Loader';
import {Button, CustomSnackBar, Header, TextHandler} from '../../components';
import {COLORS} from '../../utils/colors';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import ADIcons from 'react-native-vector-icons/AntDesign';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import {screenWidth} from '../../libs';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation/RouteConstants';
import { ACTION_CONSTANTS } from '../../redux/actions/actions';

export default function DashboardScreen() {
  const [error, setError] = useState({visible: false, message: ''});
  const dispatch = useDispatch();

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

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>
      <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
        <View
          style={{
            flex: 0.22,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TextHandler style={{fontWeight: '500', fontSize: 18}}>
            Completed Surveys
          </TextHandler>
          <TextHandler style={{fontWeight: '500', fontSize: 18}}>2</TextHandler>
        </View>
        <View
          style={{
            flex: 0.22,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TextHandler style={{fontWeight: '500', fontSize: 18}}>
            Incompleted Surveys
          </TextHandler>
          <TextHandler style={{fontWeight: '500', fontSize: 18}}>2</TextHandler>
        </View>

        <Button
          title={'Start Survey'}
          onPress={() => navigate(ROUTES.AUTH.VOLUNTEERWELCOMESCREEN)}
          ButtonContainerStyle={{
            marginVertical: 20,
            alignItems: 'center',
            textAlign: 'center',
          }}
        />
        <Button
          title={'Logout'}
          onPress={() => dispatch({type: ACTION_CONSTANTS.LOGOUT_REQUEST})}
          ButtonContainerStyle={{
            marginVertical: 20,
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
