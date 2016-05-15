require('../../schemas/matchSchema');
var db = require('apier-database');
var Match = db.mongoose.model('Match');
var reqlog = require('reqlog');
var validationsRunner = require('apier-validationsrunner');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/matches/:id',
		permissions: ['null'],
		middlewares: [validate],
		callback: function(req, res) {
			main(req, res, this);
		}
	});
};

/**
 * The endpoint validations middleware
 * @method validate
 * @param  {object}   req  The request object
 * @param  {object}   res  The response object
 * @param  {Function} next The next function
 */
function validate(req, res, next) {
	var validations = {
		id: {
			INVALID_LENGTH: Boolean(req.params.id.length === 24),
			NOT_EXIST: function(req, resolve) {
				var match = new Match();

				match.findById(req, res, req.params.id)
					.then(function(result) {
						if (result) {
							resolve(true);
						} else {
							resolve(false);
						}
					});
			}
		}
	};

	validationsRunner(req, res, next, validations);
}

/**
 * The main endpoint function
 * @method main
 * @param  {object} req The request object
 * @param  {object} res The response object
 * @param  {object} self Use self.send to send back data
 */
function main(req, res, self) {
	reqlog.info('match.get');
	var match = new Match();

	match.findById(req, res, req.params.id)
		.then(function(result) {
			self.send(result);
		});
}
