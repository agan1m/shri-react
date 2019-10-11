import React from 'react';
import { setup } from 'bem-cn';
import './index.scss';
import { IColProps } from '../interfaces';
const block = setup({
  el: '-',
  mod: '_',
  modValue: '_',
});

const b = block('ReposTable');
const TableCol = ({ content, mod = {}, mix = [] }: IColProps) => {
  return <div className={b('Col', mod).mix(mix)}>{content || ''}</div>;
};

export default TableCol;
