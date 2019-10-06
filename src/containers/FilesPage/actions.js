import { FILES_REQUEST, FILES_SUCCESS, FILES_FAILURE } from './constants';

export const filesRequest = () => ({
  type: FILES_REQUEST,
});

export const filesSuccess = payload => ({
  type: FILES_SUCCESS,
  payload,
});

export const filesFailure = error => ({
  type: FILES_FAILURE,
  error,
});
