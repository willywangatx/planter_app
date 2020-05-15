import React, { Component } from 'react';
import { Link } from 'fusion-plugin-react-router';
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
        <form action="/login" method="post">
          <div className="input-form">
            <label>Username:</label>
            <input
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              name="username"
              required
            />
          </div>
          <div className="input-form">
            <label>Password:</label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              required
            />
          </div>
          <div className="submit-btn">
            <input type="submit" value="Login" />
          </div>
        </form>
        <Link to={paths.register}>register.</Link>
        <Link to={paths.home}>home.</Link>
      </React.Fragment>
    );
  }
}
