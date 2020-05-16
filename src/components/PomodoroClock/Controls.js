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
      <div className="control-panel raised">
        <Reset resetTime={resetTime} />
        <StartStop
          isStarted={isStarted}
          startStopClick={startStopClick}
          cycleCount={cycleCount}
        />
        <div className="inset control-panel">
          <AdjustTime
            increaseTimer={increaseTimer}
            decreaseTimer={decreaseTimer}
            cycleLength={cycleLength}
            cycle={cycle}
          />
        </div>
        <Cycle toggleCycle={toggleCycle} cycle={cycle} />
      </div>
    </React.Fragment>
  );
};
export default Controls;
