const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {

  jwtTokens({ userId, userName, userEmail }) {
    const user = { userId, userName, userEmail };
    return {
      access_token: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256' }),
      refresh_token: jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256' }),
    };
  },
};
