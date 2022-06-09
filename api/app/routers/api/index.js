const express = require('express');

const router = express.Router();

// Les routes pour l'API
router.all('/', (req, res) => {
  res.send('Welcome Go For Walk Home');
});

// On préfixe les routers de l'API
router.use('/trek', (req, res) => {
  res.send('coucou les trek');
});

router.use('/user', (req, res) => {
  res.send('coucou les user');
});

router.use(() => {
  // Ici on force une erreur, afin de déclencher le gestionnaire d'erreur et donc l'affichage de
  // l'erreur
  throw new Error('API Route not found', { statusCode: 404 });
});

module.exports = router;
