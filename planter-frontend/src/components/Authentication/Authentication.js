import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PomodoroClock from '../PomodoroClock/PomodoroClock';
// import Home from '../../pages/home';
import RenderedAuth from './RenderedAuth';

const Authentication = ({
  // global state props
  isAuthenticated,
  // RPC calls
  refreshAuth,
  getProfile,
  getTimers,
  getWallet,
}) => {
  // TODO: add logic that checks path (maybe use switch) and based on path, fetch differnt components
  // don't need url links - can just render differnt components based on the rpc call?
  // if (isAuthenticated) {
  //   useEffect(() => {
  //     getProfile();
  //     getTimers();
  //     getWallet();
  //   }, [isAuthenticated]);
  //   return <PomodoroClock />;
  // }

  // if (!isAuthenticated) {
  //   // fire if initial calls returned 401 and if this returns 401 as well, load login
  //   // fire these calls regardless of auth - if returns 401, keep isAuth false,
  //   // if calls return succesful, change isAuth to false
  //   // if res.data.status === 401, redirect to refreshAuth
  //   // refreshAuth();
  //   // useEffect(() => {
  //   //   getProfile();
  //   //   getTimers();
  //   //   getWallet();
  //   // }, [isAuthenticated]);
  // }

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
      getTimers();
      getWallet();
    }
    if (!isAuthenticated) {
      // refreshAuth();
      getProfile();
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <PomodoroClock />;
  }

  // TODO: check for access and refresh tokens and if not present, render the login pg
  // and set isAuthenticated to false. if tokens present, set isAuth to true and render above
  // fire off rpc handler if isAuth is false and if tokens are present and returns 200, change state

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
