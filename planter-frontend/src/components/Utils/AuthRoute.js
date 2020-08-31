import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'fusion-plugin-react-router';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import paths from '../../constants/paths';
import Authentication from '../Authentication/Authentication';
import gardenPage from '../../pages/garden-page';

const AuthRoute = ({ path, component, auth, refreshAuth }) => {
  const Component = component;
  useEffect(() => {
    if (!auth.didAttempt) {
      refreshAuth()
        .then((res) => {
          if (res.code === 200) {
            Redirect(path);
            return <Component />;
          }
          if (res && res.code === 401) {
            return <Authentication />;
          }
          //   if (res && (res.code < 200 || res.code >=300)) {
          //       return {<div>'Error loading page.'</div>}
          //   }
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }, [auth.isAuthenticated]);

  //   return <>{auth.isAuthenticated ? component : <Authentication />}</>;
  return (
    <>
      <Authentication />
    </>
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
