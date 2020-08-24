import { combineReducers } from 'redux';
import profile from './profileReducer';
import timers from './timersReducer';
import authentication from './authReducer';
import wallet from './walletReducer';

// used to access Redux Store state - imported into main.js
export default combineReducers({
  authentication,
  profile,
  wallet,
  timers,
});
