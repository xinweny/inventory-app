const { body, validationResult } = require('express-validator');

const Instrument = require('../models/instrument');
const Model = require('../models/model');

exports.list = async (req, res, next) => {
	try {
		const [categories, counts] = await Promise.all([
			Instrument.aggregate([
				{$group: {
					_id: '$category',
					instruments: { $push: '$$ROOT' },
				}},
				{ $sort: { _id: 1 }},
			]).then(docs => {
				return docs.map(d => {
					d.instruments = d.instruments.map(i => Instrument.hydrate(i));
					return d;
				});
			}),
			Model.aggregate([
				{
					$group: {
						_id: '$instrument',
						count: { $sum: 1 }
					},
				},
			]).then(data => data.reduce((map, obj) => {
				map[obj._id.toString()] = obj.count;
				return map;
			}, {})),
		]);

		res.render('instrument_list', { title: 'Instrument List', categories, counts })
	} catch (err) {
		return next(err);
	}
};

exports.detail = async (req, res, next) => {
	try {
		const [instrument, instrumentModels] = await Promise.all([
			Instrument.findById(req.params.id),
			Model.find({ instrument: req.params.id }).populate('brand'),
		])

		res.render('instrument_detail', { title: 'Instrument Detail', instrument, instrumentModels })
	} catch (err) {
		return next(err);
	}
};

exports.createGET = (req, res) => {
	const categories = Instrument.schema.path('category').enumValues;

	res.render('instrument_form', {
		title: 'Create Instrument',
		categories: categories.sort((a, b) => (b < a) ? 1 : -1),
	});
};

exports.createPOST = async (req, res) => [
	
];

exports.deleteGET = (req, res) => {};

exports.deletePOST = (req, res) => {};

exports.updateGET = (req, res) => {};

exports.updatePOST = (req, res) => {};