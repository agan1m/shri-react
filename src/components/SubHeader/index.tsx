import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

import './index.scss';

interface IProps extends RouteComponentProps {}

const SubHeader = ({ location }: IProps) => {
  const breadcrumbs = location.pathname.split('/');
  return (
    <div className="SubHeader">
      <Link to="/" className="SubHeader-Item">
        arcadia
      </Link>
      {breadcrumbs.map(item => {
        if (item && item !== 'blob') {
          return (
            <Link to={`/${item}`} className="SubHeader-Item">
              {item}
            </Link>
          );
        }
        return;
      })}
    </div>
  );
};

export default withRouter(SubHeader);
