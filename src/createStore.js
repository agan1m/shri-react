import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import AppReducer from './containers/App/reducer';
import FilesReducer from './containers/FilesPage/reducer';
import FileReducer from './containers/FilePage/reducer';

const Reducers = combineReducers({
  app: AppReducer,
  files: FilesReducer,
  file: FileReducer,
});

export default (data = {}) => {
  return createStore(Reducers, data, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};
