import React from 'react';
import './index.scss';
import { IRowProps } from '../interfaces';

const TableHeader = ({ children }: IRowProps) => <div className="ReposTable-Header">{children}</div>;

export default TableHeader;
