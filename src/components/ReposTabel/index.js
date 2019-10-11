import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { setup } from 'bem-cn';
import './index.scss';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCol from './TableCol';

const block = setup({
  el: '-',
  mod: '_',
  modValue: '_',
});

const b = block('Text');

class ReposTable extends Component {
  handlerRowClick = item => {
    const { history, location } = this.props;
    const { name, isFile } = item;
    const { pathname } = location;
    const currentPath = pathname !== '/' ? `${pathname}/${name}` : `/${name}`;
    if (isFile) {
      history.push(`${currentPath}/blob`);
    } else {
      history.push(currentPath);
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
          {data.map(
            item =>
              item && (
                <TableRow key={item.name} onClick={() => this.handlerRowClick(item)}>
                  <TableCol
                    mod={{ size: 'name', image: item.isFile ? 'file' : 'folder' }}
                    mix={[b({ h3: true })]}
                    content={item.name}
                  />
                  <TableCol mod={{ size: 'lastCommit' }} mix={['Text', b('Link')]} content={item.hash} />
                  <TableCol mod={{ size: 'message' }} content={item.message} />
                  <TableCol mod={{ size: 'commiter' }} content={item.author} />
                  <TableCol mod={{ size: 'updated' }} content={item.date} />
                </TableRow>
              ),
          )}
        </TableBody>
      </div>
    );
  }
}

export default withRouter(ReposTable);
