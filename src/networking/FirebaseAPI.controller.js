import firestore from '@react-native-firebase/firestore';

const connecttoFBD = async () => {
  try {
    const collection = await firestore()
      .collection('sczksn')
      .doc('vrPBpXY8JRJdS7ZdJjXs')
      .get();
    const val = collection.data();
    console.log('val', val.sczksn);
    return val.paid;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export {connecttoFBD};
