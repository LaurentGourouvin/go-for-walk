const userDataMapper = require('../../models/user');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
  async getAll(req, res) {
    const users = await userDataMapper.findAll();
    if (!users) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    return res.json(users);
  },
};
