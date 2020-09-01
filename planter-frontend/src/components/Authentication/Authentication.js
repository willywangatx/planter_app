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
  auth,
  // RPC
  getProfile,
  getTimers,
  getWallet,
  getGardens,
}) => {
  useEffect(() => {
    if (!auth.isAuthenticated) {
      refreshAuth();
    }
  }, []);

  if (!auth.isAuthenticated) {
    // TODO: make a loading component/page
    return <div>loading...</div>;
  }

  // if (auth.didAttempt && !auth.isAuthenticated) {
  //   return <RenderedAuth />;
  // }

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

  return (
    <>
      {auth.didAttempt && !auth.isAuthenticated ? (
        componentToLoad()
      ) : (
        <RenderedAuth />
      )}
    </>
  );
  // return (
  //   <>
  //     <RenderedAuth />
  //   </>
  // );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authentication,
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
