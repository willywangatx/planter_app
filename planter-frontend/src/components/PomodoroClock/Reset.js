import React, { useState } from 'react';

const Reset = ({ reset }) => {
  // RESET TIMERS
  // const reset = (event) => {
  //   event.preventDefault();
  //   resetTimers({ id: timerId });
  // };

  return (
    <React.Fragment>
      <button className="raised-btn panel-btn reset-btn" onClick={reset}>
        Reset
      </button>
    </React.Fragment>
  );
};
export default Reset;
