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
    const picProfile = `${process.env.API_ADRESS_LOCAL}uploads/${req.file.filename}`;
    req.body.profil_picture = picProfile;
    console.log(req.body);
    const userUpdate = await userDataMapper.update(req.params.id, req.body);
    return res.json(userUpdate);
  },

  async deletUser(req, res) {
    const user = await userDataMapper.findByPk(req.params.id);
    if (!user) {
      throw new Error('no users found');
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
