import * as React from 'react';
import {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Modal, Portal, Text, Provider} from 'react-native-paper';
import LocalizationContext from '../context/LanguageContext';
import {screenHeight, screenWidth} from '../libs';
import {navigate} from '../navigation/NavigationService';
import {ROUTES} from '../navigation/RouteConstants';
import {Button} from './Button';
import {TextHandler} from './TextHandler';

export const SurveyCompletedModal = ({visible, hideModal, onClick}) => {
  const {t} = useContext(LocalizationContext);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    flex: 0.25,
    marginHorizontal: 20,

    // height: screenHeight * 0.2,
    // justifyContent: 'center',
    // alignItems: 'center',
    // top: '0%',
    // left: '25%',
    // position: 'absolute',
    borderRadius: 10,
  };

  return (
    <Portal>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TextHandler>{t('SUBMIT')}</TextHandler>
            <Button
              title={t('OK')}
              onPress={() => {
                hideModal();
                onClick();
              }}
              ButtonContainerStyle={{
                marginVertical: 20,
              }}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
