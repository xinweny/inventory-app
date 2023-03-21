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
	return `/inventory/instrument/${this._id}`;
});

module.exports = mongoose.model('Instrument', InstrumentSchema);