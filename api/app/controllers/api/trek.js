const trekDataMapper = require('../../models/trek');

module.exports = {
  async getAll(req, res) {
    const treks = await trekDataMapper.findAll();
    if (!treks) {
      res.status(204).send({ message: 'No Trek found' });
    }
    return res.json(treks);
  },

  async getById(req, res) {
    const trek = await trekDataMapper.findByPk(req.params.id);
    if (!trek) {
      res.status(204).send({ message: 'No Trek found' });
    }
    return res.json(trek);
  },

  async updateTrek(req, res) {
    const trek = await trekDataMapper.findByPk(req.params.id);
    if (!trek) {
      res.status(204).send({ message: 'No Trek found' });
    }
    const trekUpdate = await trekDataMapper.update(req.params.id, req.body);
    return res.json(trekUpdate);
  },

  async deletTrek(req, res) {
    const trek = await trekDataMapper.findByPk(req.params.id);
    if (!trek) {
      res.status(204).send({ message: 'No Trek found' });
    }
    try {
      await trekDataMapper.delet(req.params.id);
    } catch (error) {
      res.status(500);
      throw new Error('Internal Server Error', { statusCode: 500 });
    }
    return res.json(trek);
  },

  async createTrek(req, res) {
    const trek = await trekDataMapper.create(req.body);
    return res.json(trek);
  },
};
