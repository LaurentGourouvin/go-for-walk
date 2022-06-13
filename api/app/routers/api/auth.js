const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');
const authController = require('../../controllers/api/auth');

const router = express.Router();
router
  .route('/register')

/**
     * POST /api/auth/register
     * @summary Create New User
     * @tags Auth
     * @param {User} request.body.required - user info
     * @returns {object} 200 - Utilisateur crée
     */
  .post(controllerHandler(authController.register));

module.exports = router;
