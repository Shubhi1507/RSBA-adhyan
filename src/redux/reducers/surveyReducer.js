import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  survey: [],
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.UPDATE_SURVEY:
      return {
        ...state,
        survey: action.payload,
      };
    case ACTION_CONSTANTS.CLEAR_SURVEY:
      return {...state, survey: []};
    default:
      return state;
  }
};

export default surveyReducer;
