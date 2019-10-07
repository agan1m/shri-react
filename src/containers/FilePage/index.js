import React, { Component } from 'react';
import { connect } from 'react-redux';

import Details from '../../components/Details';
import Tabs from '../../components/Tabs';
import { fileSuccess } from './actions';
import api from '../../api';

class FilePage extends Component {
  componentDidMount() {
    const { fileSuccess, match } = this.props;
    const { file } = match.params;
    
    api.files
      .getFile(file)
      .then(res => fileSuccess(res.data))
      .catch(err => window.console.log(err));
  }

  render() {
    const { data } = this.props;
    return (
      <Tabs>
        <Details data={data} />
      </Tabs>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.file.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fileSuccess: ev => dispatch(fileSuccess(ev)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilePage);
