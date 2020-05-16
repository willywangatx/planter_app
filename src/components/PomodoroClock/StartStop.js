import React from 'react';
import CycleCounter from './CycleCounter';

const StartStop = ({ isStarted, startStopClick }) => {
  return (
    <React.Fragment>
      <button className="raised panel-btn" onClick={startStopClick}>
        {isStarted ? 'Stop' : 'Start'}
      </button>
    </React.Fragment>
  );
};

export default StartStop;
