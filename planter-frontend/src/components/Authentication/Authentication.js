import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PomodoroClock from '../PomodoroClock/PomodoroClock';
import RenderedAuth from './RenderedAuth';

const Authentication = ({
  // global state props
  isAuthenticated,
  // RPC calls
  getProfile,
  getTimers,
  getWallet,
}) => {
  // useEffect(() => {
  //   getProfile();
  //   getTimers();
  //   // TODO: How to preserve login between page refreshes
  // }, []);

  // use a switch to check route and load proper component
  if (isAuthenticated) {
    useEffect(() => {
      getProfile();
      getTimers();
      getWallet();
    }, []);
    return <PomodoroClock />;
  }

  // if (!isAuthenticated) {
  //   checkAuth()
  // }

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
  withRPCRedux('login'),
  withRPCRedux('register'),
  withRPCRedux('getProfile'),
  withRPCRedux('getTimers'),
  withRPCRedux('getWallet')
);

export default hoc(Authentication);
