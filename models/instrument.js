const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
	name: { type: String, required: true, unique: true, minLength: 1, trim: true },
	category: {
		type: String,
		required: true,
		enum: [
			'Pianos',
			'Strings',
			'Brass',
			'Woodwinds',
			'Percussion',
			'Drums',
			'Guitars',
			'Keyboards',
			'Traditional',
			'Other',
		],
	},
});

InstrumentSchema.virtual('url').get(function () {
	const kebabCaseName = this.name.replaceAll(' ', '-').toLowerCase();
	return `/inventory/instrument/${kebabCaseName}`;
});

module.exports = mongoose.model('Instrument', InstrumentSchema);