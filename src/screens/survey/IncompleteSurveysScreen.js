import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {screenWidth} from '../../libs';
import {goBack, navigate} from '../../navigation/NavigationService';
import {COLORS} from '../../utils/colors';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {Button, CustomCheckbox, CustomSnackBar, Header} from '../../components';
import LocalizationContext from '../../context/LanguageContext';
import {useDispatch, useSelector} from 'react-redux';
import {ROUTES} from '../../navigation/RouteConstants';
import {filterOutIncompleteSurveys} from '../../utils/utils';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';

export default function IncompleteSurveysScreen() {
  let [selectedCenter, setCenter] = useState({});
  const [error, setError] = useState({visible: false, message: ''});

  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const incompleteSurveyDataTmpArr = filterOutIncompleteSurveys(totalSurveys);

  useEffect(() => {
    setCenter({});
  }, []);

  const pageNavigator = () => {
    console.log('selectedCenter', selectedCenter);
    if (Object.keys(selectedCenter).length > 0) {
      console.log('old payload', selectedCenter);
      dispatch({
        type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
        payload: selectedCenter,
      });
      navigate(ROUTES.AUTH.CENTREDETAILSONESCREEN);
    } else
      return setError({
        visible: true,
        message: 'Please select centre',
      });
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.25}}>
        <Header
          title={t('INCOMPLETE_SUVEYS') + ' ' + t('SURVEY')}
          onPressBack={goBack}
        />
      </View>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View style={{margin: 20}}>
        <FlatList
          data={incompleteSurveyDataTmpArr}
          renderItem={({item, index}) => {
            return (
              <CustomCheckbox
                label={'Centre ID : ' + item.centre_id}
                completed={false}
                status={
                  selectedCenter && selectedCenter?.centre_id
                    ? selectedCenter?.centre_id === item.centre_id
                    : false
                }
                attempted={false}
                onPress={() => {
                  setCenter(item);
                }}
                customTextStyle={
                  selectedCenter
                    ? selectedCenter?.centre_id === item.centre_id
                      ? {color: COLORS.buttonColor}
                      : {color: COLORS.black}
                    : {color: COLORS.black}
                }
              />
            );
          }}
        />
      </View>
      <View>
        <Button
          title={'Continue Survey'}
          onPress={() => {
            pageNavigator();
          }}
          ButtonContainerStyle={{
            alignItems: 'center',
            textAlign: 'center',
            marginHorizontal: 20,
            // width: screenWidth * 0.8,
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
