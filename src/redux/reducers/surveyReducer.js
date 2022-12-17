import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  currentSurveyData: {},
  completedSurvey: 0,
  incompletedSurvey: 0,
  totalSurveys: [],
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY:
      return {
        ...state,
        currentSurveyData: action.payload,
      };

    case ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY:
      return {
        ...state,
        currentSurveyData: initialState.currentSurveyData,
      };

    case ACTION_CONSTANTS.UPDATE_SAVED_SURVEYS:
      return {
        ...state,
        savedSurveys: action.payload,
      };

    case ACTION_CONSTANTS.UPDATE_INCOMPLETE_SURVEYS:
      return {
        ...state,
        incompleteSurveyData: action.payload,
        incompletedSurvey: state.incompletedSurvey + 1,
      };

    case ACTION_CONSTANTS.RESET_APP:
      return {
        currentSurveyData: {},
        completedSurvey: 0,
        incompletedSurvey: 0,
        totalSurveys: [],
      };
    case ACTION_CONSTANTS.CLEAR_SURVEY_DATA:
      return {
        currentSurveyData: {},
        totalSurveys: [],
      };

    case ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY:
      return {
        ...state,
        totalSurveys: action.payload,
      };
    default:
      return state;
  }
};

export default surveyReducer;
