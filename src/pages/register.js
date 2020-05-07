import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirm_password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.confirmPasswordMatch = this.confirmPasswordMatch.bind(this);
  }

  //updating state values for username and password with user submitted values
  //passing the target input name to change/update when the user changes the field
  handleChange = ({ target }) => {
    console.log('Target  handlechange');
    this.setState({
      [target.name]: target.value,
    });
  };

  //verify passwords match and prevent submission unless form fields match
  confirmPasswordMatch = (e) => {
    console.log('confirmPasswordMatch');
    let password = this.state.password;
    let confirm_password = this.state.confirm_password;
    if (password !== confirm_password) {
      e.preventDefault();
      alert("Passwords don't match!");
      return false;
    }
  };

  render() {
    return (
      <React.Fragment>
        <form
          action="/register"
          method="post"
          onSubmit={this.confirmPasswordMatch}
        >
          <div className="input-form">
            <label>Email:</label>
            <input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              required
            />
          </div>
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
              type="password"
              name="password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-form">
            <label>Verify Password:</label>
            <input
              value={this.state.confirm_password}
              type="password"
              name="confirm_password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="submit-btn">
            <input type="submit" value="Register" />
          </div>
        </form>
        <a href="/login">Log In</a>
      </React.Fragment>
    );
  }
}
