const Model = require('../models/model');
const Instrument = require('../models/instrument');
const Brand = require('../models/brand');

exports.index = async (req, res) => {
	try {
		const [brands, instruments, models] = await Promise.all([
			Brand.countDocuments({}),
			Instrument.countDocuments({}),
			Model.countDocuments({}),
		]);

		res.render('index', {
			title: 'Home',
			count: { brands, instruments, models },
		});
	} catch (err) {
		res.render('index', { title: 'Home', error: err });
	}
};

exports.list = async (req, res, next) => {
	try {
		const models = await Model.find({}, 'name brand instrument price quantity')
			.populate('brand instrument');
		
		res.render('model_list', { title: 'Model List', models });
	} catch (err) {
		return next(err);
	}
};

exports.detail = (req, res) => {};

exports.createGET = (req, res) => {};

exports.createPOST = (req, res) => {};

exports.deleteGET = (req, res) => {};

exports.deletePOST = (req, res) => {};

exports.updateGET = (req, res) => {};

exports.updatePOST = (req, res) => {};