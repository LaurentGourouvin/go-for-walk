const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const path = require('node:path');

const router = require('./routers');

const app = express();
require('./helpers/apiDocs')(app);

app.use('/uploads', express.static('uploads'));
// On active le middleware pour parser le payload JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

// On lève la restriction CORS pour nos amis React
app.use(cors(process.env.CORS_DOMAINS ?? '*'));

/**
 * Le coeur de l'application c'est la dispatching des requêtes
 */
app.use(router);

module.exports = app;
