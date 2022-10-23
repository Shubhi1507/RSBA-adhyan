import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export default () => {
  //   const sagaMiddleware = createSagaMiddleware();

  const store = createStore(persistedReducer);

  let persistor = persistStore(store);
  //   sagaMiddleware.run(sagas);

  return {store, persistor};
};
