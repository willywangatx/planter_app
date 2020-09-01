import React, { useEffect } from 'react';
import { Route } from 'fusion-plugin-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
// import paths from '../../constants/paths';
// import Authentication from '../Authentication/Authentication';
import RenderedAuth from '../Authentication/RenderedAuth';
// import gardenPage from '../../pages/garden-page';

const AuthRoute = ({ path, component, auth, refreshAuth }) => {
  const ComponentClass = component;

  useEffect(() => {
    if (!auth.isAuthenticated) {
      refreshAuth();
    }
  }, []);

  if (!auth.isAuthenticated) {
    //   TODO: make a loading component
    return <Route render={(props) => <div>loading...</div>} />;
  }

  if (auth.didAttempt && !auth.isAuthenticated) {
    return (
      <Route
        render={(props) => {
          return <RenderedAuth {...props} />;
        }}
      />
    );
  }

  return (
    <Route
      render={(props) => {
        return <ComponentClass {...props} />;
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authentication,
  };
};
const hoc = compose(
  connect(mapStateToProps),
  withRPCRedux('refreshAuth')
);
export default hoc(AuthRoute);
