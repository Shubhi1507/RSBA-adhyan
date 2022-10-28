import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Pressable} from 'react-native';
import React from 'react';
import {screenWidth} from '../../libs';
import {Header} from '../../components/index';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react';

export default function VolunteerWelcomeScreen() {
  const type_of_centre = [
    {value: 'Balsankar Kendra'},
    {value: 'Abyasika'},
    {value: 'Pathdaan Cntre'},
  ];
  const[centre, setCentre] = useState({
    centre_type: '',
  });
  const HeaderContent = () => {
    const {centre_type} = type_of_centre;
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
          <TouchableOpacity onPress={() => goBackk()}>
            <ADIcons name="left" color={COLORS.white} size={21} />
          </TouchableOpacity>
          <Image
            source={require('../../assets/user.png')}
            style={{tintColor: COLORS.white}}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 20}}>
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
      <View>
        <View>
          <Text style={styles.headingInput}>Parent Organisation</Text>
          <TextInput style={styles.textInput}>Enter Text Here</TextInput>
        </View>
        <View>
          <Text style={styles.headingInput}>Phone Number </Text>
          <TextInput style={styles.textInput}>Please enter here</TextInput>
        </View>

<View style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>

<View style={{flex:0.4}}>
<Text style ={styles.headingInput}>
</Text>


</View>

</View>


        <View>
          <Text style={styles.headingInput}>Type of Centre</Text>

          
            {/* <View
              style={{
                flex: 0.6,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor:"teal"
              }}>
              <View
                style={{
                  flex: 0.5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor:"red"
                }}> */}
                {/* <View
                  style={{
                    
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    paddingVertical: 12,
                    borderWidth: 0.4,
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      color: "orange",
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Balsankar Kendra
                  </Text>
                </View> */}

{/*               
                <FlatList
                  style={{flex: 1}}
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}
                  horizontal
                  data={[
                    {key: true, value: true},
                    {key: false, value: false},
                  ]}
                  renderItem={({item, index}) => {
                    return (
                      <Pressable
                        style={[
                          {
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 7,
                            // borderLeftWidth: 1,
                            borderWidth: 0.4,
                            borderTopRightRadius: index === 1 ? 10 : 0,
                            borderBottomRightRadius: index === 1 ? 10 : 0,
                            paddingVertical: 10.5,
                          },
                        ]}
                        onPress={() =>
                          setCentre({
                            ...centre,
                            type_of_centre: item.value,
                          })
                        }>
                        <View
                          style={[
                            {
                              width: 10,
                              height: 10,
                              borderRadius: 5,
                              borderColor:"black",
                              borderWidth: 1,

                          
                            },
                            item.value === centre.type_of_centre
                              ? styles.selected
                              : styles.unselected,
                          ]}></View>
                        <Text
                          style={{


                            fontWeight: '500',
                            color: COLORS.brown,
                            fontSize: 12,
                            paddingLeft: 2,
                            textAlign: 'center',
                          }}>
                          {item.value ? 'Balsankar Kendra' :'Abyasika'}
                        </Text>
                      </Pressable>
                    );
                  }}
                /> */}
              {/* </View> */}
            {/* </View> */}

          
        
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:"teal"
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
    fontWeight: '500',
    marginTop: 30,
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
