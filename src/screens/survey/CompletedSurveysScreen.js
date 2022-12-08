import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
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
import {
  filterOutCompletedSurveys,
  filterOutSavedSurveys,
  FindAndUpdate,
} from '../../utils/utils';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {ROUTES} from '../../navigation/RouteConstants';
import {images} from '../../assets';

export default function CompletedSurveysScreen() {
  let [selectedCenter, setCenter] = useState({});
  const [error, setError] = useState({visible: false, message: ''});
  const {t} = useContext(LocalizationContext);
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const savedSurveyDataTmpArr = filterOutCompletedSurveys(totalSurveys);

  return (
    <View style={styles.container}>
      <View style={{maxHeight: 150, minHeight: 150}}>
        <Header title={t('COMPLETED_SURVEYS')} onPressBack={goBack} />
      </View>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View style={{margin: 20, flex: 0.75}}>
        <FlatList
          data={savedSurveyDataTmpArr}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  marginVertical: 9,
                  backgroundColor: COLORS.tile,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'center',
                  // height: 8,
                }}>
                {/* marker */}
                <View style={{flex: 0.15, paddingTop: 8}}>
                  <ADIcons name="checkcircleo" color={COLORS.blue} size={20} />
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
                          color: COLORS.black,
                        }}>
                        {t('CENTRE')} : {item.centre_id}
                      </TextHandler>
                    </View>
                  </View>
                </View>
              </View>
            );
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
