import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import PomodoroClock from '../components/PomodoroClock/PomodoroClock';
import NavBar from '../components/Navigation/NavBar';

const Home = ({ getProfile, getTimers, auth }) => {

  // useEffect(() => {
  //   if (auth.didAttempt) {
  //     getProfile()
  //     getTimers()
  //   }
  // }, [auth.didAttempt])

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
    auth: state.authentication,
  };
};

const hoc = compose(
  connect(mapStateToProps),
  withRPCRedux('getProfile'),
  withRPCRedux('getTimers'),
  // withRPCRedux('getWallet')
);

export default hoc(Home);
