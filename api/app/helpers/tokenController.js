const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = () => (req, res, next) => {
  if (req.headers.access_token) {
    try {
      const myUserToken = jwt.verify(req.headers.access_token, process.env.ACCESS_TOKEN_SECRET);
      req.userId = myUserToken.userId;
      return next();
    } catch (err) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
  } else {
    return res.status(401).json({ error: 'No token' });
  }
};
