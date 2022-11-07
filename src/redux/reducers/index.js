import {combineReducers} from 'redux';
import authReducer from './authReducer';
import authPageDataReducer from './AuthPageDataReducer';
import RegionReducer from './RegionReducer';
import surveyReducer from './surveyReducer';

const RootReducer = combineReducers({
  authReducer,
  RegionReducer,
  surveyReducer,
  authPageDataReducer,
});

export default RootReducer;
