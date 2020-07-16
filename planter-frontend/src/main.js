import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';
import Root from './root.js';
import HelmetPlugin from 'fusion-plugin-react-helmet-async';
// fusion-plugin-rpc-redux-react imports
import UniversalEvents, {
  UniversalEventsToken,
} from 'fusion-plugin-universal-events';
import Redux, { ReduxToken, ReducerToken } from 'fusion-plugin-react-redux';
import RPC, { RPCToken, RPCHandlersToken } from 'fusion-plugin-rpc';
import { SessionToken } from 'fusion-tokens';
import { FetchToken } from 'fusion-tokens';

import JWTSession, {
  SessionSecretToken,
  SessionCookieNameToken,
  SessionCookieExpiresToken,
} from 'fusion-plugin-jwt';

import fetch from 'unfetch';

import reducer from './reducers/index.js';

export default () => {
  const app = new App(Root);

  if (__BROWSER__) {
    app.register(FetchToken, fetch);
  }

  if (__NODE__) {
    const handlers = require('./rpc/index').default;

    // const LoginPlugin = require('./plugins/login.js').default;
    // app.register(LoginPlugin);

    // const RegisterPlugin = require('./plugins/register').default;
    // app.register(RegisterPlugin);

    const AuthPlugin = require('./plugins/auth.js').default;
    app.register(AuthPlugin);

    app.register(RPCHandlersToken, handlers);
    //jwt session adds cookie to request
    app.register(SessionToken, JWTSession);
    app.register(SessionSecretToken, 'some-secret');
    app.register(SessionCookieNameToken, 'planter-cookie');
    app.register(SessionCookieExpiresToken, 86400);
  }

  app.register(Router);
  app.register(Styletron);
  app.register(HelmetPlugin);
  app.register(RPCToken, RPC);

  app.register(UniversalEventsToken, UniversalEvents);
  app.register(ReduxToken, Redux);
  app.register(ReducerToken, reducer);

  return app;
};
