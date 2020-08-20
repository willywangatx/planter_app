import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Login from './Login';
import Register from './Register';
import PomodoroClock from '../PomodoroClock/PomodoroClock';

const Authentication = ({ isAuthenticated }) => {
  // TODO: ask why a useEffect render a blank page instead of component - watching for isAuth state
  // change seems like a good idea

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     return <PomodoroClock />;
  //   }
  // }, [isAuthenticated]);

  if (isAuthenticated) {
    return <PomodoroClock />;
  }
  return (
    <>
      {/* put the nav links for login and register here */}
      <Login />
      <Register />
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
  withRPCRedux('register')
);

export default hoc(Authentication);
