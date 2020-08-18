import { combineReducers } from 'redux';
import profile from './profileReducer';
import timers from './timersReducer';
import authentication from './loginReducer';

export default combineReducers({
  authentication,
  profile,
  timers,
});
