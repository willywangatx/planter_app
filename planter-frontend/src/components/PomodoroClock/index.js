import React, { useState, useEffect } from 'react';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Timer from './Timer';
import AdjustTime from './AdjustTime';
import StartStop from './StartStop';
import Reset from './Reset';
// import Cycle from './Cycle';
// import CycleCounter from './CycleCounter';
import ToggleSwitch from './ToggleSwitch';

const PomodoroClock = ({
  greet,
  greetingText,
  loadingGreeting,
  greetingError,
  getProfile,
}) => {
  //action creator for these
  //in store make reducer Pomodoro Clock
  // make a const DEFAULT_STATE object tree in reducers
  // creat actions for these
  // dispatch actions with updated time
  //in reducers, look for actions swtich (action.type) - case setFocusTime
  // update state for focus time
  const [focusTime, setFocusTime] = useState(60 * 25);
  const [breakTime, setBreakTime] = useState(60 * 5);
  const [timer, setTimer] = useState(focusTime);
  const [cycle, setCycle] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [reset, setReset] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // fires thunk - pass it the profile ID
  //     // cals backend eventually
  //     greet({ name: 'eminem', greeting: 'hi', statement: 'jskdlf' });
  //   }, 2000);
  // }, []);

  useEffect(() => {
    getProfile();
  }, []);

  // const [focusTime, setFocusTime] = useState(null);
  // const [breakTime, setBreakTime] = useState(null);
  // const [timer, setTimer] = useState(null);
  // const [cycle, setCycle] = useState(null);
  // const [isStarted, setIsStarted] = useState(null);
  // const [timerId, setTimerId] = useState(null);
  // const [reset, setReset] = useState(null);
  // const [cycleCount, setCycleCount] = useState(null);

  // componentDidMount() {
  //   axios({
  //     method: 'GET',
  //     url: 'http://localhost:8000/accounts/',
  //     timeout: 4000,
  //     data:
  //   })
  // }
  //<ToggleSwitch - for changing focus mode />

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
      // to stop timer from changing automatically
      // setCycle(!cycle);
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

  const shownText = loadingGreeting ? 'loading' : greetingText;

  return (
    <div className="pomodoro-clock raised-panel">
      <div className="left-panel">
        {/* <CurrentTask /> */}

        {/* <CycleCounter cycleCount={cycleCount} /> */}
        {/* <Cycle toggleCycle={toggleCycle} cycle={cycle} /> */}
      </div>
      <div className="center-panel">
        <div>{shownText}</div>
        <ToggleSwitch toggleCycle={toggleCycle} cycle={cycle} />
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

        <Reset resetTime={resetTime} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  //accessing store and putting it in variable
  // accessing data in store  - called a reducer
  const greetingText = state.greeting.greeting;
  const loadingGreeting = state.greeting.loading;
  const greetingError = state.greeting.error;
  return {
    greetingText,
    loadingGreeting,
    greetingError,
  };
};

const hoc = compose(
  // gets data from browser to FE server - network request from browser get sent through all middleware
  withRPCRedux('greet'),
  withRPCRedux('getProfile'),
  // connecting reducers to components
  connect(mapStateToProps)
);

export default hoc(PomodoroClock);
// export default PomodoroClock;
