const trekDataMapper = require('../../models/trek');

module.exports = {
  async getAll(req, res) {
    const treks = await trekDataMapper.findAll();
    if (!treks) {
      throw new Error('no trek found');
    }
    return res.json(treks);
  },

  async getById(req, res) {
    const trek = await trekDataMapper.findByPk(req.params.id);
    if (!trek) {
      throw new Error('no trek found');
    }
    return res.json(trek);
  },

  async getByCity(req, res) {
    const treks = await trekDataMapper.findByCity(req.params.city);
    if (!treks) {
      throw new Error('no trek found');
    }
    return res.json(treks);
  },

  async updateTrek(req, res) {
    const trek = await trekDataMapper.findByPk(req.params.id);
    if (!trek) {
      throw new Error('no trek found');
    }
    const trekUpdate = await trekDataMapper.update(req.params.id, req.body);
    return res.json(trekUpdate);
  },

  async deletTrek(req, res) {
    const trek = await trekDataMapper.findByPk(req.params.id);
    if (!trek) {
      throw new Error('no trek found');
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
    req.body.coordinate = `{${req.body.coordinate}}`;
    console.log(req.file);
    console.log(req.body);
    const imagePath = `http://localhost:8080/api/${req.file.path}`;
    console.log(imagePath);
    const trek = await trekDataMapper.create(req.body, imagePath);
    return res.json(trek);
  },
};
