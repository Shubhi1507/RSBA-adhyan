import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  bastiList: [],
  stateList: [],
  loading: true,
};

const RegionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.UPDATE_BASTI_LIST:
      return {
        ...state,
        bastiList: action.payload,
        loading: false,
      };
    case ACTION_CONSTANTS.CLEAR_BASTI_LIST:
      return {...state, loading: false, bastiList: []};

    case ACTION_CONSTANTS.UPDATE_STATE_LIST:
      return {
        ...state,
        stateList: action.payload,
        loading: false,
      };
    case ACTION_CONSTANTS.CLEAR_STATE_LIST:
      return {...state, loading: false, stateList: []};
    default:
      return state;
  }
};

export default RegionReducer;
