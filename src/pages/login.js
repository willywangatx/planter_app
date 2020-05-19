import React, { Component } from 'react';
import { NavLink, Link } from 'fusion-plugin-react-router';
import paths from '../constants/paths';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

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
              <label className="raised-panel auth-raised">Username:</label>
              <input
                className="input-box inset"
                value={this.state.username}
                onChange={this.handleChange}
                type="text"
                name="username"
                placeholder="Username"
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
