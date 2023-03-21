const express = require('express');
const router = express.Router();

const BrandController = require('../controllers/brandController');
const InstrumentController = require('../controllers/instrumentController');
const ModelController = require('../controllers/modelController');
router.get('/', ModelController.index);

module.exports = router;