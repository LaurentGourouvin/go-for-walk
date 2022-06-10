const userDataMapper = require('../../models/user');

module.exports = {
  async getAll(req, res) {
    const users = await userDataMapper.findAll();
    if (!users) {
      res.status(204).send({ message: 'No users found' });
    }
    return res.json(users);
  },

  async getById(req, res) {
    const user = await userDataMapper.findByPk(req.params.id);
    if (!user) {
      res.status(204).send({ message: 'No users found' });
    }
    return res.json(user);
  },

  async updateUser(req, res) {
    const user = await userDataMapper.findByPk(req.params.id);
    if (!user) {
      res.status(204).send({ message: 'No users found' });
    }
    const userUpdate = await userDataMapper.update(req.params.id, req.body);
    return res.json(userUpdate);
  },

  async deletUser(req, res) {
    const user = await userDataMapper.findByPk(req.params.id);
    if (!user) {
      res.status(204).send({ message: 'No users found' });
    }
    try {
      await userDataMapper.delet(req.params.id);
    } catch (error) {
      res.status(500);
      throw new Error('Internal Server Error', { statusCode: 500 });
    }
    return res.json(user);
  },
};
