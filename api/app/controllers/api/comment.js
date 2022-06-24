const commentDataMapper = require('../../models/comment');

module.exports = {
  async create(req, res) {
    const userComments = await commentDataMapper.checkIfAlreadyComment(req.userId);
    const verif = [];
    userComments.forEach((comment) => {
      if (comment.trek_id_from_comment === req.body.trek_id) {
        verif.push(comment);
      }
    });
    if (verif.length > 0) {
      return res.json({ errorMessage: 'You already comment this trek' });
    }
    req.body.user_id = req.userId;
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
