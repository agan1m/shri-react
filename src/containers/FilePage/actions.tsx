import { FILE_REQUEST, FILE_SUCCESS, FILE_FAILURE } from './constants';
import { IAction } from '../../commonInterfaces';

export const fileRequest = (): IAction => ({
  type: FILE_REQUEST,
});

export const fileSuccess = (payload: object): IAction => ({
  type: FILE_SUCCESS,
  payload,
});

export const fileFailure = (error: string): IAction => ({
  type: FILE_FAILURE,
  error,
});
