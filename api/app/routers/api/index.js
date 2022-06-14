const express = require('express');
const userRouter = require('./user');
const authRouter = require('./auth');
const trekRouter = require('./trek');
const labelRouter = require('./label');

const router = express.Router();

// Les routes pour l'API
router.all('/', (req, res) => {
  res.send('Welcome Go For Walk Home');
});

// On préfixe les routers de l'API
router.use('/auth', authRouter);

router.use('/users', userRouter);

router.use('/treks', trekRouter);

router.use('/labels', labelRouter);

router.use(() => {
  // Ici on force une erreur, afin de déclencher le gestionnaire d'erreur et donc l'affichage de
  // l'erreur
  throw new Error('API Route not found', { statusCode: 404 });
});

module.exports = router;
