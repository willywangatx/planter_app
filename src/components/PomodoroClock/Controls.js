import React from 'react';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';
import Reset from './Reset';
import Cycle from './Cycle';

const Controls = ({
  isStarted,
  cycle,
  cycleLength,
  increaseTimer,
  decreaseTimer,
  startStopClick,
  resetTime,
  cycleCount,
  toggleCycle,
}) => {
  return (
    <React.Fragment>
      <div className="controls raised">
        <Reset resetTime={resetTime} />
        <StartStop
          isStarted={isStarted}
          startStopClick={startStopClick}
          cycleCount={cycleCount}
        />
        <div className="adjust-time">
          <AdjustTime
            increaseTimer={increaseTimer}
            decreaseTimer={decreaseTimer}
            cycleLength={cycleLength}
            cycle={cycle}
          />
        </div>
        <Cycle toggleCycle={toggleCycle} cycleCount={cycle} />
      </div>
    </React.Fragment>
  );
};
export default Controls;
