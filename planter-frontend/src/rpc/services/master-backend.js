const API_BASEPATH = 'http://localhost:8000/api';

const authEndpoints = ['register', 'login', 'refreshAuth'];

// const REGISTER_ENDPOINT = 'register';
// const LOGIN_ENDPOINT = 'login';
// const REFRESH_ENDPOINT = 'refreshAuth';

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
  //   registerEndpoint: REFRESH_ENDPOINT,
  //   loginEndpoint: LOGIN_ENDPOINT,
  //   refreshEndpoint: REFRESH_ENDPOINT,
  endpoints: [
    ...authEndpoints,
    ...fetchUserDataEndpoints,
    ...userActionEndpoints,
  ],
};

export default masterBackend;
