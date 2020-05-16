import React from 'react';
import CycleCounter from './CycleCounter';

const StartStop = ({ isStarted, startStopClick, cycleCount }) => {
  return (
    <React.Fragment>
      <p className="inset panel-inset">Session Count: {cycleCount}</p>
      <button className="raised panel-btn" onClick={startStopClick}>
        {isStarted ? 'Stop' : 'Start'}
      </button>
    </React.Fragment>
  );
};

export default StartStop;
