import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReposTable from '../../components/ReposTabel';
import Tabs from '../../components/Tabs';
import { filesSuccess } from './actions';
import api from '../../api';

class FilesPage extends Component {
  componentDidMount() {
    const { filesSuccess, location } = this.props;
    const { pathname } = location;

    api.files
      .getFiles(pathname !== '/' ? pathname : '')
      .then(res => filesSuccess(res.data))
      .catch(err => window.console.log(err));
  }

  componentDidUpdate(prevProps) {
    const { location, filesSuccess } = this.props;
    const { pathname } = location;

    if (prevProps.location.pathname !== pathname) {
      api.files
        .getFiles(pathname)
        .then(res => filesSuccess(res.data))
        .catch(err => window.console.log(err));
    }
  }

  render() {
    const { data, filesSuccess } = this.props;
    return (
      <Tabs>
        <ReposTable filesSuccess={filesSuccess} data={data} />
      </Tabs>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.files.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filesSuccess: ev => dispatch(filesSuccess(ev)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilesPage);
