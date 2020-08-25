import React, { useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Reset = ({ resetTimers, stopTimers, timerId, refreshAuth }) => {
  // RESET TIMERS
  const reset = (event) => {
    event.preventDefault();
    // resetTimers({ id: timerId });
    // stopTimers({ id: timerId });
    refreshAuth();
  };

  return (
    <React.Fragment>
      <button
        className="disable-select raised-btn panel-btn reset-btn"
        onClick={reset}
      >
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
  withRPCRedux('stopTimers'),
  withRPCRedux('refreshAuth'),
  connect(mapStateToProps)
);

export default hoc(Reset);
