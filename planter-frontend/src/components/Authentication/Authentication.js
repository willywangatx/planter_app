import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PomodoroClock from '../PomodoroClock/PomodoroClock';
import RenderedAuth from './RenderedAuth';

const Authentication = ({ isAuthenticated, getProfile, getTimers }) => {
  useEffect(() => {
    getProfile();
    getTimers();
    // TODO: How to preserve login between page refreshes
  }, []);

  // use a switch to check route and load proper component
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
  withRPCRedux('login'),
  withRPCRedux('register'),
  withRPCRedux('getProfile'),
  withRPCRedux('getTimers')
);

export default hoc(Authentication);
