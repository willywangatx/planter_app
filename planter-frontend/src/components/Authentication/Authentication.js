import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'fusion-plugin-react-router';

import RenderedAuth from './RenderedAuth';
import PomodoroClock from '../PomodoroClock/PomodoroClock';
import Garden from '../Garden/Garden';

const Authentication = ({
  // withRouter
  match,
  location,
  history,
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

  const componentToLoad = () => {
    switch (location.pathname) {
      case '/':
        return <PomodoroClock />;
      case '/garden':
        return <Garden />;
      default:
        <PomodoroClock />;
    }
  };

  // if (isAuthenticated) {
  //   return (
  //     <>
  //       <div>{componentToLoad()}</div>
  //       <div>You are now at {location.pathname}</div>
  //     </>
  //   );
  // }

  return <>{isAuthenticated ? componentToLoad() : <RenderedAuth />}</>;
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

const withRouterAuthWrapper = withRouter(Authentication);
export default hoc(withRouterAuthWrapper);
