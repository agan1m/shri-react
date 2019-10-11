import React from 'react';
import './index.scss';
import { IRowProps } from '../interfaces';

const TableBody = ({ children }: IRowProps) => <div className="ReposTable-Body">{children}</div>;

export default TableBody;
