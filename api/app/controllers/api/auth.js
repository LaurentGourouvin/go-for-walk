const authDataMapper = require('../../models/auth');

const jwt = require('../../helpers/jwt');

module.exports = {
  async register(req, res) {
    try {
      const newUser = req.body;
      const createUser = await authDataMapper.register(newUser);
      return res.json(createUser);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  },

  async login(req, res) {
    const user = req.body;
    try {
      const userFound = await authDataMapper.login(user);
      if (userFound.status === 'disabled') {
        return res.json({ errorMessage: 'utilisateur désactivé' });
      }
      const jwtTokens = jwt.jwtTokens(userFound);
      return res.json(jwtTokens);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  },
};
