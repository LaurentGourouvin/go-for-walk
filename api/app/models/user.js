const client = require('../config/db');

module.exports = {

  async findAll() {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  },

  async findByPk(userId) {
    const result = await client.query('SELECT * FROM "users" WHERE id = $1', [userId]);
    return result.rows[0];
  },

  async update(userId, user) {
    const fields = [];
    const values = [];
    Object.keys(user).forEach((key) => {
      fields.push(`${key} = $${1 + fields.length}`);
      values.push(user[key]);
    });
    const result = await client.query(`UPDATE users SET ${fields} WHERE id = ${userId} RETURNING *`, values);
    return result.rows[0];
  },

  async delet(userId) {
    const result = await client.query('DELETE FROM "users" WHERE id = $1', [userId]);
    return result.rows[0];
  },
};
