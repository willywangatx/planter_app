import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PomodoroClock from '../components/PomodoroClock/PomodoroClock';
import NavBar from '../components/Navigation/NavBar';

const Home = ({ getData }) => {
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     getData();
  //   }
  // }, [])

  return (
    <>
      <NavBar />
      <PomodoroClock />
    </>
  );
};

// export default Home;

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
  };
};

const hoc = compose(
  connect(mapStateToProps),
  // withRPCRedux('getProfile'),
  // withRPCRedux('getTimers'),
  // withRPCRedux('getWallet')
);

export default hoc(Home);
