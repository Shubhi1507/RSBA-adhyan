import {combineReducers} from 'redux';
import authReducer from './authReducer';
import authPageDataReducer from './AuthPageDataReducer';

const RootReducer = combineReducers({
  authReducer,
  authPageDataReducer,
});

export default RootReducer;
