require('../../schemas/matchSchema');
var db = require('apier-database');
var Match = db.mongoose.model('Match');
var reqlog = require('reqlog');

module.exports = function(app) {
	app.endpoint({
		methods: ['get', 'post'],
		url: '/matches',
		permissions: ['null'],
		callback: function(req, res) {
			main(req, res, this);
		}
	});
};

/**
 * The main endpoint function
 * @method main
 * @param  {object} req The request object
 * @param  {object} res The response object
 * @param  {object} self Use self.send to send back data
 */
function main(req, res, self) {
	reqlog.info('match.all');
	var match = new Match();

	match.find(req, res, {})
		.then(function(result) {
			self.send(result);
		});
}
