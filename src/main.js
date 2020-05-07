// @flow
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
// import Styletron from 'fusion-plugin-styletron-react';

import root from './root.js';

export default () => {
  const app = new App(root);
  // app.register(Styletron);
  app.register(Router);

  if (__NODE__) {
    const LoginAuthPlugin = require('./plugins/loginAuth').default;
    app.register(LoginAuthPlugin);
    const RegisterAuthPlugin = require('./plugins/registerAuth').default;
    app.register(RegisterAuthPlugin);
  }
  return app;
};
