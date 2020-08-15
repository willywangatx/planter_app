// rpc handlers
import axios from 'axios';

import { ResponseError } from 'fusion-plugin-rpc';

//write code to get the access token to automatically refresh

// const refreshToken = (ctx, args) => {
//   if (!ctx.access_token) {
//   }
// };

export default {
  register: async (args, ctx) => {
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/register/',
      data: args,
    })
      .then((res) => {
        ctx['access_token'] = res.data.access;
        ctx['refresh_token'] = res.data.refresh;
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  },

  login: async (args, ctx) => {
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/login/',
      data: args,
    })
      .then((res) => {
        // ctx['username'] = res.data.username;
        ctx['access_token'] = res.data.access;
        ctx['refresh_token'] = res.data.refresh;
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  },

  getProfile: async (args, ctx) => {
    const headers = { Authorization: `Bearer ${ctx.access_token}` };
    const result = await axios({
      method: 'POST',
      headers,
      url: 'http://localhost:8000/api/getProfile/',
    })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        // const respError = new ResponseError(err);
        // respError.meta = args;
        const responseError = new ResponseError(
          `Could not load profile data, error: ${err.message}`
        );
        throw responseError;
      });
    return result;
  },

  getTimers: async (args, ctx) => {
    const headers = { Authorization: `Bearer ${ctx.access_token}` };
    const result = await axios({
      method: 'POST',
      headers,
      url: 'http://localhost:8000/api/getTimers/',
    })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        // const respError = new ResponseError(err);
        // respError.meta = args;
        const responseError = new ResponseError(
          `Could not load timer data, error: ${err.message}`
        );
        throw responseError;
      });
    return result;
  },

  incrementFocusTime: async (args, ctx) => {
    const headers = { Authorization: `Bearer ${ctx.access_token}` };
    const result = await axios({
      method: 'POST',
      headers,
      url: 'http://localhost:8000/api/incrementFocusTime/',
      data: args,
    })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        const responseError = new ResponseError(
          `Could not increment focus time, error: ${err.message}`
        );
        throw responseError;
      });
    return result;
  },

  decrementFocusTime: async (args, ctx) => {
    const headers = { Authorization: `Bearer ${ctx.access_token}` };
    const result = await axios({
      method: 'POST',
      headers,
      url: 'http://localhost:8000/api/decrementFocusTime/',
      data: args,
    })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        const responseError = new ResponseError(
          `Could not decrement focus time, error: ${err.message}`
        );
        throw responseError;
      });
    return result;
  },

  incrementBreakTime: async (args, ctx) => {
    const headers = { Authorization: `Bearer ${ctx.access_token}` };
    const result = await axios({
      method: 'POST',
      headers,
      url: 'http://localhost:8000/api/incrementBreakTime/',
      data: args,
    })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        const responseError = new ResponseError(
          `Could not increment break time, error: ${err.message}`
        );
        throw responseError;
      });
    return result;
  },

  decrementBreakTime: async (args, ctx) => {
    const headers = { Authorization: `Bearer ${ctx.access_token}` };
    const result = await axios({
      method: 'POST',
      headers,
      url: 'http://localhost:8000/api/decrementBreakTime/',
      data: args,
    })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        const responseError = new ResponseError(
          `Could not decrement break time, error: ${err.message}`
        );
        throw responseError;
      });
    return result;
  },
};
