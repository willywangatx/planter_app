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

  useEffect(() => {
    setTimer(cycle ? focusTime : breakTime);
  }, [cycle]);

  useEffect(() => {
    if (cycle) {
      setTimer(focusTime);
    } else {
      setTimer(breakTime);
    }
  }, [focusTime, breakTime]);

  //for Cycle component
  const toggleCycle = () => {
    setCycle(!cycle);
    // setTimer(cycle ? focusTime : breakTime);
  };

  //for AdjustTime component

  const cycleLength = () => {
    return cycle
      ? `${moment.duration(focusTime, 's').minutes()} min.`
      : `${moment.duration(breakTime, 's').minutes()} min.`;
  };

  const increaseTimer = () => {
    console.log('increaseTimer');
    if (cycle) {
      setFocusTime(focusTime + 60);
      // setTimer(focusTime);
      console.log(`new focus time: ${focusTime}`);
    }
    if (!cycle) {
      setBreakTime(breakTime + 60);
      // setTimer(breakTime);
      console.log('updating breakTime', breakTime);
    }
  };

  const decreaseTimer = () => {
    if (cycle) {
      if (focusTime <= 0) {
        setFocusTime(0);
        // setTimer(focusTime);
        console.log('set focusTime to 0');
      } else {
        setFocusTime(focusTime - 60);
        // setTimer(focusTime);
        console.log(`set focusTime to ${focusTime}`);
      }
    }
    if (!cycle) {
      if (breakTime <= 0) {
        setBreakTime(0);
        // setTimer(breakTime);
        console.log('set breakTime to 0');
      } else {
        setBreakTime(breakTime - 60);
        // setTimer(breakTime);
        console.log(`set breakTime to ${breakTime}`);
      }
    }
  };

  return (
    //maybe put the cycle component into controls
    <div className="pomodoro-clock">
      <Cycle toggleCycle={toggleCycle} cycle={cycle} />
      <Timer timer={timer} />
      <Controls
        isActive={isActive}
        setIsActive={setIsActive}
        timer={timer}
        cycle={cycle}
        focusTime={focusTime}
        breakTime={breakTime}
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
        cycleLength={cycleLength}
        setTimer={setTimer}
      />
    </div>
  );
};
export default PomodoroClock;
