require('dotenv').config();
const { Client } = require('pg');
const difficulties = require('./difficulty.json');

(async () => {
  const client = new Client({
    connectionString: 'postgres://goforwalk:goforwalk@localhost:5432/goforwalk',
  });
  await client.connect();
  await client.query('DELETE FROM "difficulty"');
  const difficultyQuery = [];
  difficulties.forEach((difficulty) => {
    const query = client.query('INSERT INTO "difficulty" ("label") VALUES ($1)', [difficulty.label]);
    difficultyQuery.push(query);
  });
  const results = await Promise.all(difficultyQuery);
  const difficultyRows = results.map((result) => result.rows[0]);
  console.log(difficultyRows);
  client.end();
})();
