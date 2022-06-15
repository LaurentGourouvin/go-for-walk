const bcrypt = require('bcrypt');
const client = require('../config/db');

const saltRounds = 10;

module.exports = {
  async register(newUser) {
    const findUser = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [newUser.email],
    );
    if (findUser.rows.length > 0) {
      throw new Error('User already exists');
    }
    const hashPassword = await bcrypt.hash(newUser.password, saltRounds);
    const result = await client.query(`INSERT INTO users (firstname, name, email, password) VALUES ('${newUser.firstname}','${newUser.name}','${newUser.email}','${hashPassword}') RETURNING *`);
    return result.rows[0];
  },

  async login(user) {
    const result = await client.query(`SELECT * FROM users WHERE email = '${user.email}'`);
    if (!result) {
      throw new Error('User not found');
    }
    const userFound = result.rows[0];
    const isPasswordValid = await bcrypt.compare(user.password, userFound.password);
    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }
    return userFound;
  },
};
