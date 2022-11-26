import {combineReducers} from 'redux';
import authReducer from './authReducer';
import RegionReducer from './RegionReducer';
import surveyReducer from './surveyReducer';

const RootReducer = combineReducers({
  authReducer,
  RegionReducer,
  surveyReducer,
});

export default RootReducer;
