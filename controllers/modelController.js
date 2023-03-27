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

exports.detail = async (req, res, next) => {
	try {
		const model = await Model.findById(req.params.id).populate('instrument brand');

		console.log(model.specs);

		res.render('model_detail', { title: 'Model Detail', model });
	} catch (err) {
		return next(err);
	}
};

exports.createGET = async (req, res) => {
	const [brands, instrumentsByCategory] = await Promise.all([
		Brand.find({}, 'name'),
		Instrument.aggregate([
			{ $sort: { name: 1 } },
			{
				$group: {
					_id: "$category",
					instruments: { $push: '$name' },
				},
			},
			{ $sort: { _id: 1 } },
		]),
	]);

	res.render('model_form', {
		title: 'Create Model',
		brands,
		instruments: instrumentsByCategory,
	});
};

exports.createPOST = (req, res) => {};

exports.deleteGET = (req, res) => {};

exports.deletePOST = (req, res) => {};

exports.updateGET = (req, res) => {};

exports.updatePOST = (req, res) => {};