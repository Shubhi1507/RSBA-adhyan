import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  savedSurveys: [],
  currentSurveyData: {},
  completedSurvey: 0,
  incompletedSurvey: 0,
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    // CURRENT
    case ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY:
      return {
        ...state,
        currentSurveyData: action.payload,
      };

    case ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY:
      return {
        ...state,
        currentSurveyData: {},
      };

    //

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

   

    case ACTION_CONSTANTS.UPDATE_SAVED_SURVEYS:
      return {
        ...state,
        savedSurveys: action.payload,
      };

    case ACTION_CONSTANTS.CLEAR_SURVEY:
      return {
        ...state,
        survey: [],
        currentSurveyData: {},
        // completedSurvey: 0,
        // incompletedSurvey: 0,
      };
    default:
      return state;
  }
};

export default surveyReducer;
