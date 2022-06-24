const express = require('express');

const multer = require('multer');

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
    if ((file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png')) {
      return cb(null, true);
    }
    return cb(new Error('Format supported is only .png, .jpg and .jpeg '));
  },
});

// const log = require('../../helpers/consolelog');

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
     * @property {string} files - profil picture - binary
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
     * @param {updateUser} request.body.required - user info - multipart/form-data
     * @return {object} 200 - Utilisateur mis à jour
     */
  .put(upload.single('files'), validate('body', updateSchema), controllerHandler(userController.updateUser))

/**
 * DELETE /api/users/{id}
 * @summary Disabled one user
 * @tags Users
 * @param {number} id.path.required - user identifier
 * @param {string} access_token.header.required - access_token
 * @returns {object} 200 - utilisateur désact
 */
  .delete(tokenController(), controllerHandler(userController.disabledUser));

module.exports = router;
