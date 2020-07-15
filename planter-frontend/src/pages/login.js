import React, { Component, useEffect, useState } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';

import { NavLink, Link } from 'fusion-plugin-react-router';
import paths from '../constants/paths';

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login({ email, password });
  };

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
        <form onSubmit={handleLogin}>
          <div className="input-form">
            <label className="raised-panel auth-raised">Email:</label>
            <input
              className="input-box inset"
              value={email}
              onChange={handleEmailChange}
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
              value={password}
              onChange={handlePasswordChange}
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
};

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }

//   handleChange = ({ target }) => {
//     this.setState({
//       [target.name]: target.value,
//     });
//   };

//   handleLogin = (event) => {
//     event.preventDefault();
//     console.log(`${this.state.email}`);
//     props.login({ email: this.state.email, password: this.state.password });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <nav>
//           <Link to={paths.home}>home.</Link>
//           <NavLink activeClassName="inset" to={paths.login}>
//             login.
//           </NavLink>
//           <Link to={paths.register}>register.</Link>
//         </nav>
//         <div className="raised-panel auth-panel">
//           <form onSubmit={this.handleLogin}>
//             <div className="input-form">
//               <label className="raised-panel auth-raised">Email:</label>
//               <input
//                 className="input-box inset"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//                 type="text"
//                 name="email"
//                 placeholder="Email"
//                 required
//               />
//             </div>
//             <div className="input-form">
//               <label className="raised-panel auth-raised">Password:</label>
//               <input
//                 className="input-box inset"
//                 value={this.state.password}
//                 onChange={this.handleChange}
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 required
//               />
//             </div>
//             <div className="submit-btn">
//               <input className="auth-btn" type="submit" value="Login" />
//             </div>
//           </form>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

const rpcs = [withRPCRedux('login')];

const mapStateToProps = (state) => ({
  // auth: state.auth,
});

const hoc = compose(
  ...rpcs,
  connect(mapStateToProps)
);

export default hoc(Login);
