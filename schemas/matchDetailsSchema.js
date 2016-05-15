require('../schemas/refereeSchema');
require('../schemas/venueSchema');
require('../schemas/competitionSchema');

var db = require('apier-database');
var schemaExtender = require('mongoose-schema-extender');

var matchDetailsSchema = new db.mongoose.Schema({
	match: {
		type: db.mongoose.Schema.Types.ObjectId,
		ref: 'Match',
		required: true
	},
	referee: {
		type: db.mongoose.Schema.Types.ObjectId,
		ref: 'Referee',
		required: true
	},
	venue: {
		type: db.mongoose.Schema.Types.ObjectId,
		ref: 'Venue',
		required: true
	},
	competition: {
		type: db.mongoose.Schema.Types.ObjectId,
		ref: 'Competition',
		required: true
	},
	actions: [{
		type: {type: String, required: true},
		time: {type: String, required: true},
		players: [],
		details: {
			distance: {type: Number, required: true},
			outcome: {type: String, required: true}
		}
	}]
}, {
	collection: 'matchDetails'
});

// says which attributes each user role can see
matchDetailsSchema.statics.permissions = function() {
	return {
		_id: ['null'],
		match: ['null'],
		referee: ['null'],
		venue: ['null'],
		competition: ['null'],
		actions: ['null']
	};
};

matchDetailsSchema.methods.create = function(req, res, save, populations) {
	return schemaExtender.create(req, res, db.mongoose, matchDetailsSchema, 'MatchDetails',
		save, populations);
};

matchDetailsSchema.methods.findOne = function(req, res, query, populations) {
	return schemaExtender.findOne(req, res, db.mongoose, matchDetailsSchema, 'MatchDetails',
		query, populations);
};

matchDetailsSchema.methods.findById = function(req, res, id, populations) {
	return schemaExtender.findById(req, res, db.mongoose, matchDetailsSchema, 'MatchDetails',
		id, populations);
};

matchDetailsSchema.methods.findByIdAndRemove = function(req, res, id) {
	return schemaExtender.findByIdAndRemove(req, res, db.mongoose, matchDetailsSchema,
		'MatchDetails', id);
};

matchDetailsSchema.methods.find = function(req, res, query, populations) {
	return schemaExtender.find(req, res, db.mongoose, matchDetailsSchema, 'MatchDetails',
		query, populations);
};

matchDetailsSchema.methods.findByIdAndUpdate = function(req, res, id, update,
	options, populations) {
	return schemaExtender.findByIdAndUpdate(req, res, db.mongoose, matchDetailsSchema,
		'MatchDetails', id, update, options, populations);
};

matchDetailsSchema.methods.findOneAndUpdate = function(req, res, query, update,
	options, populations) {
	return schemaExtender.findOneAndUpdate(req, res, db.mongoose, matchDetailsSchema,
		'MatchDetails', query, update, options, populations);
};

module.exports = db.mongoose.model('MatchDetails', matchDetailsSchema);
