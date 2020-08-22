// import React, { Component, useState } from 'react';

// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { withRPCRedux } from 'fusion-plugin-rpc-redux-react';

// import { useHistory } from 'fusion-plugin-react-router';

// import { NavLink, Link } from 'fusion-plugin-react-router';
// import paths from '../constants/paths';

// const Register = ({ register }) => {
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   // const [confirmPassword, setConfirmPassword] = useState('');

//   const history = useHistory();

//   const handleEmailInput = ({ target }) => {
//     setEmail(target.value);
//   };

//   const handleUsernameInput = ({ target }) => {
//     setUsername(target.value);
//   };

//   const handlePasswordInput = ({ target }) => {
//     setPassword(target.value);
//   };

//   // const handleConfirmPasswordInput = ({ target }) => {
//   //   setConfirmPassword(target.value);
//   // };

//   const handleRegistration = (event) => {
//     event.preventDefault();
//     register({ email, username, password });
//   };

//   const loginPage = () => {
//     // return <Register />;
//     history.push(`/login`);
//   };

//   return (
//     <React.Fragment>
//       <nav>
//         <Link to={paths.home}>home.</Link>
//         <Link to={paths.login}>login.</Link>
//         <NavLink activeClassName="inset" to={paths.register}>
//           register.
//         </NavLink>
//       </nav>
//       <div className="raised-panel auth-panel">
//         <form
//           onSubmit={handleRegistration}
//           // onSubmit={this.confirmPasswordMatch}
//         >
//           <div className="input-form">
//             <label>Email:</label>
//             <input
//               className="input-box inset"
//               value={email}
//               onChange={handleEmailInput}
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="input-form">
//             <label>Username:</label>
//             <input
//               className="input-box inset"
//               value={username}
//               onChange={handleUsernameInput}
//               type="text"
//               name="username"
//               placeholder="Username"
//               required
//             />
//           </div>
//           <div className="input-form">
//             <label>Password:</label>
//             <input
//               className="input-box inset"
//               value={password}
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handlePasswordInput}
//               required
//             />
//           </div>
//           {/* <div className="input-form">
//             <label>Confirm Password:</label>
//             <input
//               className="input-box inset"
//               value={confirmPassword}
//               type="password"
//               name="confirm_password"
//               placeholder="Confirm Password"
//               onChange={handleConfirmPasswordInput}
//               required
//             />
//           </div> */}
//           <div className="submit-btn">
//             <input
//               type="submit"
//               className="raised-btn auth-btn"
//               value="Register"
//             />
//           </div>
//           <p className="" onClick={loginPage}>
//             Already have an acconut? Go to login page.
//           </p>
//         </form>
//       </div>
//     </React.Fragment>
//   );
// };

// const rpcs = [withRPCRedux('register')];

// const mapStateToProps = (state) => ({
//   // auth: state.auth,
// });

// const hoc = compose(
//   ...rpcs,
//   connect(mapStateToProps)
// );

// export default hoc(Register);

// // export default class Register extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       email: '',
// //       username: '',
// //       password: '',
// //       confirm_password: '',
// //     };
// //     this.handleChange = this.handleChange.bind(this);
// //     this.confirmPasswordMatch = this.confirmPasswordMatch.bind(this);
// //   }

// //   //updating state values for username and password with user submitted values
// //   //passing the target input name to change/update when the user changes the field
// //   handleChange = ({ target }) => {
// //     console.log('Target  handlechange');
// //     this.setState({
// //       [target.name]: target.value,
// //     });
// //   };

// //   //verify passwords match and prevent submission unless form fields match
// //   confirmPasswordMatch = (e) => {
// //     console.log('confirmPasswordMatch');
// //     let password = this.state.password;
// //     let confirm_password = this.state.confirm_password;
// //     if (password !== confirm_password) {
// //       e.preventDefault();
// //       alert("Passwords don't match!");
// //       return false;
// //     }
// //   };

// //   render() {
// //     return (
// //       <React.Fragment>
// //         <nav>
// //           <Link to={paths.home}>home.</Link>
// //           <Link to={paths.login}>login.</Link>
// //           <NavLink activeClassName="inset" to={paths.register}>
// //             register.
// //           </NavLink>
// //         </nav>
// //         <div className="raised-panel auth-panel">
// //           <form
// //             action="/register"
// //             method="post"
// //             onSubmit={this.confirmPasswordMatch}
// //           >
// //             <div className="input-form">
// //               <label>Email:</label>
// //               <input
// //                 className="input-box inset"
// //                 value={this.state.email}
// //                 onChange={this.handleChange}
// //                 type="email"
// //                 name="email"
// //                 placeholder="Email"
// //                 required
// //               />
// //             </div>
// //             <div className="input-form">
// //               <label>Username:</label>
// //               <input
// //                 className="input-box inset"
// //                 value={this.state.username}
// //                 onChange={this.handleChange}
// //                 type="text"
// //                 name="username"
// //                 placeholder="Username"
// //                 required
// //               />
// //             </div>
// //             <div className="input-form">
// //               <label>Password:</label>
// //               <input
// //                 className="input-box inset"
// //                 value={this.state.password}
// //                 type="password"
// //                 name="password"
// //                 placeholder="Password"
// //                 onChange={this.handleChange}
// //                 required
// //               />
// //             </div>
// //             <div className="input-form">
// //               <label>Confirm Password:</label>
// //               <input
// //                 className="input-box inset"
// //                 value={this.state.confirm_password}
// //                 type="password"
// //                 name="confirm_password"
// //                 placeholder="Confirm Password"
// //                 onChange={this.handleChange}
// //                 required
// //               />
// //             </div>
// //             <div className="submit-btn">
// //               <input type="submit" value="Register" />
// //             </div>
// //           </form>
// //         </div>
// //       </React.Fragment>
// //     );
// //   }
// // }
