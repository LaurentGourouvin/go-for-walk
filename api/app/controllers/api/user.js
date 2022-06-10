const userDataMapper = require('../../models/user');

module.exports = {
  async getAll(req, res) {
    const users = await userDataMapper.findAll();
    return res.json(users);
  },
};
