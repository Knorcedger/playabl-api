var db = require('apier-database');
var schemaExtender = require('mongoose-schema-extender');

var matchSchema = new db.mongoose.Schema({
	homeTeam: {
		type: db.mongoose.Schema.Types.ObjectId,
		ref: 'Team',
		required: true
	},
	awayTeam: {
		type: db.mongoose.Schema.Types.ObjectId,
		ref: 'Team',
		required: true
	},
	homeScore: {type: Number, required: true},
	awayScore: {type: Number, required: true},
	attendance: {type: Number, required: true},
	status: {type: String, enum: ['live', 'FT', 'notStarted'], required: true},
	date: {type: Date, required: true},
	scorers: [{
		player: {type: String, required: true},
		time: {type: String, required: true},
		team: {type: String, required: true}
	}]
}, {
	collection: 'matches'
});

// says which attributes each match role can see
matchSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		homeTeam: ['null'],
		awayTeam: ['null'],
		homeScore: ['null'],
		awayScore: ['null'],
		attendance: ['null'],
		status: ['null'],
		date: ['null'],
		scorers: ['null']
	};
};

matchSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, db.mongoose, matchSchema, 'Match',
		save, populations);
};

matchSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, db.mongoose, matchSchema, 'Match',
		query, populations);
};

matchSchema.methods.findById = function(req, res, id, populations) {
	return schemaExtender.findById(req, res, db.mongoose, matchSchema, 'Match',
		id, populations);
};

matchSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, db.mongoose, matchSchema,
		'Match', id);
};

matchSchema.methods.find = function(req, res, query, populations) {
	return schemaExtender.find(req, res, db.mongoose, matchSchema, 'Match',
		query, populations);
};

matchSchema.methods.findByIdAndUpdate = function(req, res, id, update,
	options, populations) {
	return schemaExtender.findByIdAndUpdate(req, res, db.mongoose, matchSchema,
		'Match', id, update, options, populations);
};

matchSchema.methods.findOneAndUpdate = function(req, res, query, update,
	options, populations) {
	return schemaExtender.findOneAndUpdate(req, res, db.mongoose, matchSchema,
		'Match', query, update, options, populations);
};
module.exports = db.mongoose.model('Match', matchSchema);
