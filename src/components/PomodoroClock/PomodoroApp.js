import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Controls from './Controls';
import Timer from './Timer';
import Cycle from './Cycle';

const PomodoroClock = () => {
  const [focusTime, setFocusTime] = useState(60 * 25);
  const [breakTime, setBreakTime] = useState(60 * 5);
  const [timer, setTimer] = useState(focusTime);
  const [cycle, setCycle] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [reset, setReset] = useState(false);

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
  const startStopClick = () => {
    let updatedTimerId;
    if (isActive) {
      clearInterval(timerId);
      setIsActive(false);
    }
    if (!isActive) {
      updatedTimerId = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer >= 0) {
            return newTimer;
          }
          return prevTimer;
        });
      }, 1000);
      setTimerId(updatedTimerId);
      setInterval(timerId);
      setIsActive(true);
    }
  };

  //<AdjustTime /> component
  useEffect(() => {
    if (cycle) {
      setTimer(focusTime);
    } else {
      setTimer(breakTime);
    }
  }, [focusTime, breakTime]);

  const cycleLength = () => {
    return cycle
      ? `${moment.duration(focusTime, 's').minutes()} min.`
      : `${moment.duration(breakTime, 's').minutes()} min.`;
  };

  const increaseTimer = () => {
    console.log('increaseTimer');
    if (cycle) {
      setFocusTime(focusTime + 60);
    }
    if (!cycle) {
      setBreakTime(breakTime + 60);
    }
  };

  const decreaseTimer = () => {
    if (cycle) {
      if (focusTime <= 0) {
        setFocusTime(0);
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
    <div className="pomodoro-clock">
      <Cycle toggleCycle={toggleCycle} cycle={cycle} />
      <Timer timer={timer} />
      <Controls
        isActive={isActive}
        cycle={cycle}
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
        cycleLength={cycleLength}
        startStopClick={startStopClick}
        resetTime={resetTime}
      />
    </div>
  );
};
export default PomodoroClock;
