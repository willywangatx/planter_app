import React from 'react';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';
import Reset from './Reset';

const Controls = ({
  isActive,
  cycle,
  cycleLength,
  increaseTimer,
  decreaseTimer,
  startStopClick,
  resetTime,
}) => {
  return (
    <React.Fragment>
      <Reset resetTime={resetTime} />
      <StartStop isActive={isActive} startStopClick={startStopClick} />
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
