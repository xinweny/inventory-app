const express = require('express');
const router = express.Router();

const BrandController = require('../controllers/brandController');
const InstrumentController = require('../controllers/instrumentController');
const ModelController = require('../controllers/modelController');

function createRoutesCRUD(name, controller) {
	router.get(`/${name}s`, controller.list);
	router.get(`/${name}/create`, controller.createGET);
	router.post(`/${name}/create`, controller.createPOST);
	router.get(`/${name}/:id/delete`, controller.deleteGET);
	router.post(`/${name}/:id/delete`, controller.deletePOST);
	router.get(`/${name}/:id/edit`, controller.updateGET);
	router.post(`/${name}/:id/edit`, controller.updatePOST);
	router.get(`/${name}/:id`, controller.detail);
}

router.get('/', ModelController.index);

createRoutesCRUD('model', ModelController);
createRoutesCRUD('instrument', InstrumentController);
createRoutesCRUD('brand', BrandController);

module.exports = router;