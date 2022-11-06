import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  page: 0,
  authData: {},
};

const authPageDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.SET_PAGE_INDEX:
      return {
        ...state,
        page: action.payload.page,
        authData: action.payload.user,
      };

    case ACTION_CONSTANTS.UPDATE_SURVEY_FORM:
      return {
        ...state,
        page: action.payload.page,
        authData: action.payload,
      };

    case ACTION_CONSTANTS.RESET_PAGE_AND_AUTH_DATA:
      return {state: initialState};

    default:
      return state;
  }
};

export default authPageDataReducer;
