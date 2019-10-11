import React from 'react';

import './index.scss';

interface Props {
  content: string;
}

const DetailsListItem = ({ content }: Props) => <li className="Details-List-Item">{content || ''}</li>;

export default DetailsListItem;
