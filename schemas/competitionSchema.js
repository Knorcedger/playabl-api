var db = require('apier-database');
var schemaExtender = require('mongoose-schema-extender');

var competitionSchema = new db.mongoose.Schema({
	name: {type: String, required: true},
	season: {type: String, required: true}
}, {
	collection: 'competitions'
});

// says which attributes each user role can see
competitionSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		name: ['null'],
		season: ['null']
	};
};

competitionSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, db.mongoose, competitionSchema,
		'Competition', save, populations);
};

competitionSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, db.mongoose, competitionSchema,
		'Competition', query, populations);
};

competitionSchema.methods.findById = function(req, res, id) {
	return schemaExtender.findById(req, res, db.mongoose, competitionSchema,
		'Competition', id);
};

competitionSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, db.mongoose,
		competitionSchema, 'Competition', id);
};

module.exports = db.mongoose.model('Competition', competitionSchema);
