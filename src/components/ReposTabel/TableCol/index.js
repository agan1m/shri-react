import React from 'react';
import { setup } from 'bem-cn';
import './index.scss';

const block = setup({
  el: '-',
  mod: '_',
  modValue: '_',
});

const b = block('ReposTable');
const TableCol = ({ content, mod, mix = [] }) => <div className={b('Col', mod)}>{content || ''}</div>;

export default TableCol;
