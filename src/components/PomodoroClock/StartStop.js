import React from 'react';
import CycleCounter from './CycleCounter';

const StartStop = ({ isStarted, startStopClick, cycleCount }) => {
  return (
    <React.Fragment>
      <p className="inset" id="cycle-count">
        Session Count: {cycleCount}
      </p>
      <button id="start-stop-btn" onClick={startStopClick}>
        {isStarted ? 'Stop' : 'Start'}
      </button>
    </React.Fragment>
  );
};

export default StartStop;
