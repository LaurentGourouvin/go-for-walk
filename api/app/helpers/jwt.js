const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
module.exports = {

  jwtTokens(userdata) {
    const user = { userId: userdata.id, userName: userdata.name };
    return {
      access_token: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '5h' }),
      refresh_token: jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '2h' }),
    };
  },
};
