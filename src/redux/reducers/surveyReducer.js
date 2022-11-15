import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  survey: [],
  surveyStatus: [],
  savedSurveys: [],
  completedSurvey: 0,
  incompletedSurvey: 0,
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.UPDATE_SURVEY:
      return {
        ...state,
        survey: action.payload,
      };

    case ACTION_CONSTANTS.ADD_COMPLETED_SURVEY_COUNT:
      return {
        ...state,
        completedSurvey: state.completedSurvey + 1,
      };

    case ACTION_CONSTANTS.ADD_INCOMPLETED_SURVEY_COUNT:
      return {
        ...state,
        incompletedSurvey: +1,
      };

    case ACTION_CONSTANTS.UPDATE_SURVEY_STATUS:
      return {
        ...state,
        surveyStatus: action.payload,
      };

    case ACTION_CONSTANTS.UPDATE_SAVED_SURVEYS:
      return {
        ...state,
        savedSurveys: action.payload,
      };

    case ACTION_CONSTANTS.CLEAR_SURVEY:
      return {
        ...state,
        survey: [],
        surveyStatus: [],
        // completedSurvey: 0,
        // incompletedSurvey: 0,
      };
    default:
      return state;
  }
};

export default surveyReducer;
