const client = require('../config/db');

module.exports = {

  async findAll() {
    // La récupération de toutes les catégories ne justifie d'aucune manière la création d'une
    // fonction. Que ce soit au niveau de la simplification d'ecriture ou à l'optimisation par
    // cache de la récupération des infos
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  },

  async findByPk(userId) {
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
  },

  async updateUser(userId, user) {
    // eslint-disable-next-line no-shadow
    const fields = Object.keys(user).map((user, index) => `"${user}" = $${index + 1}`);
    const values = Object.values(user);
    // eslint-disable-next-line no-template-curly-in-string
    const result = await client.query(`UPDATE users SET ${fields} WHERE id = ${userId}`, values);
    return result.rows[0];
  },

  async delet(id) {
    const result = await client.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },
};
