const client = require('../config/db');

module.exports = {
  async register(newUser) {
    const result = await client.query(`INSERT INTO users (firstname, name, email, password) VALUES ('${newUser.firstname}','${newUser.name}','${newUser.email}','${newUser.password}') RETURNING *`);
    return result.rows[0];
  },
};
