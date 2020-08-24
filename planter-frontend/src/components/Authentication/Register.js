import React, { useState } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';

const Register = ({ register, renderOnClick }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailInput = ({ target }) => {
    setEmail(target.value);
  };

  const handleUsernameInput = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordInput = ({ target }) => {
    setPassword(target.value);
  };

  const handleConfirmPasswordInput = ({ target, password }) => {
    setConfirmPassword(target.value);
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      register({ email, username, password });
      alert('Account successfully created!');
      renderOnClick();
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <React.Fragment>
      <div className="raised-panel auth-panel">
        <form
          onSubmit={handleRegistration}
          // onSubmit={this.confirmPasswordMatch}
        >
          <div className="input-form">
            <label>Email:</label>
            <input
              className="input-box inset"
              value={email}
              onChange={handleEmailInput}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-form">
            <label>Username:</label>
            <input
              className="input-box inset"
              value={username}
              onChange={handleUsernameInput}
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-form">
            <label>Password:</label>
            <input
              className="input-box inset"
              value={password}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePasswordInput}
              required
            />
          </div>
          <div className="input-form">
            <label>Confirm Password:</label>
            <input
              className="input-box inset"
              value={confirmPassword}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleConfirmPasswordInput}
              required
            />
          </div>
          <div className="submit-btn">
            <input
              className="raised-btn auth-btn"
              type="submit"
              value="Register"
            />
          </div>
          <p className="" onClick={renderOnClick}>
            Already have an acconut? Go to login page.
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};

const rpcs = [withRPCRedux('register')];

const mapStateToProps = (state) => ({});

const hoc = compose(
  ...rpcs,
  connect(mapStateToProps)
);

export default hoc(Register);
