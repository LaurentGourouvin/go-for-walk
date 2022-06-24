const express = require('express');

const validate = require('../../validation/validator');
const updateSchema = require('../../validation/schemas/usersUpdateSchema');

const controllerHandler = require('../../helpers/controllerHandler');
const userController = require('../../controllers/api/user');
const tokenController = require('../../helpers/tokenController');

const router = express.Router();

router
  .route('/')
/**
 * A User is create with the following parameters :
     * @typedef {object} updateUser
     * @property {string} firstname - user firstname
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
     * @param {number} id.path.required - user identify
     * @returns {object} 200 - An array of users
     * @returns {object} 204 - No User Found but request ok
     */
  .get(controllerHandler(userController.getById))
/**
     * PUT /api/users/{id}
     * @summary Update one user
     * @tags Users
     * @param {number} id.path.required - user identify
     * @param {updateUser} request.body.required - user
     * @param {string} access_token.header.required - access_token
     */
  .put(tokenController(), validate('body', updateSchema), controllerHandler(userController.updateUser))
/**
 * DELETE /api/users/{id}
 * @summary Disabled one user
 * @tags users
 * @param {number} id.path.required - user identify
 * @param {string} access_token.header.required - access_token
 * @returns {object} 200 - user disabled
 */
  .delete(tokenController(), controllerHandler(userController.disabledUser));

module.exports = router;
