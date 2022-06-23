const trekDataMapper = require('../../models/trek');
const myFunction = require('../../helpers/functions');

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
    if (req.body.coordinate) {
      req.body.coordinate = `{${req.body.coordinate}}`;
    }
    req.body.city = myFunction.uppercaseFirstLetter(req.body.city);
    if (req.files.length > 0) {
      const imagePath = [];
      req.files.forEach((file) => {
        if (process.env.NODE_ENV === 'production') {
          imagePath.push(`${process.env.API_ADRESS_VPS}uploads/${file.filename}`);
        } else {
          imagePath.push(`${process.env.API_ADRESS_LOCAL}uploads/${file.filename}`);
        }
      });
      const trek = await trekDataMapper.create(req.body, imagePath);
      return res.json(trek);
    }
    delete req.body.files;
    const imagePath = null;
    const trek = await trekDataMapper.create(req.body, imagePath);
    return res.json(trek);
  },

  async addImage(req, res) {
    const trekToUpdate = await trekDataMapper.findByPk(req.params.id);
    let newImage;
    if (process.env.NODE_ENV === 'production') {
      newImage = `${process.env.API_ADRESS_VPS}uploads/${req.file.filename}`;
    } else {
      newImage = `${process.env.API_ADRESS_LOCAL}uploads/${req.file.filename}`;
    }
    const trek = await trekDataMapper.addImage(trekToUpdate, newImage);
    return res.json(trek);
  },

  async deleteImage(req, res) {
    const trekToUpdate = await trekDataMapper.findByPk(req.body.id);
    const trek = await trekDataMapper.deleteImage(trekToUpdate, req.body.image);
    return res.json(trek);
  },

  async getTreksByUser(req, res) {
    const trekUserId = await trekDataMapper.findByUserPk(req.params.id);
    return res.json(trekUserId);
  },

  async checkMaxImage(req, res, next) {
    const trekToCheck = await trekDataMapper.findByPk(req.params.id);
    const myArray = trekToCheck.pictures;
    if (myArray.length < 5) {
      next();
    } else {
      res.send('You can not add more than 5 images');
    }
  },
};
