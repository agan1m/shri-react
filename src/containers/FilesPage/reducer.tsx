import { FILES_SUCCESS } from './constants';
import { IAction } from '../../commonInterfaces';

const initialState = {
  isLoading: false,
  data: [],
};

function filesReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case FILES_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default filesReducer;
