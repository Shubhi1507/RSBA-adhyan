import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {COLORS} from '../../utils/colors';
import {ADIcons, EnIcons, FAIcons} from '../../libs/VectorIcons';
import {goBack, navigate} from '../../navigation/NavigationService';
import {screenWidth} from '../../libs';
import {
  Button,
  CustomCheckbox,
  CustomSnackBar,
  Header,
  TextHandler,
} from '../../components';
import LocalizationContext from '../../context/LanguageContext';
import {filterOutSavedSurveys} from '../../utils/utils';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {ROUTES} from '../../navigation/RouteConstants';
import {images} from '../../assets';

export default function SavedSurveysScreen() {
  let [selectedCenter, setCenter] = useState({});
  const [error, setError] = useState({visible: false, message: ''});
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const savedSurveyDataTmpArr = filterOutSavedSurveys(totalSurveys);

  const pageNavigator = () => {
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
        message: 'Please select a centre',
      });
  };

  const timeRemainingCalcution = item => {
    if (item && item?.release_date) {
      console.log('item', item.release_date);
      const total = Date.parse(item.release_date) - Date.parse(new Date());
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor(total / (1000 * 60 * 60));
      console.log(hours, minutes, 'left');
      return hours + ':' + minutes + '   ';
    } else return '';
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header title={t('REVIEW_SURVEYS')} onPressBack={goBack} />
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
              // <CustomCheckbox
              //   label={'Centre ID : ' + item.centre_id}
              //   completed={false}
              //   status={
              //     selectedCenter && selectedCenter?.centre_id
              //       ? selectedCenter?.centre_id === item.centre_id
              //       : false
              //   }
              //   attempted={false}
              //   onPress={() => {
              //     setCenter(item);
              //   }}
              //   customTextStyle={
              //     selectedCenter
              //       ? selectedCenter?.centre_id === item.centre_id
              //         ? {color: COLORS.buttonColor}
              //         : {color: COLORS.black}
              //       : {color: COLORS.black}
              //   }
              // />

              <TouchableOpacity
                style={{
                  flex: 1,
                  marginVertical: 9,
                  backgroundColor: COLORS.tile,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'center',
                  // height: 8,
                }}
                onPress={() => {
                  setCenter(item);
                }}>
                {/* marker */}
                <View style={{flex: 0.15, paddingTop: 8}}>
                  {selectedCenter?.centre_id === item.centre_id ? (
                    <ADIcons
                      name="checkcircleo"
                      color={COLORS.blue}
                      size={20}
                    />
                  ) : (
                    <EnIcons name="circle" color={COLORS.blue} size={20} />
                  )}
                </View>
                {/* other labels */}
                <View style={{flex: 1}}>
                  <View style={{flex: 0.2, flexDirection: 'row'}}>
                    <View
                      style={{
                        flex: 1,
                        paddingVertical: 5,
                      }}>
                      <TextHandler
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          lineHeight: 22,
                          color:
                            selectedCenter?.centre_id === item.centre_id
                              ? COLORS.blue
                              : COLORS.black,
                        }}>
                        {item.centre_id}
                      </TextHandler>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <TextHandler
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          lineHeight: 22,
                          textAlign: 'center',
                          color: COLORS.black,
                          textTransform: 'lowercase',
                        }}>
                        {timeRemainingCalcution(item)}
                      </TextHandler>
                      <Image
                        source={images.time}
                        style={{height: 15, width: 15}}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
            marginHorizontal: 20,
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
