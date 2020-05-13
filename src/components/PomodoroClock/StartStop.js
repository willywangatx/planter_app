import React, { useState, useEffect } from 'react';

const StartStop = ({
  isActive,
  setIsActive,
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
      setIsActive(false);
    }
    //TODO: note that maybe the reason why is because my setIsActie is not catching within the block (see return blocks)
    if (!isActive) {
      const newIntervalId = setInterval(() => {
        console.log(Date.now());
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer >= 0) {
            return newTimer;
          }
          return prevTimer;
        });
      }, 1000);

      setInterval(newIntervalId);
      setIsActive(true);
    }
    //added this to try and fix memory leak - appears code still runs when switched
    // return () => clearInterval(newIntervalId);
  };

  return (
    <React.Fragment>
      <p id="timer-label">{cycle ? 'Focus Timer' : 'Break Timer'}</p>
      <button onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
    </React.Fragment>
  );
};
export default StartStop;
