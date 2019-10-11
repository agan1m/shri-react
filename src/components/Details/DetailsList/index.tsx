import React from 'react';

import './index.scss';
import DetailsListItem from '../DetailsListItem';

interface Props {
  data: Array<string>;
}

const DetailsList = ({ data = [] }: Props) => (
  <ol className="Details-List">
    {data.map(item => (
      <DetailsListItem content={item} />
    ))}
  </ol>
);

export default DetailsList;
