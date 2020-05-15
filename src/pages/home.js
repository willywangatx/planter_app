import React, { Component } from 'react';
import { Link } from 'fusion-plugin-react-router';
import paths from '../constants/paths';
import PomodoroClock from '../components/PomodoroClock/PomodoroApp.js';

const Home = () => {
  return (
    <>
      <Link to={paths.login}>login.</Link>
      <Link to={paths.register}>register.</Link>
      <PomodoroClock />
    </>
  );
};
export default Home;
