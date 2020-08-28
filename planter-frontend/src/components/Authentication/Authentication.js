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
  getProfile,
  getTimers,
  getWallet,
}) => {
  useEffect(() => {
    getProfile();
    getTimers();
    getWallet();
  }, []);

  if (isAuthenticated) {
    return <PomodoroClock />;
  }

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
