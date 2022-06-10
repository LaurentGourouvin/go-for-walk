const express = require('express');
const controllerHandler = require('../../helpers/controllerHandler');
const authController = require('../../controllers/api/auth');

const router = express.Router();
router
  .route('/register')
  /**
 * A User is create with the following parameters :
     * @typedef {object} User
     * @property {string} firstname.required - user firstname
     * @property {string} name.required - user lastname
     * @property {string} email.required - user email
     * @property {string} password.required - user password
 */
/**
     * POST /api/auth/register
     * @summary Create New User
     * @tags Auth
     * @param {User} request.body.required - user info
     * @returns {object} 200 - Utilisateur crée
     */
  .post(controllerHandler(authController.register));

module.exports = router;
