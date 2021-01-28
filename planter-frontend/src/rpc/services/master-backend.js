const API_BASEPATH = 'http://localhost:8000/api';

const authEndpoints = ['register', 'login', 'refreshAuth'];

const fetchUserDataEndpoints = [
  'getProfile',
  'getTimers',
  'getWallet',
  'getGardens',
  'getPlots',
];

const userActionEndpoints = [
  // TIMER
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
  // WALLET
  'updateEnergy',
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
