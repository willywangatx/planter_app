import React, { useEffect, Component } from 'react';
import { Link, NavLink } from 'fusion-plugin-react-router';
import paths from '../constants/paths';
import PomodoroClock from '../components/PomodoroClock/PomodoroClock';

const Home = (props) => {
  console.log(props);

  try {
    window.herpderp = props.history;
  } catch {}

  return (
    <>
      <nav>
        <NavLink activeClassName="inset" to={paths.home}>
          home.
        </NavLink>
        <Link to={paths.login}>login.</Link>
        <Link to={paths.register}>register.</Link>
      </nav>
      <PomodoroClock />
    </>
  );
};
export default Home;
