// rpc handlers
import axios from 'axios';

//write code to get the access token to automatically refresh

// const refreshToken = (ctx, args) => {
//   if (!ctx.access_token) {
//   }
// };

export default {
  greet: async (args, ctx) => {
    console.log(args);
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 10000);
    });
    await p;
    return {
      greeting: `hell0!! ${args.name}`,
      test: 'test',
      profile: 'user123',
    };
  },
  getProfile: async (args, ctx) => {
    const headers = { authorization: `Bearer ${ctx.access_token}` };
    const result = await axios({
      method: 'POST',
      headers,
      url: 'http://localhost:8000/api/getProfile/',
    })
      .then((res) => {
        console.log('testing if log works');
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
};
