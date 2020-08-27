import axios from 'axios';
import { ResponseError } from 'fusion-plugin-rpc';
import axios from 'axios';

export const fireBackendCall = (
  backend,
  endpoint,
  args,
  ctx,
  wtihRefresh = true
) => {};

export const refreshAuth = async (ctx) => {
  const data = { refresh: ctx.refresh_token };
  const result = await axios({
    method: 'POST',
    url: 'http://localhost:8000/api/refreshAuth/',
    data,
  })
    .then((res) => {
      if (res.data.access) {
        ctx.access_token = res.data.access;
      }
      if (res.data.refresh) {
        ctx.refresh_token = res.data.refresh;
      }
      return res.data;
    })
    .catch((err) => {
      const responseError = new ResponseError(
        `Auth refresh attempt unsuccessful, error: ${err.message}`
      );
      throw responseError;
    });
};
