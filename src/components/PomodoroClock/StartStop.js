import React, { useState } from 'react';

const StartStop = ({ isActive, startStopClick }) => {
  return (
    <React.Fragment>
      <button id="start-stop-btn" onClick={startStopClick}>
        {isActive ? 'Stop' : 'Start'}
      </button>
    </React.Fragment>
  );
};

export default StartStop;
