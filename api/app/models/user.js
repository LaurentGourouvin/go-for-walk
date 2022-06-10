const client = require('../config/db');

module.exports = {

  async findAll() {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  },

  async findByPk(userId) {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
  },

  async update(userId, user) {
    // eslint-disable-next-line no-shadow
    const fields = Object.keys(user).map((user, index) => `"${user}" = $${index + 1}`);
    const values = Object.values(user);
    // eslint-disable-next-line no-template-curly-in-string
    const result = await client.query(`UPDATE users SET ${fields} WHERE id = ${userId}`, values);
    return result.rows[0];
  },

  async delet(userId) {
    const result = await client.query('DELETE FROM users WHERE id = $1', [userId]);
    return result.rows[0];
  },
};
