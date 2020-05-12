import React from 'react';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';

const Controls = ({
  isActive,
  timer,
  cycle,
  focusTime,
  breakTime,
  increaseTimer,
  decreaseTimer,
  cycleLengthLabel,
  setTimer,
}) => {
  return (
    <React.Fragment>
      {/* <Reset /> */}
      <StartStop
        isActive={isActive}
        cycle={cycle}
        focusTime={focusTime}
        breakTime={breakTime}
        timer={timer}
        setTimer={setTimer}
      />
      <AdjustTime
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
        cycleLengthLabel={cycleLengthLabel}
      />
    </React.Fragment>
  );
};
export default Controls;
