const express = require('express');
const serve = require('express-static');
const cors = require('cors');
// const path = require('node:path');

const router = require('./routers');

const app = express();
require('./helpers/apiDocs')(app);

app.use(serve(`${__dirname}/uploads`));

// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

// On lève la restriction CORS pour nos amis React
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

/**
 * Le coeur de l'application c'est la dispatching des requêtes
 */
app.use(router);

module.exports = app;
