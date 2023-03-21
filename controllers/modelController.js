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