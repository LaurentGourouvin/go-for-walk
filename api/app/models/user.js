const bcrypt = require('bcrypt');
const client = require('../config/db');

const saltRounds = 10;

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
    if (user.password) {
      // eslint-disable-next-line no-param-reassign
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    const fields = [];
    const values = [];
    Object.keys(user).forEach((key) => {
      fields.push(`${key} = $${1 + fields.length}`);
      values.push(user[key]);
    });
    const result = await client.query(`UPDATE users SET ${fields} WHERE id = ${userId}`, values);
    return result.rows[0];
  },

  async delet(userId) {
    const result = await client.query('DELETE FROM "users" WHERE id = $1', [userId]);
    return result.rows[0];
  },
};
