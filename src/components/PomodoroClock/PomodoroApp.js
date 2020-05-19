import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Timer from './Timer';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';
import Reset from './Reset';
import Cycle from './Cycle';
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
  // //logic to prevent setting focus time to 0 in adjust time
  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerId);
      setIsStarted(!isStarted);
      setCycle(!cycle);
    }
  }, [timer]);

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
      }, 100);
      setTimerId(updatedTimerId);
      setInterval(timerId);
      setIsStarted(true);
    }
  };

  //<AdjustTime />

  useEffect(() => {
    if (cycle) {
      if (focusTime !== timer) {
        if (focusTime > timer) {
          setTimer(timer + 60);
        }
        if (focusTime < timer) {
          setTimer(timer - 60);
        }
      }
    }
    if (!cycle) {
      if (breakTime !== timer) {
        if (breakTime > timer) {
          setTimer(timer + 60);
        }
        if (breakTime < timer) {
          if (timer >= 60) {
            setTimer(timer - 60);
          }
          if (timer <= 60) {
            setTimer(0);
          }
        }
      }
    }
  }, [focusTime, breakTime]);

  const cycleLength = () => {
    return cycle
      ? `Focus Time: ${focusTime / 60} min.`
      : `Break Time: ${breakTime / 60} min.`;
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
      if (breakTime <= 60) {
        setBreakTime(60);
      } else {
        setBreakTime(breakTime - 60);
      }
    }
  };

  return (
    <div className="pomodoro-clock raised-panel">
      <div className="left-panel">
        <Reset resetTime={resetTime} />
        <CycleCounter cycleCount={cycleCount} />
        <Cycle toggleCycle={toggleCycle} cycle={cycle} />
      </div>
      <div className="center-panel">
        <Timer timer={timer} cycle={cycle} />
        <StartStop
          isStarted={isStarted}
          startStopClick={startStopClick}
          cycleCount={cycleCount}
        />
      </div>
      <div className="right-panel">
        <AdjustTime
          increaseTimer={increaseTimer}
          decreaseTimer={decreaseTimer}
          cycleLength={cycleLength}
          cycle={cycle}
        />
      </div>
    </div>
  );
};
export default PomodoroClock;
