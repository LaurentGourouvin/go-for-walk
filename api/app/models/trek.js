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
    return result.rows;
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

  async create(trekData, imagePath) {
    const fields = [];
    const values = [];
    Object.keys(trekData).forEach((key) => {
      fields.push(`"${key}"`);
      values.push(`$${values.length + 1}`);
    });
    if (imagePath === null) {
      const result = await client.query(`INSERT INTO treks (${fields}) VALUES (${values}) RETURNING *`, Object.values(trekData));
      return result.rows[0];
    }
    const result = await client.query(`INSERT INTO treks (${fields}, pictures) VALUES (${values}, '{${imagePath}}') RETURNING *`, Object.values(trekData));
    return result.rows[0];
  },

  async addImage(trekData, urlImage) {
    const newPictures = trekData.pictures;
    newPictures.push(urlImage);
    console.log(newPictures);
    const result = await client.query(`UPDATE treks SET pictures = '{${newPictures}}' WHERE id = ${trekData.id} RETURNING *`);
    return result.rows[0];
  },
};
