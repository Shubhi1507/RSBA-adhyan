import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  bastiList: [],
  loading: true,
};

const BastiListReducer = (state = initialState, action) => {
  switch (action.type) {
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

export default BastiListReducer;
