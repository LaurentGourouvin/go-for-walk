const client = require('../config/db');
const myfunction = require('../helpers/functions');

module.exports = {
  async findAll() {
    // La récupération de toutes les catégories ne justifie d'aucune manière la création d'une
    // fonction. Que ce soit au niveau de la simplification d'ecriture ou à l'optimisation par
    // cache de la récupération des infos
    const result = await client.query('SELECT * FROM treks');
    return result.rows;
  },

  async findByPk(trekId) {
    const result = await client.query('SELECT * FROM treks WHERE id = $1', [trekId]);
    return result.rows[0];
  },

  async findByCity(trekCity) {
    const city = myfunction.uppercaseFirstLetter(trekCity);
    const result = await client.query('SELECT * FROM treks WHERE city = $1', [city]);
    return result.rows[0];
  },

  async update(trekId, trekData) {
    const fields = [];
    const values = [];
    Object.keys(trekData).forEach((key) => {
      fields.push(`${key} = $${1 + fields.length}`);
      values.push(trekData[key]);
    });
    const result = await client.query(`UPDATE treks SET ${fields} WHERE id = ${trekId}`, values);
    return result.rows[0];
  },

  async delet(id) {
    const result = await client.query('DELETE FROM treks WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(trekData) {
    const fields = [];
    const values = [];
    Object.keys(trekData).forEach((key) => {
      fields.push(`"${key}"`);
      values.push(`$${values.length + 1}`);
    });
    const result = await client.query(`INSERT INTO treks (${fields}) VALUES (${values}) RETURNING *`, Object.values(trekData));
    return result.rows[0];
  },
};
