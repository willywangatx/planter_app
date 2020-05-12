import React, { Component } from 'react';

import PomodoroClock from '../components/PomodoroClock/PomodoroApp.js';

export default class Homepage extends Component {
  render() {
    return (
      <div className="home">
        <PomodoroClock />
      </div>
    );
  }
}

/* Need to build out these components 
<Login />
<Todos />
*/
