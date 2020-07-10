// handlers
import axios from 'axios';
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
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/getProfile/',
    })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  },
};
