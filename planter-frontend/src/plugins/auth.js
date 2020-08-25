import { createPlugin } from 'fusion-core';
import { SessionToken } from 'fusion-tokens';

import { ResponseError } from 'fusion-plugin-rpc';
// import responseError from 'fusion-plugin-rpc/dist-node-cjs/response-error';

export default createPlugin({
  // injectable programatic api dependency
  deps: {
    Session: SessionToken,
  },
  middleware({ Session }) {
    return async (ctx, next) => {
      // plugin creates memoized instance per request using below

      // happnens before virtual dom rendering

      const session = Session.from(ctx);
      // console.log(session);
      ctx['access_token'] = session.get('access_token');
      ctx['refresh_token'] = session.get('refresh_token');
      // console.log(session.access_token, session.refresh_token);

      // const hasAuthTokens =
      //   session.get('access_token') && session.get('refresh_token');

      // const userAuthRoute =
      //   ctx.path.startsWith('/api/login') ||
      //   ctx.path.startsWith('/api/register');

      // const apiCall = ctx.path.startsWith('/api');

      // if (!hasAuthTokens && !userAuthRoute && apiCall) {
      //   // const responseError = new ResponseError(`testing auth error code`);
      //   // throw responseError;
      //   ctx.status = 200;
      //   ctx.body = {
      //     status: 'failure',
      //     data: {
      //       message: 'User not authenticated, log in',
      //       code: 'NOT_LOGGED_IN',
      //     },
      //   };
      //   return;
      // }

      await next();

      // happens after virtual dom rendering but before response sent to browser
      if (ctx.access_token && ctx.refresh_token) {
        session.set('access_token', ctx['access_token']);
        session.set('refresh_token', ctx['refresh_token']);
      }

      // console.log(session);
    };
  },
});
