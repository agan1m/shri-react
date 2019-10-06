import { FILE_REQUEST, FILE_SUCCESS, FILE_FAILURE } from './constants';

export const fileRequest = () => ({
  type: FILE_REQUEST,
});

export const fileSuccess = payload => ({
  type: FILE_SUCCESS,
  payload,
});

export const fileFailure = error => ({
  type: FILE_FAILURE,
  error,
});
