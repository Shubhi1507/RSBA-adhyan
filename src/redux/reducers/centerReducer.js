import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  assignedCenters: [],
};

const centerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.UPDATE_ASSIGNED_CENTRES:
      return {
        ...state,
        assignedCenters: action.payload,
      };

    case ACTION_CONSTANTS.CLEAR_ASSIGNED_CENTRES:
      return {
        ...state,
        currentSurveyData: initialState.currentSurveyData,
      };

    case ACTION_CONSTANTS.RESET_APP:
      return {
        assignedCenters: [],
      };

    default:
      return state;
  }
};

export default centerReducer;
