import React from 'react';

import './index.scss';
import DetailsList from './DetailsList';

interface Props {
  data: Array<string>;
}

const Details = ({ data }: Props) => (
  <div className="Details">
    <div className="Details-Header">
      <div className="Details-Header-Left">
        <span className="Text">
          ya.make
          <span className="Text Text_color_mute">(4 347 bytes)</span>
        </span>
      </div>
      <button className="Button Button_download Details-Header_hide"></button>
    </div>
    <div className="Details-Content">
      <DetailsList data={data} />
    </div>
  </div>
);

export default Details;
