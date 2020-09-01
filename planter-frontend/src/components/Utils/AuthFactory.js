import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import RenderedAuth from '../Authentication/RenderedAuth';

// const AuthFactory = (ComponentClass) => {
// 	const AuthComponent = (props) => {
// 		useEffect...
// 		if (props.isAuthenticated) {
// 			return (<LoginScreen ...props />)
// 		}
// 		return (<ComponentClass ...props />)
// 	}
// 	return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);

const AuthFactory = ({ component, auth }) => {
  const ComponentClass = component;
  useEffect(() => {
    if (!auth.isAuthenticated) {
      refreshAuth();
    }
  }, []);

  if (!auth.isAuthenticated) {
    return <div>loading...</div>;
  }

  if (auth.didAttempt && !auth.isAuthenticated) {
    return <RenderedAuth />;
  }

  return <ComponentClass />;
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
export default hoc(AuthFactory);
