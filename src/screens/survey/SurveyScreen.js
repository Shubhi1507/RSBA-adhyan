import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {COLORS} from '../../utils/colors';
import {STRINGS} from '../../constants/strings';
import {
  Button,
  Header,
  Input,
  RadioButtons,
  TextHandler,
} from '../../components';
import {screenWidth, widthPercentageToDP} from '../../libs';
import commonQuestions from '../../tmp/common.json';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {useDispatch} from 'react-redux';
import {goBack} from '../../navigation/NavigationService';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
export default function SurveyScreen() {
  let [survey, updateSurvey] = useState(commonQuestions);
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
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 20}}>
            {STRINGS.LOGIN.SURVEY}
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
        <FlatList
          keyExtractor={() => Math.random().toFixed(5)}
          data={survey}
          renderItem={({item, index}) => {
            return (
              <View>
                <View style={{flexDirection: 'row', marginVertical: 20}}>
                  <View
                    style={{
                      backgroundColor: COLORS.orange,
                      height: 20,
                      width: 20,
                      borderRadius: 40,
                      justifyContent: 'flex-start',
                      marginRight: 5,
                    }}>
                    <TextHandler
                      style={{
                        color: 'black',
                        textAlign: 'center',
                      }}>
                      {index + 1}
                    </TextHandler>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-start',
                    }}>
                    <TextHandler
                      style={{
                        color: 'black',
                        // textAlign: 'left',
                      }}>
                      {item.question}
                    </TextHandler>
                  </View>
                </View>

                {item.type === 'a' && (
                  <Input
                    type={'numeric'}
                    placeholder="Enter answer here"
                    name="any"
                    onChangeText={text => {
                      let updatedItem = {...item, answer: text};

                      var new_obj = Object.assign(item, updatedItem);
                      console.log('2-->', new_obj);
                      let updatedSurvey = [
                        ...survey,
                        (survey[index] = new_obj),
                      ];
                      console.log('2-->', updatedSurvey);

                      // updateSurvey({...survey,  })
                    }}
                    value={item.answer}
                    message={''}
                    containerStyle={{
                      alignItems: 'center',
                      minWidth: screenWidth * 0.5,
                    }}
                  />
                )}
                {item.type === 'b' && (
                  <View>
                    <RadioButtons
                      radioStyle={{
                        borderWidth: 1,
                        marginVertical: 2,
                        borderColor: COLORS.orange,
                      }}
                      data={item.options}
                      onValueChange={item => {
                        console.log(item);
                      }}
                    />
                  </View>
                )}
              </View>
            );
          }}
        />
        <View></View>

        <Button
          title={'Next'}
          onPress={() => console.log('->', survey)}
          ButtonContainerStyle={{
            marginVertical: 17,
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
    fontWeight: '600',
    marginTop: 16,
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
