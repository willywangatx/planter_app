
import React from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RenderedAuth from '../Authentication/RenderedAuth';

const AuthenticatedComponentWrapperFactory = (ComponentPage) => {
  class AuthenticatedComponentClass extends React.Component {
    componentDidMount() {
      const {
        auth,
        refreshAuth,
      } = this.props;
      if (!auth.isAuthenticated) {
        refreshAuth();
      }
    }

    render() {
      const { auth } = this.props;

      if (auth.didAttempt && !auth.isAuthenticated) {
        return (<RenderedAuth />);
      }
      if (auth.didAttempt && auth.isAuthenticated) {
        return (<ComponentPage />);
      }
      return <div>loading...</div>
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.authentication,
    };
  };

  const hoc = compose(
    connect(mapStateToProps),
    withRPCRedux('refreshAuth')
  );

  return hoc(AuthenticatedComponentClass);
}

export default AuthenticatedComponentWrapperFactory
