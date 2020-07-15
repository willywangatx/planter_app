import { createPlugin } from 'fusion-core';
import bodyParser from 'koa-bodyparser';
import axios from 'axios';

export default createPlugin({
  middleware() {
    const parseBody = bodyParser();
    return async (ctx, next) => {
      // handler
      if (ctx.path === '/login' && ctx.method === 'POST') {
        await parseBody(ctx, () => Promise.resolve);
        console.log(ctx.request.body);

        axios({
          method: 'POST',
          url: 'http://localhost:8000/api/login/',
          // 4 sec timeout
          timeout: 4000,
          data: ctx.request.body,
        })
          .then((res) => {
            ctx.body = res;
            console.log(res);
            // axios({
            //   method: 'GET',
            //   url: 'http://localhost:8000/'
            //   data: ctx.body,
            // })
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return next();
    };
  },
});
