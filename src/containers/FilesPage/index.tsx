import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ReposTable from '../../components/ReposTabel';
import Tabs from '../../components/Tabs';
import { filesSuccess } from './actions';
// @ts-ignore
import api from '../../api';

import { IDataItem } from '../../components/ReposTabel/interfaces';
import { RouteComponentProps } from 'react-router-dom';
import { IAction } from '../../commonInterfaces';
import { AppState } from '../../createStore';

interface IProps extends RouteComponentProps {
  filesSuccess(data: Array<string>): IAction;
  data: Array<IDataItem>;
}

interface IResult {
  data: Array<string>;
}

class FilesPage extends Component<IProps> {
  componentDidMount() {
    const { filesSuccess, location } = this.props;
    const { pathname } = location;

    api.files
      .getFiles(pathname !== '/' ? pathname : '')
      .then((res: IResult) => filesSuccess(res.data))
      .catch((err: Error) => window.console.log(err));
  }

  componentDidUpdate(prevProps: IProps) {
    const { location, filesSuccess } = this.props;
    const { pathname } = location;

    if (prevProps.location.pathname !== pathname) {
      api.files
        .getFiles(pathname)
        .then((res: IResult) => filesSuccess(res.data))
        .catch((err: Error) => window.console.log(err));
    }
  }

  render() {
    const { data } = this.props;
    return (
      <Tabs>
        <ReposTable data={data} />
      </Tabs>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    data: state.files.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    filesSuccess: (ev: object) => dispatch(filesSuccess(ev)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilesPage);
