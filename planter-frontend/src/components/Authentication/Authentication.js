import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'fusion-plugin-react-router';

import RenderedAuth from './RenderedAuth';
// import PomodoroClock from '../PomodoroClock/PomodoroClock';
import GardenPage from '../../pages/garden-page';
import Home from '../../pages/home';

const Authentication = ({
  // withRouter
  match,
  location,
  history,
  // global state props
  isAuthenticated,
  // RPC
  getProfile,
  getTimers,
  getWallet,
  getGardens,
}) => {
  const componentToLoad = () => {
    switch (location.pathname) {
      case '/':
        return <Home />;
      case '/garden':
        return <GardenPage />;
      default:
        <Home />;
    }
  };

  // useEffect(() => {
  //   switch (location.pathname) {
  //     case '/':
  //       getProfile();
  //       // getTimers();
  //       // getWallet();
  //       break;
  //     case '/garden':
  //       getProfile();
  //       getGardens();
  //       break;
  //     default:
  //       getProfile();
  //       getTimers();
  //       getWallet();
  //   }
  // }, []);

  return <>{isAuthenticated ? componentToLoad() : <RenderedAuth />}</>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
  };
};

const hoc = compose(
  connect(mapStateToProps),
  withRPCRedux('getProfile'),
  withRPCRedux('getTimers'),
  withRPCRedux('getWallet'),
  withRPCRedux('getGardens')
);

const withRouterAuthWrapper = withRouter(Authentication);
export default hoc(withRouterAuthWrapper);
