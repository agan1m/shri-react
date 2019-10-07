import React from 'react';
import { withRouter } from 'react-router-dom';

import './index.scss';

const SubHeader = ({ location }) => {
  const breadcrumbs = location.pathname.split('/');
  return (
    <div className="SubHeader">
      <span className="SubHeader-Item">arcadia</span>
      {breadcrumbs.map(item => {
        if (item && item !== 'blob') {
          return <span className="SubHeader-Item">{item}</span>;
        }
        return;
      })}
    </div>
  );
};

export default withRouter(SubHeader);
