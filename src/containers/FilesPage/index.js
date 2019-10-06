import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReposTable from '../../components/ReposTabel';
import Tabs from '../../components/Tabs';
import { filesSuccess } from './actions';

class FilesPage extends Component {
  componentDidMount() {
    const { filesSuccess } = this.props;
    fetch('/repos', {
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
