var db = require('apier-database');
var schemaExtender = require('mongoose-schema-extender');

var refereeSchema = new db.mongoose.Schema({
	name: {type: String, required: true}
}, {
	collection: 'referees'
});

// says which attributes each user role can see
refereeSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		name: ['null']
	};
};

refereeSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, db.mongoose, refereeSchema,
		'Referee', save, populations);
};

refereeSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, db.mongoose, refereeSchema,
		'Referee', query, populations);
};

refereeSchema.methods.findById = function(req, res, id) {
	return schemaExtender.findById(req, res, db.mongoose, refereeSchema,
		'Referee', id);
};

refereeSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, db.mongoose,
		refereeSchema, 'Referee', id);
};

module.exports = db.mongoose.model('Referee', refereeSchema);
