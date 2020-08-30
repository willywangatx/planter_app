import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import Authentication from '../components/Authentication/Authentication';
import PomodoroClock from '../components/PomodoroClock/PomodoroClock';
import NavBar from '../components/Navigation/NavBar';

const Home = ({ isAuthenticated, getProfile, getTimers, getWallet }) => {
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     props.history.push('/login');
  //   }
  // });

  // try {
  //   window.herpderp = history;
  // } catch {}

  useEffect(() => {
    getProfile();
    getTimers();
    getWallet();
  }, [isAuthenticated]);

  return (
    <>
      <NavBar />
      <PomodoroClock />
      {/* <Authentication /> */}
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
  withRPCRedux('getProfile'),
  withRPCRedux('getTimers'),
  withRPCRedux('getWallet')
);

export default hoc(Home);
