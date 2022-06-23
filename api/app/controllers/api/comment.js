const commentDataMapper = require('../../models/comment');

module.exports = {
  async create(req, res) {
    const comment = await commentDataMapper.create(req.body);
    if (!comment) {
      throw new Error('no comment found');
    }
    return res.json(comment);
  },
  async delete(req, res) {
    const comment = await commentDataMapper.delete(req.params.id);
    if (!comment) {
      throw new Error('no comment found');
    }
    return res.json(comment);
  },
};
