import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import NavBar from '../components/Navigation/NavBar';
import Garden from '../components/Garden/Garden';
// import PomodoroClock from '../components/PomodoroClock/PomodoroClock';

const GardenPage = ({ isAuthenticated, getGardens }) => {
  // TODO: error do not call hooks inside a use effect, can only call hooks at top level of function

  useEffect(() => {
    getGardens();
  }, [isAuthenticated]);

  return (
    <>
      <NavBar />
      <Garden />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // currentCycle: state.timers.current_cycle,
    isAuthenticated: state.authentication.isAuthenticated,
  };
};

const hoc = compose(
  connect(
    mapStateToProps,
    withRPCRedux('getGardens')
  )
);

export default hoc(GardenPage);
