import firestore from '@react-native-firebase/firestore';

const connectToFirestoreforIsPaid = async () => {
  try {
    const collection = await firestore().collection('check').doc('11').get();
    const val = collection.data();
    console.log('val', val);
    return val.paid;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export {connectToFirestoreforIsPaid};
