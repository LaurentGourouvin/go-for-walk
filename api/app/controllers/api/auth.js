const categoryDataMapper = require('../../models/auth');

module.exports = {
  async register(req, res) {
    const newUser = req.body;
    const createUser = await categoryDataMapper.register(newUser);
    return res.json(createUser);
  },
};
