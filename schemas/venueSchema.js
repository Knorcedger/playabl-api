var db = require('apier-database');
var schemaExtender = require('mongoose-schema-extender');

var venueSchema = new db.mongoose.Schema({
	name: {type: String, required: true},
	capacity: {type: Number, required: true},
	city: {type: String, required: true}
}, {
	collection: 'venues'
});

// says which attributes each user role can see
venueSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		name: ['null'],
		capacity: ['null'],
		city: ['null']
	};
};

venueSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, db.mongoose, venueSchema,
		'Venue', save, populations);
};

venueSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, db.mongoose, venueSchema,
		'Venue', query, populations);
};

venueSchema.methods.findById = function(req, res, id) {
	return schemaExtender.findById(req, res, db.mongoose, venueSchema,
		'Venue', id);
};

venueSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, db.mongoose,
		venueSchema, 'Venue', id);
};

module.exports = db.mongoose.model('Venue', venueSchema);
