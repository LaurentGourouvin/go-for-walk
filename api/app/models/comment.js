const client = require('../config/db');

module.exports = {
  async create(commentData) {
    const fields = [];
    const values = [];
    Object.keys(commentData).forEach((key) => {
      fields.push(`"${key}"`);
      values.push(`$${values.length + 1}`);
    });
    const result = await client.query(`INSERT INTO comments (${fields}) VALUES (${values}) RETURNING *`, Object.values(commentData));
    return result.rows[0];
  },
  async delete(commentID) {
    const result = await client.query('DELETE FROM comments WHERE id = $1 RETURNING *', [commentID]);
    return result.rows[0];
  },
};
