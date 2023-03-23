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

		console.log(counts);

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

exports.createGET = (req, res) => {};

exports.createPOST = (req, res) => {};

exports.deleteGET = (req, res) => {};

exports.deletePOST = (req, res) => {};

exports.updateGET = (req, res) => {};

exports.updatePOST = (req, res) => {};