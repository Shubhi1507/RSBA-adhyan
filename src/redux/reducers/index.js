import {combineReducers} from 'redux';
import authReducer from './authReducer';
import authPageDataReducer from './AuthPageDataReducer';
import BastiListReducer from './BastiListReducer';

const RootReducer = combineReducers({
  authReducer,
  BastiListReducer,
});

export default RootReducer;
