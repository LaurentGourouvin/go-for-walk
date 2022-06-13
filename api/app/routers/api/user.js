const express = require('express');

const validate = require('../../validation/validator');
const updateSchema = require('../../validation/schemas/usersUpdateSchema');

const controllerHandler = require('../../helpers/controllerHandler');
const userController = require('../../controllers/api/user');

const router = express.Router();

router
  .route('/')
  /**
 * A User is create with the following parameters :
     * @typedef {object} User
     * @property {string} firstname- user firstname
     * @property {string} name - user lastname
     * @property {string} email - user email
     * @property {string} password - user password
 */
/**
     * GET /api/users
     * @summary Get all users
     * @tags Users
     */
  .get(controllerHandler(userController.getAll));
router
  .route('/:id(\\d+)')
/**
     * GET /api/users/{id}
     * @summary Get one user
     * @tags Users
     * @param {number} id.path.required - user identifier
     * @returns {object} 200 - An array of users
     * @returns {object} 204 - No User Found but request ok
     */
  .get(controllerHandler(userController.getById))
/**
     * PUT /api/users/{id}
     * @summary Update one user
     * @tags Users
     * @param {number} id.path.required - user identifier
     */
  .put(validate('body', updateSchema), controllerHandler(userController.updateUser))
/**
 * DELETE /api/users/{id}
 * @summary Delete one user
 * @tags Users
 * @param {number} id.path.required - user identifier
 * @returns {object} 200 - utilisateur supprimé
 */
  .delete(controllerHandler(userController.deletUser));

module.exports = router;
