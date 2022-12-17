import {combineReducers} from 'redux';
import authReducer from './authReducer';
import RegionReducer from './RegionReducer';
import surveyReducer from './surveyReducer';
import centerReducer from './centerReducer';

const RootReducer = combineReducers({
  authReducer,
  RegionReducer,
  surveyReducer,
  centerReducer,
});

export default RootReducer;
