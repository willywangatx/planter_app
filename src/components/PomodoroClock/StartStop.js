import React, { useState, useEffect } from 'react';

const StartStop = ({
  isActive,
  timer,
  cycle,
  focusTime,
  breakTime,
  setTimer,
}) => {
  const [intervalId, setIntervalId] = useState(null);

  //useEffect runs after every update
  //ex: fetch data after type something into - call server in useEffect

  //   useEffect(() => {
  //     setTimer(cycle ? focusTime : breakTime);
  //   }, [cycle]);

  //   const isStarted = intervalId !== null;

  //TODO: put handleStartStop within useEffect block and utilize the isActive state variable

  //re-write component so onClick starts/stop timer

  const handleStartStop = () => {
    if (isActive) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      useEffect(() => {});
      const newIntervalId = setInterval(() => {
        console.log(Date.now());
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer >= 0) {
            return newTimer;
          }

          //   if (cycle) {
          //     // setCycle(false);
          //     setTimer(focusTime);
          //   } else if (!cycle) {
          //     // setCycle(true);
          //     setTimer(breakTime);
          //   }
          return prevTimer;
        });
      }, 1000);
      setInterval(newIntervalId);
    }
  };

  return (
    <React.Fragment>
      <p id="timer-label">{cycle ? 'Focus Timer' : 'Break Timer'}</p>
      <button onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
    </React.Fragment>
  );
};
export default StartStop;
