import React, { Component, useEffect } from 'react';
import { NavLink, Link } from 'fusion-plugin-react-router';
import paths from '../constants/paths';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  // useState = //set tokens
  // instead of console.log can set token
  // postLogin = (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: 'POST',
  //     url: 'http://localhost:8000/api/login/',
  //     data: { email: this.state.eamil, password: this.state.password },
  //   })
  //     .then((res) => {
  //       // if res.status === 201
  //       // redirect to homepage
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  //updating state values for username and password with user submitted values
  //passing the target input name to change/update when the user changes the field
  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav>
          <Link to={paths.home}>home.</Link>
          <NavLink activeClassName="inset" to={paths.login}>
            login.
          </NavLink>
          <Link to={paths.register}>register.</Link>
        </nav>
        <div className="raised-panel auth-panel">
          <form action="/login" method="post">
            <div className="input-form">
              <label className="raised-panel auth-raised">Email:</label>
              <input
                className="input-box inset"
                value={this.state.email}
                onChange={this.handleChange}
                type="text"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-form">
              <label className="raised-panel auth-raised">Password:</label>
              <input
                className="input-box inset"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="submit-btn">
              <input className="auth-btn" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
