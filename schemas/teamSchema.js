var db = require('apier-database');
var schemaExtender = require('mongoose-schema-extender');

var teamSchema = new db.mongoose.Schema({
	name: {type: String, required: true},
	coach: {type: String, required: true},
	venue: {
		type: db.mongoose.Schema.Types.ObjectId,
		ref: 'Venue',
		required: true
	}
}, {
	collection: 'teams'
});

// says which attributes each user role can see
teamSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		name: ['null'],
		coach: ['null'],
		venue: ['null']
	};
};

teamSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, db.mongoose, teamSchema,
		'Team', save, populations);
};

teamSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, db.mongoose, teamSchema,
		'Team', query, populations);
};

teamSchema.methods.findById = function(req, res, id) {
	return schemaExtender.findById(req, res, db.mongoose, teamSchema,
		'Team', id);
};

teamSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, db.mongoose,
		teamSchema, 'Team', id);
};

module.exports = db.mongoose.model('Team', teamSchema);
