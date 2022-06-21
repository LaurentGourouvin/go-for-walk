const http = require('http');
const dotenv = require('dotenv');
const debug = require('debug')('app:server');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const port = process.env.PORT ?? 8080;

const app = require('./app');

const server = http.createServer(app);

server.listen(port, () => {
  debug(`Listening on ${port}`);
});
