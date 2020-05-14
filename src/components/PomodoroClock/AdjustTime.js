import React from 'react';

const AdjustTime = ({ increaseTimer, decreaseTimer, cycleLength, cycle }) => {
  const adjustLabel = cycleLength();
  return (
    <React.Fragment>
      <br />
      <br />
      <p id="adjust-time-label">Adjust {cycle ? 'Focus' : 'Break'} Time</p>
      <button onClick={increaseTimer} id="increase-timer">
        {' '}
        +{' '}
      </button>
      <p id="cycle-length">{adjustLabel}</p>
      <button onClick={decreaseTimer} id="decrease-timer">
        {' '}
        -{' '}
      </button>
    </React.Fragment>
  );
};
export default AdjustTime;
