import {combineReducers} from 'redux';
import authReducer from './authReducer';

const RootReducer = combineReducers({
  authReducer,
});

export default RootReducer;
