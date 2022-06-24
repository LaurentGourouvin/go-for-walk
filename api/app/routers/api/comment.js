const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');
const commentController = require('../../controllers/api/comment');

const tokenController = require('../../helpers/tokenController');

const router = express.Router();

router
  .route('/')
/**
 * A Comment is create with the following parameters :
     * @typedef {object} postComment
     * @property {string} title - comment title
     * @property {string} description -comment description
     * @property {number} note - note
     * @property {number} trek_id - trek id
 */
/**
     * POST /api/comments
     * @summary Post a comment
     * @tags Comment
     * @param {postComment} request.body.required
     * @param {string} access_token.header - access_token
     * @returns {object} 200 - Comment create
     */
  .post(tokenController(), controllerHandler(commentController.create));
router
  .route('/:id(\\d+)')
/**
     * DELETE /api/comments/{id}
     * @summary Delet a comment
     * @tags Comment
     * @param {number} id.path.required - comment identifier
     * @param {string} access_token.header - access_token
     * @returns {object} 200 - Comment create
     */
  .delete(controllerHandler(commentController.delete));

module.exports = router;
