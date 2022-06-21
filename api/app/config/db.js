const debug = require('debug')('SQL:log');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(dbConfig);

module.exports = {
  originalClient: pool,
  async query(...params) {
    debug(...params);
    return this.originalClient.query(...params);
  },
};
