import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Reset = ({ resetTimers, timerId }) => {
  // TODO: when timer is reset - useEffect to stop countdown

  // RESET TIMERS
  const reset = (event) => {
    event.preventDefault();
    resetTimers({ id: timerId });
  };

  return (
    <React.Fragment>
      <button className="raised-btn panel-btn reset-btn" onClick={reset}>
        Reset
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const timerId = state.timers.id;
  return { timerId };
};

const hoc = compose(
  withRPCRedux('resetTimers'),
  connect(mapStateToProps)
);

export default hoc(Reset);
