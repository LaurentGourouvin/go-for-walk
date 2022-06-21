const userDataMapper = require('../../models/user');

module.exports = {
  async getAll(req, res) {
    const users = await userDataMapper.findAll();
    if (!users) {
      throw new Error('no users found');
    }
    return res.json(users);
  },

  async getById(req, res) {
    const user = await userDataMapper.findByPk(req.params.id);
    if (!user) {
      throw new Error('no users found');
    }
    return res.json(user);
  },

  async updateUser(req, res) {
    const user = await userDataMapper.findByPk(req.params.id);
    if (!user) {
      throw new Error('no users found');
    }
    const userUpdate = await userDataMapper.update(req.params.id, req.body);
    return res.json(userUpdate);
  },

  async disabledUser(req, res) {
    const user = await userDataMapper.disabledUser(req.params.id);
    return res.json(user);
  },
};
