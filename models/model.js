const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
	name: { type: String, required: true, minLength: 1 },
	instrument: { type: Schema.Types.ObjectId, ref: 'Instrument', required: true },
	brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
	description: { type: String, trim: true },
	specs: { type: Map, of: String },
	quantity: {
		type: Number,
		min: 0,
		get: v => Math.round(v),
		set: v => Math.round(v),
		required: true,
	},
	price: {
		type: Number,
		min: 0,
		get: v => v.toFixed(2),
		set: v => v.toFixed(2),
		required: true,
	}
});

ModelSchema.virtual('url').get(function () {
	return `/inventory/model/${this._id}`;
});

ModelSchema.virtual('price_formatted').get(function () {
	return `$${this.price}`;
})

ModelSchema.virtual('specs_obj').get(function () {
	return Object.fromEntries(this.specs);
});

module.exports = mongoose.model('Model', ModelSchema);