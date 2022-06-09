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
};
