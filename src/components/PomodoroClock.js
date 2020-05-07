import React, { Component } from 'react';

export default class PomodoroClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: 'Focus',
      focusTimer: 25,
      breakTimer: 5,
      timer: 25,
      currentTime: '25 : 00',
      timerId: 0, //notates how how many pomodoros
      //maybe don't need start state
      start: 'Start',
    };

    this.setSession = this.setSession.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.increaseTimer = this.increaseTimer.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  setSession = (cycle, focusTimer, breakTimer) => {
    this.setState({ cycle: cycle });
    if (this.state.cycle === 'Focus') {
      this.setState({
        timer: focusTimer,
      });
    } else {
      this.setState({
        timer: breakTimer,
      });
    }

    //logic to increment timer id by 1 when a cycle completes `
  };

  setTimer = (timer) => {
    this.setState({ timer: timer });
  };

  increaseTimer = (focusTimer, breakTimer, cycle) => {
    if (this.state.cycle === 'Focus') {
      this.setState({
        focusTimer: this.state.focusTimer + 1,
      });
    } else {
      this.setState({
        breakTimer: this.state.breakTimer + 1,
      });
    }
  };

  decreaseTimer = (focusTimer, breakTimer, cycle) => {
    if (this.state.cycle === 'Focus') {
      this.setState({
        focusTimer: this.state.focusTimer - 1,
      });
    } else {
      this.setState({
        breakTimer: this.state.breakTimer - 1,
      });
    }
  };

  startTimer = (start) => {
    this.setState({
      start: start,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Session
          setSession={this.setSession}
          cycle={this.state.cycle}
          setTimer={this.setTimer}
        />
        {/*<Timer cycle={this.state.cycle} timer={this.state.timer} currentTime={this.state.currentTime} /> */}
        <Controls
          timer={this.state.timer}
          increaseTimer={this.increaseTimer}
          decreaseTimer={this.decreaseTimer}
          cycle={this.state.cycle}
          startTimer={this.startTimer}
        />
      </React.Fragment>
    );
  }
}

/////////////////////////////////

class Session extends Component {
  toggleCycle = (e) => {
    this.props.cycle === 'Focus'
      ? this.props.setSession('Break')
      : this.props.setSession('Focus');
    if (this.props.cycle === 'Focus') {
      this.setState({
        timer: 25,
        ///
      });
    } else {
      this.setState({
        timer: 5,
        //
      });
    }
  };

  //make value display oposite of cycle (use bollean)

  render() {
    return (
      <React.Fragment>
        <div className="session-btn">
          <input
            type="button"
            value={this.props.cycle}
            onClick={this.toggleCycle}
          />
        </div>
      </React.Fragment>
    );
  }
}

////////////////////////////////
// Timer should be child component of the controls component - pass state from controls

class Timer extends Component {
  render() {
    return (
      <div className="timer">
        <span className="clock">{this.props.currentTime}</span>
        <span>{this.props.cycle}</span>
      </div>
    );
  }
}

//////////////////////////////////

class Controls extends Component {
  render() {
    return (
      <React.Fragment>
        {/*<Reset />*/}
        {/*<StartStop />*/}
        <AdjustTime />
      </React.Fragment>
    );
  }
}

class AdjustTime extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="adjust-time-btn">
          <p>Adjust {this.props.cycle} Time</p>
          <button onClick={this.increaseTimer}> + </button>
          <p> {this.props.timer} </p>
          <button onClick={this.decreaseTimer}> - </button>
        </div>
      </React.Fragment>
    );
  }
}

// class StartStop extends Component {

// 	handleStart = (e) => {

// 		//this.props.start === "Start" ? //start the timer : else pause the timer

// 	}

// 	render () {
// 		return (
// 			<React.Fragment>
// 				<div className="start-stop-btn">
// 					<input type="button" value={this.props.start} onClick{this.handleStart} />
// 				</div>
// 			</React.Fragment>
// 		)
// 	}
// }
