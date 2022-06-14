const labelDataMapper = require('../../models/label');

module.exports = {
  async getAll(req, res) {
    const labels = await labelDataMapper.findAll();
    if (!labels) {
      throw new Error('no labels found');
    }
    return res.json(labels);
  },

  async getById(req, res) {
    const label = await labelDataMapper.findByPk(req.params.id);
    if (!label) {
      throw new Error('no label found');
    }
    return res.json(label);
  },
};
