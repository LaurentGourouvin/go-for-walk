const client = require('../config/db');
const myfunction = require('../helpers/functions');

module.exports = {
  async findAll() {
    const result = await client.query('SELECT * FROM treks');
    return result.rows;
  },

  async findByPk(trekId) {
    const result = await client.query(`SELECT treks.*, json_agg(
      json_build_object(
      'infos', comments,
      'author', json_build_object(
      'id', users.id,
      'firstname', users.firstname,
      'name', users.name
      )
      )
      )
      FILTER (WHERE comments.id IS NOT NULL)
      AS comments FROM treks
      LEFT OUTER JOIN comments ON comments.trek_id = treks.id
      LEFT OUTER JOIN users ON comments.user_id = users.id
      WHERE treks.id = $1
      GROUP BY treks.id, comments.trek_id`, [trekId]);
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
    const result = await client.query(`UPDATE treks SET ${fields} WHERE id = ${trekId} RETURNING *`, values);
    return result.rows[0];
  },

  async delet(id) {
    const result = await client.query('DELETE FROM treks WHERE id = $1 RETURNING *', [id]);
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
    const result = await client.query(`UPDATE treks SET pictures = '{${newPictures}}' WHERE id = ${trekData.id} RETURNING *`);
    return result.rows[0];
  },

  async deleteImage(trekData, urlToDelete) {
    const deletPictures = trekData.pictures;
    const newPictures = deletPictures.filter((url) => url !== urlToDelete);
    const result = await client.query(`UPDATE treks SET pictures = '{${newPictures}}' WHERE id = ${trekData.id} RETURNING *`);
    return result.rows[0];
  },

  async findByUserPk(userId) {
    const result = await client.query('SELECT * FROM treks WHERE user_id = $1', [userId]);
    return result.rows;
  },
};
