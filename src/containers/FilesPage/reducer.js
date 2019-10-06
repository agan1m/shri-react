import { FILES_SUCCESS } from './constants';

const initialState = {
  isLoading: false,
  data: [],
};

function filesReducer(state = initialState, action) {
  switch (action.type) {
    case FILES_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default filesReducer;
