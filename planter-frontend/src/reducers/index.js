import { combineReducers } from 'redux';
import grettingReducer from './greetingReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  greeting: grettingReducer,
  profile: profileReducer,
});
