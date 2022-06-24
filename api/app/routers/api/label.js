const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');
const labelController = require('../../controllers/api/label');

const router = express.Router();

router
  .route('/')
/**
     * GET /api/labels
     * @summary Get all labels
     * @tags Labels
     * @returns {object} 200 - An array of labels
     */
  .get(controllerHandler(labelController.getAll));
router
  .route('/:id(\\d+)')
  /**
     * GET /api/labels/{id}
     * @summary Get one label
     * @tags Labels
     * @param {number} id.path.required - label identify
     * @returns {object} 200 - one label
     */
  .get(controllerHandler(labelController.getById));

module.exports = router;
