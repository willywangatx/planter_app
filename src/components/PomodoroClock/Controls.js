import React from 'react';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';
import Reset from './Reset';

const Controls = ({
  isStarted,
  cycle,
  cycleLength,
  increaseTimer,
  decreaseTimer,
  startStopClick,
  resetTime,
  cycleCount,
}) => {
  return (
    <React.Fragment>
      <Reset resetTime={resetTime} />
      <StartStop
        isStarted={isStarted}
        startStopClick={startStopClick}
        cycleCount={cycleCount}
      />
      <AdjustTime
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
        cycleLength={cycleLength}
        cycle={cycle}
      />
    </React.Fragment>
  );
};
export default Controls;
