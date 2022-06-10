const express = require('express');
const controllerHandler = require('../../helpers/controllerHandler');
const userController = require('../../controllers/api/user');

const router = express.Router();

router
  .route('/')
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
  .put(controllerHandler(userController.updateUser))
/**
 * DELETE /api/users/{id}
 * @summary Delete one user
 * @tags Users
 * @param {number} id.path.required - user identifier
 * @returns {object} 200 - utilisateur supprimé
 */
  .delete(controllerHandler(userController.deletUser));

module.exports = router;
