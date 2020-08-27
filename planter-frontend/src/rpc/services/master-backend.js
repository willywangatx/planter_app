const API_BASEPATH = 'http://localhost:8000/api';

const authEndpoints = ['register', 'login', 'refreshAuth'];

const fetchUserDataEndpoints = ['getProfile', 'getTimers', 'getWallet'];

const userActionEndpoints = [
  'incrementFocusTime',
  'decrementFocusTime',
  'incrementBreakTime',
  'decrementBreakTime',
  'resetTimers',
  'setCycle',
  'startTimers',
  'stopTimers',
  'updateCurrentTimes',
  'updateCompletedFocusMinutes',
];

const masterBackend = {
  name: 'master backend',
  basePath: API_BASEPATH,
  endpoints: [
    ...authEndpoints,
    ...fetchUserDataEndpoints,
    ...userActionEndpoints,
  ],
};

export default masterBackend;