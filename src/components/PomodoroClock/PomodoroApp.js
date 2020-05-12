import React, { useState } from 'react';
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

  //for Cycle component
  const toggleCycle = () => {
    setCycle(!cycle);
    setTimer(() => {
      cycle ? focusTime : breakTime;
    });
  };

  //for AdjustTime component
  //TODO: review NaN/undefined issue
  const cycleLengthLabel = () => {
    cycle
      ? `Time: ${moment.duration(focusTime, 's').minutes()} min.`
      : `Time: ${moment.duration(breakTime, 's').minutes()} min.`;
  };

  const increaseTimer = () => {
    console.log('increaseTimer');
    if (cycle) {
      setFocusTime(focusTime + 60);
      setTimer(focusTime);
      console.log(`new focus time: ${focusTime}`);
    }
    if (!cycle) {
      setBreakTime(breakTime + 60);
      setTimer(breakTime);
      console.log('updating timer with break time');
    }
  };

  //updated the logic for decrease timer to see if it would resolve NaN/undefined focus/breakTime variable issue
  const decreaseTimer = () => {
    console.log('decreaseTimer');
    if (timer < 0) {
      setTimer(0);
    } else {
      if (cycle) {
        setFocusTime(focusTime - 60);
        setTimer(focusTime);
        console.log(`decrease focus time ${focusTime}`);
      }
      if (!cycle) {
        setBreakTime(breakTime - 60);
        setTimer(breakTime);
        console.log(`decrease break time ${breakTime}`);
      }
    }

    // if (focusTime < 0 || breakTime < 0) {
    //   setTimer(0);
    // } else {
    //   if (cycle) {
    //     setFocusTime(focusTime - 60);
    //     setTimer(focusTime);
    //     console.log('updating timer with focus time');
    //   }
    //   if (!cycle) {
    //     setBreakTime(breakTime - 60);
    //     setTimer(breakTime);
    //     console.log('updating timer with break time');
    //   }
    // }
  };

  return (
    //maybe put the cycle component into controls
    <div className="pomodoro-clock">
      <Cycle toggleCycle={toggleCycle} cycle={cycle} />
      <Timer timer={timer} />
      <Controls
        isActive={isActive}
        timer={timer}
        cycle={cycle}
        focusTime={focusTime}
        breakTime={breakTime}
        increaseTimer={increaseTimer}
        decreaseTimer={decreaseTimer}
        cycleLengthLabel={cycleLengthLabel}
        setTimer={setTimer}
      />
    </div>
  );
};
export default PomodoroClock;

// export default class PomodoroClock extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cycle: 'Focus',
//       focusTimer: 25,
//       breakTimer: 5,
//       timer: 25,
//       currentTime: '25 : 00',
//       timerId: 0,
//       start: 'Start',
//     };

//     this.setSession = this.setSession.bind(this);
//     this.setTimer = this.setTimer.bind(this);
//     this.increaseTimer = this.increaseTimer.bind(this);
//     this.decreaseTimer = this.decreaseTimer.bind(this);
//     this.startTimer = this.startTimer.bind(this);
//   }

//   setSession = (cycle, focusTimer, breakTimer) => {
//     this.setState({ cycle: cycle });
//     if (this.state.cycle === 'Focus') {
//       this.setState({
//         timer: focusTimer,
//       });
//     } else {
//       this.setState({
//         timer: breakTimer,
//       });
//     }
//   };

//   setTimer = (timer) => {
//     this.setState({ timer: timer });
//   };

//   increaseTimer = () => {
//     if (this.state.cycle === 'Focus') {
//       this.setState({
//         focusTimer: this.state.focusTimer + 1,
//       });
//     } else {
//       this.setState({
//         breakTimer: this.state.breakTimer + 1,
//       });
//     }
//   };

//   decreaseTimer = () => {
//     if (this.state.cycle === 'Focus') {
//       this.setState({
//         focusTimer: this.state.focusTimer - 1,
//       });
//     } else {
//       this.setState({
//         breakTimer: this.state.breakTimer - 1,
//       });
//     }
//   };

//   startTimer = (start) => {
//     this.setState({
//       start: start,
//     });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <Session
//           setSession={this.setSession}
//           cycle={this.state.cycle}
//           setTimer={this.setTimer}
//         />
//         <Timer
//           cycle={this.state.cycle}
//           timer={this.state.timer}
//           currentTime={this.state.currentTime}
//           start={this.state.start}
//           startTimer={this.startTimer}
//         />
//         <Controls
//           timer={this.state.timer}
//           increaseTimer={this.increaseTimer}
//           decreaseTimer={this.decreaseTimer}
//           cycle={this.state.cycle}
//           startTimer={this.startTimer}
//           focusTimer={focusTimer}
//           breakTimer={breakTimer}
//         />
//       </React.Fragment>
//     );
//   }
// }

// /////////////////////////////////

// class Session extends Component {
//   toggleCycle = (e) => {
//     this.props.cycle === 'Focus'
//       ? this.props.setSession('Break')
//       : this.props.setSession('Focus');
//     if (this.props.cycle === 'Focus') {
//       this.setState({
//         timer: 25,
//         ///
//       });
//     } else {
//       this.setState({
//         timer: 5,
//         //
//       });
//     }
//   };

//   //make value display oposite of cycle (use bollean)

//   render() {
//     return (
//       <React.Fragment>
//         <div className="session-btn">
//           <input
//             type="button"
//             value={this.props.cycle}
//             onClick={this.toggleCycle}
//           />
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// ////////////////////////////////
// // Timer should be child component of the controls component - pass state from controls

// class Timer extends Component {
//   //making edts here
//   // end of edits
//   render() {
//     return (
//       <div className="timer">
//         <span>{this.props.cycle}</span>
//         <br />
//         <span className="clock">{this.props.currentTime}</span>
//       </div>
//     );
//   }
// }

// //////////////////////////////////

// class Controls extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         {/*<Reset />*/}
//         {/*<startTimer />*/}
//         <AdjustTime />
//       </React.Fragment>
//     );
//   }
// }

// class AdjustTime extends Component {
//   render() {
//     return (
//       <div className="adjust-time-btn">
//         <p>Adjust {this.props.cycle} Time</p>
//         <button onClick={this.increaseTimer}> + </button>
//         <p> {this.props.timer} </p>
//         <button onClick={this.decreaseTimer}> - </button>
//       </div>
//     );
//   }
// }

// class startTimer extends Component {
//   timerStart = (start, timer) => {
//     if (this.props.start === 'Start') {
//       //pass some function to timer to start
//       const newIntervalId = setInterval(() => {
//         setTimer((prevTimeLeft) => {
//           const newTimeLeft = prevTimeLeft - 1;
//           if (newTimeLeft >= 0) {
//             return newTimeLeft;
//           }
//           return prevTimeLeft;
//         });
//       }, 1000);
//       setTimer(newIntervalId);
//     } else if (this.props.start === 'Pause') {
//       clearInterval(timer);
//       setIntervalId(null);
//     }
//     //this.props.start === "Start" ? //start the timer : else pause the timer
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <div className="start-stop-btn">
//           <input
//             type="button"
//             value={this.props.start}
//             onClick={this.timerStart}
//           />
//         </div>
//       </React.Fragment>
//     );
//   }
// }
