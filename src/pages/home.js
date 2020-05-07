import React, { Component } from "react";

import PomodoroClock from "../components/PomodoroClock.js";

export default class Homepage extends Component {
  render() {
    return (
      <div className="main">
        <PomodoroClock />
      </div>
    );
  }
}

/* Need to build out these components 
<Login />
<Todos />
*/
