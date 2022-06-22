const express = require('express');
const multer = require('multer');
const controllerHandler = require('../../helpers/controllerHandler');
const trekController = require('../../controllers/api/trek');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const regex = /\.[a-z]*$/g;
    const fileFilter = file.originalname.match(regex)[0];
    if ((fileFilter === '.png' || fileFilter === '.jpg' || fileFilter === '.jpeg')) {
      return cb(null, true);
    }
    return cb(new Error('Format supported is only .png, .jpg and .jpeg '));
  },
});

const validate = require('../../validation/validator');

const createSchema = require('../../validation/schemas/treksCreateSchema');
const updateSchema = require('../../validation/schemas/treksUpdateSchema');

const tokenController = require('../../helpers/tokenController');

// const log = require('../../helpers/consolelog');

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
  * @property {string} files - trek pictures - binary
  * @property {integer} user_id.required - trek userId
  * @property {integer} difficulty_id.required - trek difficulty
*/
/**
  * A Trek is create with the following parameters :
  * @typedef {object} trekUpdate
  * @property {string} title - trek title
  * @property {string} description - trek description
  * @property {integer} distance - trek distance
  * @property {integer} duration - trek duration
  * @property {string} city - trek city
  * @property {array<integer>} coordinate - trek coordinates
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
     * @param {Trek} request.body.required - trek info - multipart/form-data
     * @param {string} access_token.header.required - access_token
     * @return {object} 200 - the new trek
     */
  .post(tokenController(), upload.array('files', 5), validate('body', createSchema), controllerHandler(trekController.createTrek));

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
     * @param {string} access_token.header.required - access_token
     * @param {trekUpdate} request.body.required - trek info
     */
  .put(tokenController(), validate('body', updateSchema), controllerHandler(trekController.updateTrek))
/**
 * DELETE /api/treks/{id}
 * @summary Delete one trek
 * @tags Treks
 * @param {number} id.path.required - trek identifier
 * @param {string} access_token.header.required - access_token
 * @returns {object} 200 - trek supprimé
 */
  .delete(tokenController(), controllerHandler(trekController.deletTrek));

router
  .route('/:city')
/**
 * GET /api/treks/{city}
 * @summary Get all treks by city
 * @tags Treks
 * @param {string} city.path.required - trek city
 * @returns {object} 200 - An array of treks
*/
  .get(controllerHandler(trekController.getByCity));

router
  .route('/addImage/:id(\\d+)')
/**
  * add new image :
  * @typedef {object} addImage
  * @property {string} files - nouvelle image - binary
*/
/**
 * PUT /api/treks/addImage/{id}
 * @summary Add new image
 * @tags Images
 * @param {number} id.path.required - trek identifier
 * @param {addImage} request.body.required - ajouter nouvelle image - multipart/form-data
 * @param {string} access_token.header.required - access_token
 * @returns {object} 200 - Url of new image
*/
  .put(tokenController(), controllerHandler(trekController.checkMaxImage), upload.single('files'), controllerHandler(trekController.addImage));
router
  .route('/deleteImage')
/**
  * Remove image from a trek :
  * @typedef {object} deleteImage
  * @property {number} id.path.required - trek id
  * @property {string} image.required - url de l'image
*/
/**
 * PUT /api/treks/deleteImage
 * @summary Remove one image
 * @tags Images
 * @param {deleteImage} request.body.required - trek info
 * @param {string} access_token.header.required - access_token
 * @returns {object} 200 - Name of delete image
*/
  .put(tokenController(), controllerHandler(trekController.deleteImage));

router
  .route('/user/:id(\\d+)')
/**
   * GET /api/treks/user/{id}
   * @summary Get all treks for one user
   * @tags Treks
   * @param {number} id.path.required - userid
   * @return {object} 200 - all treks for one user
   */
  .get(controllerHandler(trekController.getTreksByUser));

module.exports = router;
