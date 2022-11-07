import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  loading: false,
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.LOGIN_SUCCESSFUL:
      return {
        ...state,
        loggedIn: true,
        userData: action.payload,
        loading: false,
      };
    case ACTION_CONSTANTS.LOGIN_DATA_UPDATE:
      return {
        ...state,
        userData: action.payload,
        loading: false,
      };
    case ACTION_CONSTANTS.LOGIN_FAILED:
      return {...state, loading: false, loggedIn: false};
    case ACTION_CONSTANTS.LOGOUT_REQUEST:
      return {loading: false, loggedIn: false};
    default:
      return state;
  }
};

export default authReducer;
