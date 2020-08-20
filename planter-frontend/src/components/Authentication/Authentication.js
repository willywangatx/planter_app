import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Login from './Login';
import Register from './Register'

const Authentication = (isAuthenticated) => {
    return (
        <Login />
        <Register />
    )
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
