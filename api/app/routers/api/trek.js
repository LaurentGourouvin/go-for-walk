const express = require('express');
const controllerHandler = require('../../helpers/controllerHandler');
const trekController = require('../../controllers/api/trek');

const router = express.Router();

router
  .route('/')
/**
  * A Trek is create with the following parameters :
  * @typedef {object} Trek
  * @property {string} title.required - trek title
  * @property {string} description - trek description
  * @property {integer} distance - trek distance
  * @property {integer} duration - trek duration
  * @property {string} city - trek city
  * @property {array<integer>} coordinate - trek coordinates
  * @property {array<string>} pictures - trek pictures
  * @property {integer} user_id.required - trek userId
  * @property {integer} difficulty_id.required - trek difficulty
*/
/**
     * GET /api/treks
     * @summary Get all treks
     * @tags Treks
     */
  .get(controllerHandler(trekController.getAll))
/**
     * POST /api/treks
     * @summary Create one trek
     * @tags Treks
     * @param {Trek} request.body.required - trek info
     */
  .post(controllerHandler(trekController.createTrek));
router
  .route('/:id(\\d+)')
/**
     * GET /api/treks/{id}
     * @summary Get one trek
     * @tags Treks
     * @param {number} id.path.required - trek identifier
     * @returns {object} 200 - An array of treks
     * @returns {object} 204 - No Trek Found but request ok
     */
  .get(controllerHandler(trekController.getById))
/**
     * PUT /api/treks/{id}
     * @summary Update one Trek
     * @tags Treks
     * @param {number} id.path.required - trek identifier
     * @param {Trek} request.body.required - trek info
     */
  .put(controllerHandler(trekController.updateTrek))
/**
 * DELETE /api/treks/{id}
 * @summary Delete one trek
 * @tags Treks
 * @param {number} id.path.required - trek identifier
 * @returns {object} 200 - trek supprimé
 */
  .delete(controllerHandler(trekController.deletTrek));

module.exports = router;
