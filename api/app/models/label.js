const client = require('../config/db');

module.exports = {

  async findAll() {
    const result = await client.query('SELECT * FROM difficulty');
    return result.rows;
  },

  async findByPk(labelId) {
    const result = await client.query('SELECT * FROM "difficulty" WHERE id = $1', [labelId]);
    return result.rows[0];
  },
};
