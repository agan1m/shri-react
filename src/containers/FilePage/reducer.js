import { FILE_SUCCESS } from './constants';

const initialState = {
  isLoading: false,
  data: [],
};

function filesReducer(state = initialState, action) {
  switch (action.type) {
    case FILE_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default filesReducer;
