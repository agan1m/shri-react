import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface IProps extends RouteComponentProps {
  data: Array<IDataItem>;
}

export interface IDataItem {
  name: string;
  message: string;
  hash: string;
  date: string;
  author: string;
  isFile: boolean;
}

export interface IRowProps {
  children: React.ReactNode;
  onClick?(): void;
}

export interface IColProps {
  content: string;
  mod?: object;
  mix?: Array<string | object>;
}
