import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.scss';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCol from './TableCol';

class ReposTable extends Component {
  handlerRowClick = item => {
    const { history } = this.props;
    const { name, isFile } = item;

    if (isFile) {
      history.push(`/${name}`);
    } else {
      const { filesSuccess } = this.props;
      fetch(`/repos/${name}`, {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(res => {
          filesSuccess(res.data);
        })
        .catch(err => window.console.log(err));
    }
  };

  render() {
    const { data = [] } = this.props;
    return (
      <div className="ReposTable">
        <TableHeader>
          <TableRow>
            <TableCol mod={{ size: 'name' }} content={'Name'} />
            <TableCol mod={{ size: 'lastCommit' }} content={'Last Commit'} />
            <TableCol mod={{ size: 'message' }} content={'Commit message'} />
            <TableCol mod={{ size: 'commiter' }} content={'Commiter'} />
            <TableCol mod={{ size: 'updated' }} content={'Updated'} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.name} onClick={() => this.handlerRowClick(item)}>
              <TableCol mod={{ size: 'name' }} content={item.name} />
              <TableCol mod={{ size: 'lastCommit' }} content={item.hash} />
              <TableCol mod={{ size: 'message' }} content={item.message} />
              <TableCol mod={{ size: 'commiter' }} content={item.author} />
              <TableCol mod={{ size: 'updated' }} content={item.date} />
            </TableRow>
          ))}
        </TableBody>
      </div>
    );
  }
}

export default withRouter(ReposTable);
