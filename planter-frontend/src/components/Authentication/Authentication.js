import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PomodoroClock from '../PomodoroClock/PomodoroClock';
import { Router, Switch } from 'fusion-plugin-react-router';

import RenderedAuth from './RenderedAuth';

const Authentication = ({
  // global state props
  isAuthenticated,
  // RPC calls
  getProfile,
  getTimers,
  getWallet,
}) => {
  useEffect(() => {
    getProfile();
    getTimers();
    getWallet();
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <PomodoroClock />;
  }

  // <Router>
  //   {/* location: location.pathname in client  */}
  //   <Switch></Switch>
  // </Router>;

  return (
    <>
      <RenderedAuth />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
  };
};

const hoc = compose(
  connect(mapStateToProps),
  withRPCRedux('refreshAuth'),
  withRPCRedux('getProfile'),
  withRPCRedux('getTimers'),
  withRPCRedux('getWallet')
);

export default hoc(Authentication);
