import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {COLORS} from '../../utils/colors';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {goBack, navigate} from '../../navigation/NavigationService';
import {screenWidth} from '../../libs';
import {Button, CustomCheckbox, CustomSnackBar, Header} from '../../components';
import LocalizationContext from '../../context/LanguageContext';
import {filterOutSavedSurveys} from '../../utils/utils';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {ROUTES} from '../../navigation/RouteConstants';

export default function SavedSurveysScreen() {
  let [selectedCenter, setCenter] = useState({});
  const [error, setError] = useState({visible: false, message: ''});
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const savedSurveyDataTmpArr = filterOutSavedSurveys(totalSurveys);

  const pageNavigator = () => {
    if (selectedCenter) {
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
            Review Surveys
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
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View style={{margin: 20}}>
        <FlatList
          data={savedSurveyDataTmpArr}
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
          title={'Review Survey'}
          onPress={() => {
            pageNavigator();
          }}
          ButtonContainerStyle={{
            alignItems: 'center',
            textAlign: 'center',
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
});
