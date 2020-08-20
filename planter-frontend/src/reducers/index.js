import { combineReducers } from 'redux';
import profile from './profileReducer';
import timers from './timersReducer';
import authentication from './loginReducer';

// used to access Redux Store state - imported into main.js
export default combineReducers({
  authentication,
  profile,
  timers,
});
