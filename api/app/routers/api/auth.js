const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/usersCreateSchema');

const controllerHandler = require('../../helpers/controllerHandler');
const authController = require('../../controllers/api/auth');

const router = express.Router();
router
  .route('/register')
/**
 * A User is create with the following parameters :
     * @typedef {object} userTest
     * @property {string} firstname - user firstname
     * @property {string} name - user lastname
     * @property {string} email - user email
     * @property {string} password - user password
 */
/**
     * POST /api/auth/register
     * @summary Create New User
     * @tags Auth
     * @param {userTest} request.body.required - user info
     * @returns {object} 200 - Utilisateur crée
     */
  .post(validate('body', createSchema), controllerHandler(authController.register));

router
  .route('/login')
  /**
   * POST /api/auth/login
   * @summary Login The User
   * @tags Auth
   * @param {string} email - user email
   * @param {string} password - user password
   * */
  .post(controllerHandler(authController.login));

module.exports = router;
