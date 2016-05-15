var db = require('apier-database');
var schemaExtender = require('mongoose-schema-extender');

var playerSchema = new db.mongoose.Schema({
	name: {type: String, required: true},
	team: {
		type: db.mongoose.Schema.Types.ObjectId,
		ref: 'Team',
		required: true
	}
}, {
	collection: 'players'
});

// says which attributes each user role can see
playerSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		name: ['null'],
		team: ['null']
	};
};

playerSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, db.mongoose, playerSchema,
		'Player', save, populations);
};

playerSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, db.mongoose, playerSchema,
		'Player', query, populations);
};

playerSchema.methods.findById = function(req, res, id) {
	return schemaExtender.findById(req, res, db.mongoose, playerSchema,
		'Player', id);
};

playerSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, db.mongoose,
		playerSchema, 'Player', id);
};

module.exports = db.mongoose.model('Player', playerSchema);
