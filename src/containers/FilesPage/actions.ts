import { FILES_REQUEST, FILES_SUCCESS, FILES_FAILURE } from './constants';
import { IAction } from '../../commonInterfaces';

export const filesRequest = (): IAction => ({
  type: FILES_REQUEST,
});

export const filesSuccess = (payload): IAction => ({
  type: FILES_SUCCESS,
  payload,
});

export const filesFailure = (error): IAction => ({
  type: FILES_FAILURE,
  error,
});
