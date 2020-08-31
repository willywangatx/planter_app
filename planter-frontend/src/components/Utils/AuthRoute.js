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
  //   const componentToLoad = () => {
  //     if (!auth.didAttempt) {
  //       refreshAuth()
  //         .then((res) => {
  //           if (res.status === 200) {
  //             // location.path === path
  //             // Redirect(path);
  //             return <Component />;
  //           }
  //           if (res && res.status === 401) {
  //             return <Authentication />;
  //           }
  //           //   if (res && (res.code < 200 || res.code >=300)) {
  //           //       return {<div>'Error loading page.'</div>}
  //           //   }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           return (
  //             <>
  //               <Authentication />
  //             </>
  //           );
  //         });
  //     }
  //   };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      refreshAuth();
    }
  }, []);

  if (auth.didAttempt && !auth.isAuthenticated) {
    console.log('TESTING COMPONENT');
    // return <Authentication />;
    return (
      <Route
        render={(props) => {
          return <Authentication {...props} />;
        }}
      />

      //   <Authentication />
    );
  }

  if (!auth.isAuthenticated) {
    //   TODO: make a loading component
    // return <div>loading...</div>;
    return <Route render={(props) => <div>loading...</div>} />;
  }

  //   return <>{auth.isAuthenticated ? component : <Authentication />}</>;
  return (
    <Route
      render={(props) => {
        return <Component {...props} />;
      }}
    />

    //   <Authentication />
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
