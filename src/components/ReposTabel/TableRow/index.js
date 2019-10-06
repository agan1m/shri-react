import React from 'react';
import './index.scss';

const TableRow = ({ children, onClick = null }) => (
  <div onClick={onClick} className="ReposTable-Row">
    {children}
  </div>
);

export default TableRow;
