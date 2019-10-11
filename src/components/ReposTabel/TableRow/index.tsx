import React from 'react';
import './index.scss';
import { IRowProps } from '../interfaces';

const TableRow = ({ children, onClick = null }: IRowProps) => (
  <div onClick={onClick} className="ReposTable-Row">
    {children}
  </div>
);

export default TableRow;
