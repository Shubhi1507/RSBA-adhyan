import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  bastiList: [],
  stateList: [],
  districtList: [],
  loading: true,
};

const RegionReducer = (state = initialState, action) => {
  switch (action.type) {
    // STATES
    case ACTION_CONSTANTS.UPDATE_STATE_LIST:
      return {
        ...state,
        stateList: action.payload,
        loading: false,
      };
    case ACTION_CONSTANTS.CLEAR_STATE_LIST:
      return {...state, loading: false, stateList: []};

    // DISTRICTS
    case ACTION_CONSTANTS.UPDATE_DISTRICTS_LIST:
      return {
        ...state,
        districtList: action.payload,
        loading: false,
      };
    case ACTION_CONSTANTS.CLEAR_DISTRICTS_LIST:
      return {...state, loading: false, districtList: []};

    // TOWN/BASTI
    case ACTION_CONSTANTS.UPDATE_BASTI_LIST:
      return {
        ...state,
        bastiList: action.payload,
        loading: false,
      };
    case ACTION_CONSTANTS.CLEAR_BASTI_LIST:
      return {...state, loading: false, bastiList: []};

    default:
      return state;
  }
};

export default RegionReducer;
