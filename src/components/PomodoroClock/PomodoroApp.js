import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Controls from './Controls';
import Timer from './Timer';

import CycleCounter from './CycleCounter';

const PomodoroClock = () => {
  const [focusTime, setFocusTime] = useState(60 * 25);
  const [breakTime, setBreakTime] = useState(60 * 5);
  const [timer, setTimer] = useState(focusTime);
  const [cycle, setCycle] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [reset, setReset] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  //<Cycle />
  useEffect(() => {
    setTimer(cycle ? focusTime : breakTime);
  }, [cycle]);

  const toggleCycle = () => {
    setCycle(!cycle);
  };

  //<Reset />
  useEffect(() => {
    setTimer(cycle ? focusTime : breakTime);
    setReset(false);
  }, [reset]);

  const resetTime = () => {
    setReset(true);
  };

  //<StartStop />
  //TODO: adding a session counter to app
  //logic to prevent setting focus time to 0 in adjust time
  const startStopClick = () => {
    let updatedTimerId;
    if (isStarted) {
      clearInterval(timerId);
      setIsStarted(false);
    }
    if (!isStarted) {
      updatedTimerId = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer >= 0) {
            return newTimer;
          }
          //TODO: count does not update on successive focusSessions
          if (cycle) {
            setCycleCount(cycleCount + 1);
            console.log(cycleCount);
          }
          return prevTimer;
        });
      }, 1000);
      setTimerId(updatedTimerId);
      setInterval(timerId);
      setIsStarted(true);
    }
  };

  //<AdjustTime />
  useEffect(() => {
    if (cycle) {
      setTimer(focusTime);
    } else {
      setTimer(breakTime);
    }
  }, [focusTime, breakTime]);

  const cycleLength = () => {
    return cycle
      ? `Focus Time: ${moment.duration(focusTime, 's').minutes()} min.`
      : `Break Time: ${moment.duration(breakTime, 's').minutes()} min.`;
  };

  const increaseTimer = () => {
    if (cycle) {
      setFocusTime(focusTime + 60);
    }
    if (!cycle) {
      setBreakTime(breakTime + 60);
    }
  };

  //update: set focusTime minimum time to 1 min
  const decreaseTimer = () => {
    if (cycle) {
      if (focusTime <= 60) {
        setFocusTime(60);
      } else {
        setFocusTime(focusTime - 60);
      }
    }
    if (!cycle) {
      if (breakTime <= 0) {
        setBreakTime(0);
      } else {
        setBreakTime(breakTime - 60);
      }
    }
  };

  return (
    <div className="pomodoro-clock raised">
      {/* <Cycle toggleCycle={toggleCycle} cycle={cycle} /> */}
      {/* <CycleCounter cycleCount={cycleCount} /> */}
      <Timer timer={timer} cycle={cycle} />
      <Controls
        isStarted={isStarted}
        cycle={cycle}
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
        cycleLength={cycleLength}
        startStopClick={startStopClick}
        resetTime={resetTime}
        cycleCount={cycleCount}
        toggleCycle={toggleCycle}
        cycleCount={cycle}
      />
    </div>
  );
};
export default PomodoroClock;
