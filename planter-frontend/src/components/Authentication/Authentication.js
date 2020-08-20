import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Login from './Login';
import Register from './Register';
import PomodoroClock from '../PomodoroClock/PomodoroClock';

const Authentication = ({ isAuthenticated }) => {
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     props.history.push('/');
  //   }
  // }, [isAuthenticated]);

  if (isAuthenticated) {
    return <PomodoroClock />;
  }
  return <Login />;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
  };
};

const hoc = compose(
  connect(mapStateToProps),
  withRPCRedux('login'),
  withRPCRedux('register')
);

export default hoc(Authentication);
