import React, { Component } from 'react';
import { connect } from 'react-redux';

import Details from '../../components/Details';

import Tabs from '../../components/Tabs';
import { fileSuccess } from './actions';
// @ts-ignore
import api from '../../api';
import { IAction } from '../../commonInterfaces';
import { AppState } from '../../createStore';

interface IProps {
  fileSuccess(data: Array<string>): IAction;
  match: any;
  data: Array<string>;
}

interface IResult {
  data: Array<string>;
}

class FilePage extends Component<IProps> {
  componentDidMount() {
    const { fileSuccess, match } = this.props;
    const { file } = match.params;

    api.files
      .getFile(file)
      .then((res: IResult) => fileSuccess(res.data))
      .catch((err: Error) => window.console.log(err));
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

const mapStateToProps = (state: AppState) => {
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
