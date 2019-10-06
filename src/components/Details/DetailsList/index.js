import React from 'react';

import './index.scss';
import DetailsListItem from '../DetailsListItem';

const DetailsList = ({ data = [] }) => (
  <ol className="Details-List">
    {data.map(item => (
      <DetailsListItem content={item} />
    ))}
  </ol>
);

export default DetailsList;
