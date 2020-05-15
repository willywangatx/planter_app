import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';
import Root from './root.js';
import HelmetPlugin from 'fusion-plugin-react-helmet-async';

export default () => {
  const app = new App(Root);
  app.register(Router);
  app.register(Styletron);
  app.register(HelmetPlugin);

  if (__NODE__) {
    const LoginAuthPlugin = require('./plugins/loginAuth').default;
    app.register(LoginAuthPlugin);
    const RegisterAuthPlugin = require('./plugins/registerAuth').default;
    app.register(RegisterAuthPlugin);
  }
  return app;
};
