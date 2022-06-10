const express = require('express');
const userController = require('../../controllers/api/user');

const router = express.Router();

router
  .route('/')
/**
     * GET /api/users
     * @summary Get all users
     * @tags Users
     * @return {[Post]} 200 - success response - application/json
     */
  .get(userController.getAll);

router
  .route('/:id(\\d+)');
/**
     * GET /api/user/{id}
     * @summary Get one user
     * @tags Users
     * @param {number} id.path.required - post identifier
     * @return {Post} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Post not found - application/json
     */

module.exports = router;
