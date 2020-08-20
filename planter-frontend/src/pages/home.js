import React, { useEffect, Component } from 'react';
import { Link, NavLink } from 'fusion-plugin-react-router';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import paths from '../constants/paths';
import PomodoroClock from '../components/PomodoroClock/PomodoroClock';
import Authentication from '../components/Authentication/Authentication';

const Home = (props, { isAuthenticated, login, register }) => {
  console.log(props);

  try {
    window.herpderp = props.history;
  } catch {}

  return (
    <>
      {/* <nav>
        <NavLink activeClassName="inset" to={paths.home}>
          home.
        </NavLink>
        <Link to={paths.login}>login.</Link>
        <Link to={paths.register}>register.</Link>
      </nav> */}
      {/* <PomodoroClock /> */}
      <Authentication />
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

export default hoc(Home);
