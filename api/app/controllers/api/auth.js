const categoryDataMapper = require('../../models/auth');

const jwt = require('../../helpers/jwt');

module.exports = {
  async register(req, res) {
    try {
      const newUser = req.body;
      const createUser = await categoryDataMapper.register(newUser);
      return res.json(createUser);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  },

  async login(req, res) {
    const user = req.body;
    try {
      const userFound = await categoryDataMapper.login(user);
      const jwtTokens = jwt.jwtTokens(userFound);
      res.cookie('refresh_token', jwtTokens.refresh_token, { httpOnly: true });
      res.cookie('userId', userFound.id, { httpOnly: true });
      res.json(jwtTokens);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  },
};
