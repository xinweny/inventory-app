const { body, validationResult } = require('express-validator');

const Model = require('../models/model');
const Instrument = require('../models/instrument');
const Brand = require('../models/brand');
const { model } = require('mongoose');

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
		Brand.find({}).sort({ name: 1 }),
		Instrument.aggregate([
			{ $sort: { name: 1 } },
			{
				$group: {
					_id: "$category",
					instruments: { $push: '$$ROOT' },
				},
			},
			{ $sort: { _id: 1 } },
		]),
	]);

	res.render('model_form', {
		title: 'Create Model',
		brands,
		categories: instrumentsByCategory,
	});
};

exports.createPOST = [
	body('name', 'Name must be specified.')
		.trim().isLength({ min: 1 }).escape(),
	body('brand', 'Brand must be specified.')
		.trim().isLength({ min: 1 }).escape(),
	body('instrument', 'Brand must be specified.')
		.trim().isLength({ min: 1 }).escape(),
	body('quantity', 'Quantity must be specified.')
		.trim().isLength({ min: 1 }).escape().toInt(10),
	body('price', 'Price must be specified.')
		.trim().isLength({ min: 1 }).escape().toFloat(),
	body('description').trim().escape(),
	async (req, res, next) => {
		const errors = validationResult(req);

		const model = new Model({
			name: req.body.name,
			brand: req.body.brand,
			instrument: req.body.instrument,
			quantity: req.body.quantity,
			price: req.body.price,
			description: req.body.description,
			specs: {},
		});

		if (!errors.isEmpty()) {
			const [brands, instrumentsByCategory] = await Promise.all([
				Brand.find({}).sort({ name: 1 }),
				Instrument.aggregate([
					{ $sort: { name: 1 } },
					{
						$group: {
							_id: "$category",
							instruments: { $push: '$$ROOT' },
						},
					},
					{ $sort: { _id: 1 } },
				]),
			]);

			res.render('model_form', {
				title: 'Create Model',
				brands,
				categories: instrumentsByCategory,
				model,
			});

			return;
		}

		try {
			await model.save();
			res.redirect(model.url);
		} catch (err) {
			return next(err);
		}
	},
];

exports.deleteGET = async (req, res, next) => {
	try {
		const model = await Model.findById(req.params.id).populate('brand').populate('instrument');

		res.render('model_delete', {
			title: 'Delete Model',
			model,
		});
	} catch (err) {
		return next(err);
	}
};

exports.deletePOST = async (req, res, next) => {
	try {
		await Model.findByIdAndRemove(req.body.model_id);

		res.redirect('/inventory/models');
	} catch (err) {
		return next(err);
	}
};

exports.updateGET = (req, res) => {};

exports.updatePOST = (req, res) => {};