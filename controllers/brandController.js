const { body, validationResult } = require('express-validator');

const Brand = require('../models/brand');
const Model = require('../models/model');

exports.list = async (req, res, next) => {
	try {
		const [brands, counts] = await Promise.all([
			Brand.find({}),
			Model.aggregate([
				{
					$group: {
						_id: '$brand',
						count: { $sum: 1 }
					},
				},
			]).then(data => data.reduce((map, obj) => {
				map[obj._id.toString()] = obj.count;
				return map;
			}, {})),
		]);

		res.render('brand_list', { title: 'Brand List', brands, counts });
	} catch (err) {
		return next(err);
	}
};

exports.detail = async (req, res, next) => {
	try {
		const [brand, brandModels] = await Promise.all([
			Brand.findById(req.params.id),
			Model.find({ brand: req.params.id }).populate('instrument'),
		]);

		res.render('brand_detail', { title: 'Brand Detail', brand, brandModels });
	} catch (err) {
		return next(err);
	}
};

exports.createGET = (req, res) => {
	res.render('brand_form', { title: 'Create Brand' });
};

exports.createPOST = [
	body('name').trim().isLength({ min: 1 }).escape()
		.withMessage('Name must be specified.'),
	async (req, res, next) => {
		const errors = validationResult(req);

		const brand = new Brand({
			name: req.body.name,
		});

		if(!errors.isEmpty()) {
			res.render('brand_form', {
				title: 'Create Brand',
				brand,
				errors: errors.array(),
			});

			return;
		}

		try {
			await brand.save();
			res.redirect(brand.url);
		} catch (err) {
			return next(err);
		}
	},
]

exports.deleteGET = async (req, res, next) => {
	try {
		const [brand, brandModels] = await Promise.all([
			Brand.findById(req.params.id),
			Model.find({ brand: req.params.id }).populate('instrument'),
		]);

		res.render('brand_delete', {
			title: 'Delete Brand',
			brand,
			brandModels,
		});
	} catch (err) {
		return next(err);
	}
};

exports.deletePOST = async (req, res, next) => {
	try {
		await Promise.all([
			Brand.findByIdAndRemove(req.body.brand_id),
			Model.findOneAndRemove({ brand: req.body.brand_id }),
		]);

		res.redirect('/inventory/brands');
	} catch (err) {
		return next(err);
	}
};

exports.updateGET = (req, res) => {};

exports.updatePOST = (req, res) => {};