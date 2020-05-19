import React, { Component } from 'react';
import { Link } from 'fusion-plugin-react-router';
import paths from '../constants/paths';
import PomodoroClock from '../components/PomodoroClock/PomodoroApp.js';

const Home = () => {
  return (
    <>
      <nav>
        <Link to={paths.login}>login.</Link>
        <div className="nav-link">
          <Link to={paths.register}>register.</Link>
        </div>
      </nav>
      <PomodoroClock />
    </>
  );
};
export default Home;
